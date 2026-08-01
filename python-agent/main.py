from pathlib import Path
import os
import sys

from flask import Flask, request
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent


def load_env_file():
    env_path = BASE_DIR / ".env"

    if not env_path.exists():
        return

    for line in env_path.read_text().splitlines():
        line = line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def configure_logging():
    logs_dir = BASE_DIR / "logs"
    logs_dir.mkdir(exist_ok=True)
    log_path = logs_dir / "agent.log"
    log_file = log_path.open("a", encoding="utf-8", buffering=1)

    sys.stdout = log_file
    sys.stderr = log_file
    print("\n--- Chameleon Wallpaper Agent started ---", flush=True)


load_env_file()
configure_logging()

from routes.wallpaper import start_configured_loop, wallpaper_bp

app = Flask(__name__)
CORS(app)


@app.after_request
def allow_private_network(response):
    # Permite que o site em producao (HTTPS) chame o agente em localhost
    if request.headers.get("Access-Control-Request-Private-Network") == "true":
        response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response


app.register_blueprint(wallpaper_bp)
start_configured_loop()

app.run(port=5000, host="localhost", debug=False, use_reloader=False)