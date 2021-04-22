from flask import Flask, request
from astroquery.jplhorizons import Horizons
from astropy.table import Table
import pymongo
import json

# sudo systemctl start mongod

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

@app.route("/getPlanet")
def get_planetId_by_name():
    name = request.args.get('name')
    return get_planet(name)


@app.route("/getSatellites")
def get_planets_satellites():
    db = connectToDatabase()
    planet_collection = db["planets"]
    planet = request.args.get('planet')

    data = planet_collection.find_one({'name': planet})
    satellites = data["satellites"]
    return json.dumps(satellites)


@app.route("/getObjectJPLData")
def get_JPL_data():
    name = request.args.get('name')
    planet = get_planet(name)
    print(planet["_id"])

    obj = Horizons(id = str(planet["_id"]), location='0', epochs = {"start": "2021-04-01", "stop": "2021-04-10", "step": "1d"}, id_type='majorbody')

    vec = obj.vectors()
    possitons_data = {}
    for name in vec.colnames:
        if name in ['x', 'y', 'z', 'vx', 'vy', 'vz']:
            possitons_data[name] = vec[name].tolist()

    return possitons_data


# Put credentials in some condig file.
def connectToDatabase():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["celestialBodies"]
    return mydb


def get_planet(name):
    db = connectToDatabase()
    planet_collection = db["planets"]
    return planet_collection.find_one({'name': name})