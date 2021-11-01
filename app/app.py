from flask import Flask, request, jsonify, send_file
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

app = Flask(__name__)
CORS(app)

# -----------------------------------------------------------
#
# Method for finding planet's satellites JPL data.
# @params:
#   planet    -   name of the planet for which the satellites data is fetched.
#
# -----------------------------------------------------------
@app.route("/getSatellites")
def get_satellites():
    planet = request.args.get('planet')
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    planet_data = get_planet(planet)
    location = f'@{planet_data["_id"]}'
    satellites = planet_data["satellites"]
    print(satellites, location)
    objects = {}
    data = {}

    for satellite in satellites:
        res = Horizons(id=str(satellite["_id"]), location=location, epochs={"start": str(start), "stop": str(end), "step": str(step)}, id_type='majorbody')
        vec = res.vectors()
        print(satellite)
        possitons_data = {}
        for name in vec.colnames:
            if name in ['x', 'y', 'z']:
                possitons_data[name] = vec[name].to(u.km).value.tolist()
        data[satellite["name"]] = possitons_data

    return json.dumps(data)

# -----------------------------------------------------------
#
# Method for finding planet's satellites JPL data.
# Returns json object of a following structure: {}
# @params:
#   name    -   array of planet's names.
#   start   -   start date
#   end     -   end date
#   step    -   fetch step.
#
# -----------------------------------------------------------

@app.route("/getObjectsJPLData")
def get_JPL_planets_data():
    names = request.args.get('name')
    names = parse_names(names)
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    planets = get_planets(names)
    print(planets)
    objects = {}
    data = {}

    for planet in planets:
        print("here")
        Horizons.TIMEOUT = 60
        res = Horizons(id=str(planet["_id"]), location='@Sun', epochs={"start": str(start), "stop": str(end), "step": str(step)}, id_type='majorbody')
        vec = res.vectors()
        print(planet)
        possitons_data = {}
        for name in vec.colnames:
            if name in ['x', 'y', 'z']:
                possitons_data[name] = vec[name].to(u.km).value.tolist()
        data[planet["name"]] = possitons_data

    return json.dumps(data)


def parse_names(names):
    names = names.replace("[", "")
    names = names.replace("]", "")
    return names.split(",")

# TODO: put db credentials in config file.
def connectToDatabase():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    return mydb

def get_planet(planet):
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    return planet_collection.find_one({'name': planet})


def get_planets(names):
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    print(type(names))
    print(names)
    res = planet_collection.find({'name': {"$in": names}})
    data = []
    for doc in res:
        data.append(doc)
    return data

def get_planets_satellites(planet):
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    res = planet_collection.find({'name': {"$in": planet}})
    res.satellites

# -----------------------------------------------------------
#
# Returns skybox images.
# @params:
#   name    -   image name to be returned.
#
# -----------------------------------------------------------
@app.route('/assets/<name>')
def get_skybox(name):
    return send_file(
        "./assets/skybox/{}".format(name),
        as_attachment=True,
        attachment_filename='test.jpg',
        mimetype='image/jpeg'
    )

@app.route('/assets/planets/<planet>')
def get_planet_texture(planet):
    return send_file(
        "./assets/planets/{}.jpg".format(planet),
        as_attachment=True,
        attachment_filename="{}.jpg".format(planet),
        mimetype='image/jpeg'
    )

@app.route('/assets/satellites/<planet>')
def get_satellite_texture(planet):
    return send_file(
        "./assets/satellites/{}.jpg".format(planet),
        as_attachment=True,
        attachment_filename="{}.jpg".format(planet),
        mimetype='image/jpeg'
    )

# For testing purposes.
@app.route("/conn")
def conn():
    # client = pymongo.MongoClient("mongodb://solar-system:solar-system@mongo:27017")
    mydb = connectToDatabase()
    planet_collection = mydb["planets"]
    data = planet_collection.find_one({'_id': '399'})
    return data


# Local db commands:
# sudo service mongod start
# db.user.remove({})
# mongoimport --db celestialBodies --collection planets --file neptune.json

# Docker commands:
# docker run --name solar-system -p 27017:27017 mongo


# mongo --username solar-system --password solar-system
# sudo docker-compose build
# sudo docker-compose up