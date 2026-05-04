from utils import download_image, auto_update_loop
from flask import Blueprint, request, jsonify
import threading
import requests

is_loop_active = False
current_interval = 60
wallpaper_bp = Blueprint('wallpaper', __name__)

@wallpaper_bp.route("/image_loop", methods=["POST"])
def image_loop():
    global is_loop_active
    
    if is_loop_active:
        return jsonify({"message": "O loop já está rodando"}), 400

    body = request.get_json()
    deviceId = body.get("deviceId")
    
    if not deviceId:
        return jsonify({"error": "deviceId is required"}), 400
    
    is_loop_active = True
    
    thread = threading.Thread(target=auto_update_loop, args=(deviceId, is_loop_active), daemon=True)
    thread.start()

    return jsonify({"message": "Loop disparado em segundo plano"}), 200

@wallpaper_bp.route("/stop_loop", methods=["POST"])
def stop_loop():
    global is_loop_active
    is_loop_active = False
    return jsonify({"message": "Loop parado"}), 200

@wallpaper_bp.route("/select_image", methods=["POST"])
def select_image():
    global current_interval
    
    body = request.get_json()
    image_url = body.get("url")
    response = requests.get(image_url)
    download_image(response.content)
    
    new_interval = body.get("interval")
    if new_interval:
        current_interval = new_interval
    
    return jsonify({"message": "Wallpaper alterado com sucesso"}), 200

@wallpaper_bp.route("/update_interval", methods=["POST"])
def update_interval():
    global current_interval
    
    body = request.get_json()
    new_interval = body.get("interval")
    if not new_interval:
        return jsonify({"error": "interval is required"}), 400
    
    current_interval = new_interval
    return jsonify({"success": True}), 200
