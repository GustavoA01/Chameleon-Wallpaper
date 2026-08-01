import os
import threading

import requests
from flask import Blueprint, jsonify, request
from utils import (
    auto_update_loop,
    download_image,
    is_auto_update_loop_running,
    reset_loop_timer,
    stop_auto_update_loop,
)

wallpaper_bp = Blueprint("wallpaper", __name__)


def start_configured_loop():
    device_id = os.getenv("CHAMELEON_DEVICE_ID", "").strip()

    if is_auto_update_loop_running():
        return

    thread = threading.Thread(
        target=auto_update_loop,
        args=(device_id,),
        daemon=True,
    )
    thread.start()


@wallpaper_bp.route("/image_loop", methods=["POST"])
def image_loop():
    if is_auto_update_loop_running():
        return jsonify({"message": "O loop ja esta rodando"}), 400

    body = request.get_json()
    device_id = body.get("deviceId")

    if not device_id:
        return jsonify({"error": "deviceId is required"}), 400

    thread = threading.Thread(target=auto_update_loop, args=(device_id,), daemon=True)
    thread.start()

    return jsonify({"message": "Loop disparado em segundo plano"}), 200


@wallpaper_bp.route("/stop_loop", methods=["POST"])
def stop_loop():
    stop_auto_update_loop()
    return jsonify({"message": "Loop parado"}), 200


@wallpaper_bp.route("/check_now", methods=["POST"])
def check_now():
    # Acorda o loop imediatamente para buscar comandos pendentes no site,
    # sem esperar o proximo ciclo de polling.
    reset_loop_timer()
    return jsonify({"message": "Verificacao de comandos disparada"}), 200


@wallpaper_bp.route("/select_image", methods=["POST"])
def select_image():
    body = request.get_json()
    image_url = body.get("url")

    if not image_url:
        return jsonify({"error": "url is required"}), 400

    response = requests.get(image_url)
    download_image(response.content)

    if body.get("resetTimer"):
        reset_loop_timer(body.get("interval"))

    return jsonify({"message": "Wallpaper alterado com sucesso"}), 200


@wallpaper_bp.route("/update_interval", methods=["POST"])
def update_interval():
    body = request.get_json()
    new_interval = body.get("interval")

    if not new_interval:
        return jsonify({"error": "interval is required"}), 400

    reset_loop_timer(new_interval)
    return jsonify({"success": True}), 200
