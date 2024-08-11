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

# Function to get user input
def get_user_input():
    first_name = input("Enter first name: ")
    last_name = input("Enter last name: ")
    return {"firstName": first_name, "lastName": last_name}

# List to store user data
user_data = []

# Get data from 10 users
for i in range(10):
    print(f"Enter details for user {i+1}:")
    user_data.append(get_user_input())

# Insert all user data into the collection
collection.insert_many(user_data)

print("Documents inserted successfully")
