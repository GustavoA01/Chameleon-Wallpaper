from pathlib import Path
import os

from flask import Flask
from flask_cors import CORS


def load_env_file():
    env_path = Path(__file__).with_name(".env")

    if not env_path.exists():
        return

    for line in env_path.read_text().splitlines():
        line = line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_env_file()

from routes.wallpaper import start_configured_loop, wallpaper_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(wallpaper_bp)
start_configured_loop()

app.run(port=5000, host="localhost", debug=True)
