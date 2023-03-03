import pymongo as pm
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

_mongo_uri = os.environ.get('DATABASE_URI')
print(_mongo_uri)
_client = pm.MongoClient(_mongo_uri)
_database = _client.get_database()

token_collection = _database["tokens"]
website_collection = _database["websites"]