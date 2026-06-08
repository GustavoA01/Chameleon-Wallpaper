import ctypes
import os
import threading
import time

import requests
import winreg

current_interval = 60
timer_reset_event = threading.Event()
stop_loop_event = threading.Event()
loop_running = False


def set_wallpaper_style():
    key = winreg.OpenKey(
        winreg.HKEY_CURRENT_USER, r"Control Panel\Desktop", 0, winreg.KEY_SET_VALUE
    )

    winreg.SetValueEx(key, "WallpaperStyle", 0, winreg.REG_SZ, "10")
    winreg.SetValueEx(key, "TileWallpaper", 0, winreg.REG_SZ, "0")
    winreg.CloseKey(key)


def download_image(url: bytes):
    file_name = "wallpaper.jpg"
    with open(file_name, "wb") as f:
        f.write(url)

    set_wallpaper_style()
    image_path = os.path.abspath(file_name)
    ctypes.windll.user32.SystemParametersInfoW(20, 0, image_path, 3)


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


def wait_for_next_rotation():
    while not stop_loop_event.is_set():
        was_reset = timer_reset_event.wait(timeout=current_interval)

        if was_reset:
            timer_reset_event.clear()
            continue

        return True

    return False


def auto_update_loop(deviceId: str):
    global loop_running

    stop_loop_event.clear()
    loop_running = True

    try:
        while not stop_loop_event.is_set():
            try:
                print("Comecando loop")
                device_url = f"http://localhost:3000/api/device/{deviceId}"
                response = requests.get(device_url)

                if response.status_code == 200:
                    data = response.json()

                    if not data.get("isActive"):
                        print("Dispositivo inativo. Parando loop.")
                        break

                    image_url = data.get("url")
                    new_interval = data.get("interval")

                    if not image_url:
                        print("API nao retornou url de imagem.")
                        time.sleep(10)
                        continue

                    update_current_interval(new_interval)

                    url_bytes = requests.get(image_url).content
                    download_image(url_bytes)
                    print(
                        f"Wallpaper automatico aplicado. Proxima troca em {current_interval}s."
                    )

                    should_continue = wait_for_next_rotation()
                    if not should_continue:
                        break
                else:
                    print("Dispositivo nao encontrado. Tentando de novo em 30s.")
                    time.sleep(30)

            except Exception as e:
                print(f"Erro no loop: {e}")
                time.sleep(10)
    finally:
        loop_running = False
