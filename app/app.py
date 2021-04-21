from flask import Flask, request
import pymongo
import json

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/getPlanet")
def get_planetId_by_name():
    db = connectToDatabase()
    planet_collection = db["planets"]
    name = request.args.get('name')
    print(name)
    data = planet_collection.find_one({'name': name})
    return data


@app.route("/getSatellites")
def get_planets_satellites():
    db = connectToDatabase()
    planet_collection = db["planets"]
    planet = request.args.get('planet')

    data = planet_collection.find_one({'name': planet})
    satellites = data["satellites"]
    return json.dumps(satellites)


# Put credentials in some condif file.
def connectToDatabase():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["celestialBodies"]
    return mydb