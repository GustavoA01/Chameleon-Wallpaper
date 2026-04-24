from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import winreg
import ctypes
import os


def set_wallpaper_style():
  key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Control Panel\Desktop", 0, winreg.KEY_SET_VALUE)
  
  winreg.SetValueEx(key, "WallpaperStyle", 0, winreg.REG_SZ, "10")
  winreg.SetValueEx(key, "TileWallpaper", 0, winreg.REG_SZ, "0")
  winreg.CloseKey(key)

app = Flask(__name__)
CORS(app)

@app.route('/next_image', methods=['POST'])
def next_image():
  body = request.get_json()
  url = body.get("url")
  response = requests.get(url)
  with open("wallpaper.jpg", "wb") as f:
    f.write(response.content)
  
  set_wallpaper_style()
  image_path = os.path.abspath("wallpaper.jpg")
  ctypes.windll.user32.SystemParametersInfoW(20, 0, image_path, 3)
  
  return jsonify({"message": "Wallpaper alterado com sucesso"}), 200

app.run(port=5000, host="localhost", debug=True)