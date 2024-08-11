from flask import Flask, request, jsonify
import pymongo

# MongoDB connection string
connection_string = "mongodb+srv://farhunmmohamed:farhun@skillrank.z9uwfkd.mongodb.net/?ssl=true&retryWrites=true&w=majority"

# Connect to the MongoDB cluster
client = pymongo.MongoClient(connection_string)

# Connect to the database
db = client.skillrank_test  

# Connect to the collection
collection = db.skillrank 

# Create Flask app
app = Flask(__name__)

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    
    if not first_name or not last_name:
        return jsonify({"error": "Please provide both first name and last name"}), 400
    
    document = {"firstName": first_name, "lastName": last_name}
    collection.insert_one(document)
    
    return jsonify({"message": "Document inserted successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)