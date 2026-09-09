import pytest

from app import create_app
from app.models import db, User, Todo
from app.extensions import db

@pytest.fixture
def app():
    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "JWT_SECRET_KEY": "test-secret-key",
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def user(app):
    user = User(username="testuser", email="testuser")

    user.set_password("testpassword")
    db.session.add(user)
    db.session.commit()

    return user

"Testing for Access Token Generation and Authentication"
@pytest.fixture
def access_token(client, app):
    from flask_jwt_extended import create_access_token
    with app.app_context():
        token = create_access_token(identity=user.id)

    return {
        "Authorization": f"Bearer {token}"
    }

"Testing for Todo Creation"
@pytest.fixture
def test_create_todo(client, access_token):
    response = client.post("/api/todos/",
                           json={
                               "title": "Test Todo",
                               "description": "This is a test todo"
                           },
                           headers=access_token
                        )
    assert response.status_code == 201

    data = response.get_json()
    assert data["message"] == "Todo created successfully"
    assert data["todo"]["title"] == "Test Todo"
    assert data["todo"]["description"] == "This is a test todo"


