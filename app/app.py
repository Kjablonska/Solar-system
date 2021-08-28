from flask import Flask, request, jsonify
from flask_cors import CORS

from astroquery.jplhorizons import Horizons
from astroquery.simbad import Simbad
from astropy.coordinates import ICRS

from astropy import units as u
from astropy.coordinates import SkyCoord

from astropy.table import Table
import pymongo
import urllib.parse
import json
import numpy as np

# TODO:
# 1. possition according to the revolution time: according to the planet that has the longest one?
# 2. add rotation time to database.

app = Flask(__name__)
CORS(app)

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
    start = request.args.get('start')
    end = request.args.get('end')
    print(name)
    planet = get_planet(name)
    print(planet)
    print(planet["_id"])

    # 1 MO
    obj = Horizons(id = str(planet["_id"]), location='@Sun', epochs = {"start": start, "stop": end, "step": "1m"}, id_type='majorbody')

    vec = obj.vectors()
    possitons_data = {}
    for name in vec.colnames:
        if name in ['x', 'y', 'z']:
            possitons_data[name] = vec[name].to(u.km).value.tolist()
    return possitons_data

@app.route("/getObjectsJPLData")
def get_JPL_planets_data():
    names = request.args.get('name')
    names = parsePlanetsNames(names)
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    planets = get_planets(names)
    print(planets)
    objects = {}
    data = {}
    for planet in planets:
        print("here")
        res = Horizons(id = str(planet["_id"]), location='@Sun', epochs = {"start": str(start), "stop": str(end), "step": str(step)}, id_type='majorbody')
        vec = res.vectors()
        print(planet)
        print(vec)
        possitons_data = {}
        for name in vec.colnames:
            if name in ['x', 'y', 'z']:
                possitons_data[name] = vec[name].to(u.km).value.tolist()
        data[planet["name"]] = possitons_data

    return json.dumps(data)

def parsePlanetsNames(names):
    names = names.replace("[", "")
    names = names.replace("]", "")
    return names.split(",")


@app.route("/getStars")
def get_starts():
    name = request.args.get('name')
    result_table = Simbad.query_object(name)

    # Conversion to cartesian coordinates.
    result_table['DEC']
    result_table['RA']
    c = SkyCoord(ra='05 34 31.94', dec='+22 00 52.2',
                 unit=(u.hourangle, u.deg))
    c.cartesian.x
    c.cartesian.y
    c.cartesian.z

    # c = SkyCoord(frame='fk4', ra='14h29m42.9451s', dec='-62d40m46.170s')
    # c.cartesian
    # c = SkyCoord(ra='14h29m42.9451s', dec='-62d40m46.170s', distance=0.0013009097*u.kpc)

    #####
    # 0.10280963


# @app.route("/connect")
# TODO: put db credentials in config file.
def connectToDatabase():
    client = pymongo.MongoClient("mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    return mydb

@app.route("/conn")
def conn():
    # client = pymongo.MongoClient("mongodb://solar-system:solar-system@mongo:27017")
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    data = planet_collection.find_one({'_id': '399'})
    return data

def get_planet(name):
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    return planet_collection.find_one({'name': name})

@app.route("/sth")
def sth():
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    ids = ['399', '499']
    data = planet_collection.find({'_id': {"$in": ids}})
    return data

def get_planets(names):
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    print(type(names))
    print(names)
    res = planet_collection.find({'name': {"$in":names}})
    data = []
    for doc in res:
        data.append(doc)
    return data


# Init db.
@app.route("/getdb")
def dbConnect():
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client['solar-system']
    print(db)

    collection = db['planets']

    collection.insert_one({'_id': '199', 'name': 'Mercury', "revolution": "56"})
    collection.insert_one({'_id': '299', 'name': 'Venus', "revolution": "225"})
    collection.insert_one({'_id': '399', 'name': 'Earth', "revolution": "356"})
    collection.insert_one({'_id': '499', 'name': 'Mars', "revolution": "687"})
    collection.insert_one({'_id': '599', 'name': 'Jupiter', "revolution": "4328"})
    collection.insert_one({'_id': '699', 'name': 'Saturn', "revolution": "10752"})
    collection.insert_one({'_id': '799', 'name': 'Uranus', "revolution": "30660"})
    collection.insert_one({'_id': '899', 'name': 'Neptune', "revolution": "60148.35"})

    return str(db.list_collection_names())



# Local db commands:
# sudo service mongod start
# db.user.remove({})
# mongoimport --db celestialBodies --collection planets --file neptune.json

# Docker commands:
# docker run --name solar-system -p 27017:27017 mongo


# mongo --username solar-system --password solar-system
# sudo docker-compose build
# sudo docker-compose up