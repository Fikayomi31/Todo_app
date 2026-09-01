from flask import Flask

from app.extensions import db, login_manager


def create_app():

    app = Flask(__name__)

    # Configuration
    app.config["SECRET_KEY"] = "your-secret-key"

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)

    # Import models
    from app.models.user import User
    from app.models.todo import Todo

    # Create database tables
    with app.app_context():
        db.create_all()

    return app