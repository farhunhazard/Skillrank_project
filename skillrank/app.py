from flask import Flask, request, jsonify
from flask_cors import CORS
from connection import get_collection
import hashlib

app = Flask(__name__)
CORS(app)

# MongoDB collections
signup_collection = get_collection('SignUp_details')
login_collection = get_collection('Login_details')

def hash_password(password):
    """Hashes the password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user in the database
    user = signup_collection.find_one({"email": email})

    if user and user["password"] == hash_password(password):
        # Save login details to Login_details collection
        login_data = {"email": email, "login_status": "success"}
        login_collection.insert_one(login_data)
        return jsonify({"message": "Login successful"}), 200
    else:
        # Save failed login attempt to Login_details collection
        login_data = {"email": email, "login_status": "failed"}
        login_collection.insert_one(login_data)
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    if signup_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409

    # Insert the new user into the SignUp_details collection
    new_user = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": hash_password(password)  # Store hashed password
    }

    try:
        result = signup_collection.insert_one(new_user)
        print(f"User inserted with id: {result.inserted_id}")
        return jsonify({"message": "Sign-up successful"}), 201
    except Exception as e:
        print(f"Error inserting user: {e}")
        return jsonify({"error": "Sign-up failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
