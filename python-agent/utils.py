import requests
import winreg
import ctypes
import time
import os

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


def auto_update_loop(deviceId: str,is_loop_active: bool):
    global current_interval
    
    while is_loop_active:
        try:
            print("comecando loop")
            device_url = f"http://localhost:3000/api/device/{deviceId}"
            response = requests.get(device_url)

            if response.status_code == 200:
                data = response.json()

                if not data.get("isActive"):
                    print("Dispositivo está inativo. Parando o loop.")
                    break
                image_url = data.get("url")
                current_interval = data.get("interval", current_interval)

                urlBytes = requests.get(image_url).content
                download_image(urlBytes)
                time.sleep(current_interval)
            else:
                print(
                    "Dispositivo não encontrado ou inativo. Tentando de novo em 30s"
                )
                time.sleep(30)

        except Exception as e:
            print(f"Erro no loop: {e}")
            time.sleep(10)