from utils import download_image, auto_update_loop
from flask import Blueprint, request, jsonify
import requests

wallpaper_bp = Blueprint('wallpaper', __name__)

@wallpaper_bp.route("/image_loop", methods=["POST"])
def image_loop():
    body = request.get_json()
    deviceId = body.get("deviceId")
    if not deviceId:
        return jsonify({"error": "deviceId is required"}), 400
    
    auto_update_loop(deviceId)
    return jsonify({"message": "Loop iniciado"}), 200

#TODO: criar stop_loop

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
