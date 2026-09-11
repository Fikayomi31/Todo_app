# Todo API

A simple and secure **RESTful Todo API** built with **Flask, SQLAlchemy, JWT, and pytest**.

The project demonstrates user authentication, password hashing, JWT-based authorization, database relationships, CRUD operations, and automated testing.

## 🚀 Features

* User registration and validation
* Secure password hashing
* User login with JWT authentication
* Create, read, update, and delete Todos
* User-owned Todo management
* SQLAlchemy database relationships
* Automated tests with pytest
* Flask application factory pattern

## 🛠️ Tech Stack

* **Python**
* **Flask**
* **Flask-SQLAlchemy**
* **SQLite**
* **PyJWT**
* **Werkzeug**
* **pytest**

## 📁 Project Structure

```text
Todo_app/
├── app/
│   ├── models/
│   │   ├── user.py
│   │   └── todo.py
│   ├── routes/
│   │   └── auth.py
│   ├── utils/
│   │   ├── auth.py
│   │   └── jwt.py
│   ├── extensions.py
│   └── __init__.py
├── tests/
│   ├── test_auth.py
│   └── test_models.py
├── .env
├── .gitignore
├── requirements.txt
└── run.py
```

## 🔑 API Endpoints

### Authentication

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | `/api/register` | Register a new user   |
| POST   | `/api/login`    | Login and receive JWT |

### Todos

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/todos`      | Create a Todo    |
| GET    | `/api/todos`      | Get user's Todos |
| GET    | `/api/todos/<id>` | Get a Todo       |
| PUT    | `/api/todos/<id>` | Update a Todo    |
| DELETE | `/api/todos/<id>` | Delete a Todo    |

Protected endpoints use:

```http
Authorization: Bearer <access_token>
```

## ⚙️ Installation

Clone the repository and create a virtual environment:

```bash
git clone <repository-url>
cd Todo_app

python -m venv venv
```

Activate the environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

Run the application:

```bash
python run.py
```

## 🧪 Testing

Run all tests:

```bash
pytest
```

Run with detailed output:

```bash
pytest -v
```

The test suite covers authentication, validation, password hashing, and database relationships.

## 🔐 Security

* Passwords are stored as secure hashes.
* JWT tokens are signed using a secret key stored in environment variables.
* JWT tokens expire.
* Protected resources require authentication.
* Users are restricted to their own Todo data.

## 📌 Project Status

**In development**

Core authentication, registration, database models, and Todo CRUD functionality are implemented. JWT authorization and comprehensive Todo endpoint testing are being developed.

## 👨‍💻 Author

**Fikayo Ogundijo**

Backend Developer

Built with Python and Flask.
