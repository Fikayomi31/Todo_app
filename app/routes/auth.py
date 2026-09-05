from flask import Blueprint, request
from app.extensions import db
from app.models.user import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=["POST"])
def register():
    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    # Create a new user
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return {
        "username": user.username,
        "email": user.email,
        "id": user.id
        }, 201

