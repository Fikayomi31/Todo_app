import os

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from app.extensions import db, login_manager, jwt
from app.routes.auth import auth_bp
from app.routes.todos import todos_bp


load_dotenv()


def create_app(config=None):

    app = Flask(__name__)

    # Frontend URL
    frontend_url = os.getenv(
        "FRONTEND_URL",
        "http://localhost:5173"
    )

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": frontend_url
            }
        }
    )

    # Configuration
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    # Database
    database_url = os.getenv("DATABASE_URL")

    if database_url:
        # Render provides PostgreSQL URLs starting with
        # postgresql://. We use Psycopg 3.
        if database_url.startswith("postgresql://"):
            database_url = database_url.replace(
                "postgresql://",
                "postgresql+psycopg://",
                1
            )

        app.config["SQLALCHEMY_DATABASE_URI"] = database_url

    else:
        # Local fallback
        app.config["SQLALCHEMY_DATABASE_URI"] = (
            "sqlite:///instance/todo.db"
        )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Custom configuration
    if config:
        app.config.update(config)

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    # Register routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(todos_bp)

    # Import models
    from app.models.user import User
    from app.models.todo import Todo

    # Create database tables
    with app.app_context():
        db.create_all()

    return app