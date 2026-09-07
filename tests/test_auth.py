import pytest

from app import create_app
from app.extensions import db
from app.models.user import User

@pytest.fixture
def app():
    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
    })

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_register(client):
    response = client.post('/api/register', 
                           json={
                               "username": "testuser",
                               "email": "testuser@example.com",
                               "password": "password123"
                            }
                           )
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "User registered successfully"
    assert data["user"]["username"] == "testuser"
    assert data["user"]["email"] == "testuser@example.com"
    assert "password" not in data["user"]

def test_register_duplicate_user(client):
    response = client.post('/api/register',
                           json={
                               "username": "testuser",
                               "email": "testuser@example.com",
                               "password": "password123"
                           })
    assert response.status_code == 201

    response = client.post('/api/register',
                           json={
                               "username": "testuser",
                               "email": "testuser2@example.com",
                               "password": "password123"
                           })
    assert response.status_code == 400
    data = response.get_json()

    assert data["error"] == "Username already exists"

def test_register_duplicate_email(client):
    response = client.post('/api/register',
                           json={
                               "username": "anotheruser",
                               "email": "testuser@example.com",
                               "password": "password123"
                           })
    assert response.status_code == 201

    response = client.post('/api/register',
                           json={
                               "username": "newuser",
                               "email": "testuser@example.com",
                               "password": "password123"
                           })
    assert response.status_code == 400
    data = response.get_json()  
    
    assert data["error"] == "Email already exists"

def test_register_missing_fields(client):
    response = client.post('/api/register', json={
        "username": "testuser",
        "email": "testuser@example.com"
    })
    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Username, email, and password are required"

def test_register_invalid_email(client):
    response = client.post('/api/register', json={
        "username": "testuser",
        "email": "invalid-email",
        "password": "password123"
    })

    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Invalid email format"

def test_login(client):
    response = client.post('api/register', json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 201

    response = client.post('api/login', json={
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data["message"] == "Login successful"
    assert "access_token" in data
    assert data["access_token"]

    assert data["user"]["username"] == "testuser"
    assert data["user"]["email"] == "testuser@example.com"

def test_login_wrong_password(client):
    response = client.post('api/register', json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123"
    })
    assert response.status_code == 201

    response = client.post('api/login', json={
        "email": "testuser@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
    data = response.get_json()
    assert data["error"] == "Invalid email or password"


def test_login_nonexistent_user(client):
    response = client.post('api/login', json={
        "email": "nonexistent@example.com",
        "password": "password123"
    })
    assert response.status_code == 401
    data = response.get_json()
    assert data["error"] == "Invalid email or password"

def test_login_missing_fields(client):
    response = client.post('api/login', json={
        "email": "testuser@example.com"
    })
    assert response.status_code == 400
    data = response.get_json()
    assert data["error"] == "Email and password are required"
