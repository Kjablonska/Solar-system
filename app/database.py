from flask import abort
import pymongo

def connect_to_db():
    try:
        client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
        return client
    except (pymongo.ServerSelectionTimeoutError) as error:
        abort(503, error)

def close_db_connection(client):
    try:
        client.close()
    except (pymongo.ServerSelectionTimeoutError) as error:
        abort(503, error)