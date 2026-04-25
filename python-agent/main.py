from flask import Flask, jsonify, request
from flask_cors import CORS
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


def auto_update_loop(deviceId: str):
    while True:
        try:
            device_url = f"http://localhost:3000/api/device/{deviceId}"
            response = requests.get(device_url)

            if response.status_code == 200:
                data = response.json()

                if not data.get("isActive"):
                    print("Dispositivo está inativo. Parando o loop.")
                    break
                image_url = data.get("url")
                interval = data.get("interval", 60)

                urlBytes = requests.get(image_url).content
                download_image(urlBytes)
                time.sleep(interval)
            else:
                print(
                    "Dispositivo não encontrado ou inativo. Tentando novamente em 30s..."
                )
                time.sleep(30)

        except Exception as e:
            print(f"Erro no loop: {e}")
            time.sleep(10)


app = Flask(__name__)
CORS(app)


@app.route("/image_loop", methods=["POST"])
def image_loop():
    body = request.get_json()
    deviceId = body.get("deviceId")
    if not deviceId:
        return jsonify({"error": "deviceId is required"}), 400
    print("comecando loop")
    auto_update_loop(deviceId)
    return jsonify({"message": "Loop iniciado"}), 200


@app.route("/select_image", methods=["POST"])
def select_image():
    body = request.get_json()
    image_url = body.get("url")
    response = requests.get(image_url)
    download_image(response.content)

    return jsonify({"message": "Wallpaper alterado com sucesso"}), 200
  
@app.route("/next_image", methods=["POST"])
def next_image():
    body = request.get_json()
    image_url = body.get("url")
    print("Definindo próxima imagem:", image_url)
    response = requests.get(image_url)
    download_image(response.content)

    return jsonify({"message": "Próxima imagem definida com sucesso"}), 200

@app.route("/select_folder", methods=["POST"])
def select_folder():
    body = request.get_json()
    folder_id = body.get("folderId")
    if not folder_id:
        return jsonify({"error": "folderId is required"}), 400

    res = requests.get(f"http://localhost:3000/api/folder/{folder_id}")
    print(res)
    if res.status_code != 200:
        return jsonify({"error": "Folder not found"}), 404
    
    url_image = res.json().get("url")
    # interval = res.json().get("interval", 60)
    download_image(requests.get(url_image).content)

    return jsonify({"message": "Pasta selecionada com sucesso"}), 200

app.run(port=5000, host="localhost", debug=True)