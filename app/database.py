from flask import abort
import pymongo
import os

def connect_to_db():
    try:
        db_user = os.environ.get("DB_USER")
        db_password = os.environ.get("DB_PASSWORD")
        db_port = os.environ.get("DB_PORT")
        mongo_clinet = "mongodb://{}:{}@mongo:{}".format(db_user, db_password, db_port)
        client = pymongo.MongoClient(mongo_clinet)
        return client
    except (pymongo.ServerSelectionTimeoutError) as error:
        abort(503, error)

def close_db_connection(client):
    try:
        client.close()
    except (pymongo.ServerSelectionTimeoutError) as error:
        abort(503, error)