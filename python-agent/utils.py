import ctypes
import os
import threading
import time
import uuid
from pathlib import Path

import requests
import winreg

BASE_DIR = Path(__file__).resolve().parent
current_interval = 60
timer_reset_event = threading.Event()
stop_loop_event = threading.Event()
loop_running = False
current_wallpaper_path = None


def get_app_url():
    return os.getenv("CHAMELEON_APP_URL", "http://localhost:3000").rstrip("/")


def get_agent_headers():
    token = os.getenv("CHAMELEON_DEVICE_TOKEN", "")
    return {"Authorization": f"Bearer {token}"}


def get_command_poll_seconds():
    return int(os.getenv("CHAMELEON_COMMAND_POLL_SECONDS", "60"))


def set_wallpaper_style():
    key = winreg.OpenKey(
        winreg.HKEY_CURRENT_USER, r"Control Panel\Desktop", 0, winreg.KEY_SET_VALUE
    )

    winreg.SetValueEx(key, "WallpaperStyle", 0, winreg.REG_SZ, "10")
    winreg.SetValueEx(key, "TileWallpaper", 0, winreg.REG_SZ, "0")
    winreg.CloseKey(key)


def cleanup_old_wallpapers(keep_path: str):
    keep = Path(keep_path).resolve()

    for path in BASE_DIR.glob("wallpaper*.jpg"):
        if path.resolve() == keep:
            continue

        try:
            path.unlink(missing_ok=True)
        except OSError as error:
            print(f"Nao foi possivel remover wallpaper antigo {path.name}: {error}")


def download_image(url: bytes):
    global current_wallpaper_path

    file_path = BASE_DIR / f"wallpaper_{uuid.uuid4().hex}.jpg"
    file_path.write_bytes(url)

    set_wallpaper_style()
    image_path = str(file_path.resolve())
    ctypes.windll.user32.SystemParametersInfoW(20, 0, image_path, 3)

    current_wallpaper_path = image_path
    threading.Timer(2.0, cleanup_old_wallpapers, args=(image_path,)).start()


def apply_wallpaper_url(image_url: str):
    url_bytes = requests.get(image_url).content
    download_image(url_bytes)


def update_current_interval(interval):
    global current_interval

    if interval is not None:
        current_interval = int(interval)


def reset_loop_timer(interval=None):
    update_current_interval(interval)
    timer_reset_event.set()


def stop_auto_update_loop():
    stop_loop_event.set()
    timer_reset_event.set()


def is_auto_update_loop_running():
    return loop_running


def fetch_pending_command(deviceId: str = ""):
    query = f"?deviceId={deviceId}" if deviceId else ""
    response = requests.get(
        f"{get_app_url()}/api/wallpaper-command/next{query}",
        headers=get_agent_headers(),
    )

    if response.status_code != 200:
        return None

    return response.json().get("command")


def apply_command(command):
    if not command:
        return False

    command_type = command.get("type")
    image_url = command.get("url")
    interval = command.get("interval")
    reset_timer = command.get("resetTimer")

    if interval is not None:
        update_current_interval(interval)

    if command_type in ["SELECT_IMAGE", "NEXT_IMAGE"] and image_url:
        apply_wallpaper_url(image_url)
        print(f"Comando {command_type} aplicado.")

    return bool(reset_timer)


def wait_for_next_rotation(deviceId: str = ""):
    deadline = time.monotonic() + current_interval

    while not stop_loop_event.is_set():
        command = fetch_pending_command(deviceId)
        should_reset_timer = apply_command(command)

        if should_reset_timer:
            deadline = time.monotonic() + current_interval

        remaining = deadline - time.monotonic()
        if remaining <= 0:
            return True

        timer_reset_event.wait(timeout=min(get_command_poll_seconds(), remaining))
        timer_reset_event.clear()

    return False


def auto_update_loop(deviceId: str = ""):
    global loop_running

    stop_loop_event.clear()
    loop_running = True

    try:
        while not stop_loop_event.is_set():
            try:
                print("Comecando loop")
                device_path = f"/api/device/{deviceId}" if deviceId else "/api/device/active"
                device_url = f"{get_app_url()}{device_path}"
                response = requests.get(device_url, headers=get_agent_headers())

                if response.status_code == 200:
                    data = response.json()

                    if not data.get("isActive"):
                        print("Dispositivo inativo. Tentando de novo em 30s.")
                        time.sleep(30)
                        continue

                    image_url = data.get("url")
                    new_interval = data.get("interval")

                    if not image_url:
                        print("API nao retornou url de imagem.")
                        time.sleep(10)
                        continue

                    active_device_id = deviceId or data.get("deviceId", "")

                    update_current_interval(new_interval)
                    apply_wallpaper_url(image_url)
                    print(
                        f"Wallpaper automatico aplicado. Proxima troca em {current_interval}s."
                    )

                    should_continue = wait_for_next_rotation(active_device_id)
                    if not should_continue:
                        break
                else:
                    print(
                        f"Dispositivo nao encontrado ({response.status_code}). Tentando de novo em 30s."
                    )
                    time.sleep(30)

            except Exception as e:
                print(f"Erro no loop: {e}")
                time.sleep(10)
    finally:
        loop_running = False

