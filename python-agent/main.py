from flask import Flask
from flask_cors import CORS
from routes.wallpaper import wallpaper_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(wallpaper_bp, url_prefix='/api')

app.run(port=5000, host="localhost", debug=True)