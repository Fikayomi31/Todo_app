from functools import wraps

from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request, jwt_required

from app.extensions import db
from app.models.user import User

def jwt_required_user():
    """
    Require a valid JWT and return the authenticated user
    """

    def decorator(func):
        @wraps(func)
        @jwt_required()
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user = db.session.get(User, int(user_id))
            if not user:
                return jsonify({"error": "User not found"}), 404
            return func(user, *args, **kwargs)
        return wrapper
    return decorator