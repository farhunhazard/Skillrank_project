import pymongo

# MongoDB connection string
connection_string = "mongodb+srv://farhunmmohamed:farhun@skillrank.z9uwfkd.mongodb.net/?ssl=true&retryWrites=true&w=majority"

# Connect to the MongoDB cluster
client = pymongo.MongoClient(connection_string)

# Connect to the database
db = client.skillrank_test  

def get_collection(collection_name):
    """Returns the collection object"""
    return db[collection_name]
