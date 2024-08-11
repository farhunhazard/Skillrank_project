from flask import Flask, request, jsonify
import pymongo
import json

# Connection string with the new password
connection_string = "mongodb+srv://farhunmmohamed:farhun@skillrank.z9uwfkd.mongodb.net/"

# Connect to the MongoDB cluster
client = pymongo.MongoClient(connection_string)

# Connect to the database
db = client.skillrank_test  

# Connect to the collection
collection = db.skillrank 

# Create an instance of the Flask class
app = Flask(__name__)

# Define a route for the root URL (GET request)
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Define a route for the POST request to insert data into MongoDB
@app.route('/add_user', methods=['POST'])
def add_user():
    # Get the JSON data from the request
    data = request.get_json()
    
    # Extract first name and last name from the data
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    
    # Validate the input
    if not first_name or not last_name:
        return jsonify({"error": "Please provide both first name and last name"}), 400
    
    # Create a document to insert into MongoDB
    document = {"firstName": first_name, "lastName": last_name}
    
    # Insert the document into the collection
    collection.insert_one(document)
    
    return jsonify({"message": "Document inserted successfully"}), 201

# Run the application
if __name__ == '__main__':
    app.run(debug=True)