import os
from flask import Flask

from app.extensions import db, login_manager, jwt
from app.routes.auth import auth_bp

from dotenv import load_dotenv

load_dotenv()

def create_app(config=None):

    app = Flask(__name__)

    # Configuration
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Custom configuration if provided
    if config:
        
        app.config.update(config)

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    

    # Import models
    from app.models.user import User
    from app.models.todo import Todo

    # Create database tables
    with app.app_context():
        db.create_all()

    return app