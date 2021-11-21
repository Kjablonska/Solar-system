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

from asstes import get_skybox, get_planet_texture, get_satellite_texture, get_heightmap
from satellites import get_satellites
from planets import get_info, get_planets_data
from asteroids import get_asteroids, get_asteroids_data
from cache import get_cache, get_cache_satellites, cache_size

app = Flask(__name__)

CORS(app)


@app.route("/getSatellitesJPLData")
def get_satellites_data():
    planet = request.args.get('planet')
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    data = get_satellites(planet, start, end, step)
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

# @app.route("/getSolarSystemJPLData")
# def get_JPL_solar_system_data():
#     names = request.args.get('name')
#     names = parse_names(names)
#     start = request.args.get('start')
#     end = request.args.get('end')
#     step = request.args.get('step')
#     return get_JPL_solar_system_data(names, start, end, step)


@app.route("/getPlanetsJPLData")
def get_JPL_planets_data():
    names = request.args.get('name')
    names = parse_names(names)
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')

    data = get_planets_data(start, end, step, names)
    return json.dumps(data)


@app.route("/getPlanetInfo")
def get_planet_info():
    planet = request.args.get('planet')
    data = get_info(planet)
    return json.dumps(data)


# Asteroids
@app.route("/getAsteroidsJPLData")
def get_JPL_asteroid_belt():
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    data = get_asteroids_data(start, end, step)

    return json.dumps(data)


@app.route("/asteroid")
def get_asteroids():
    return get_asteroids()

## Assets

@app.route('/assets/<name>')
def get_skybox_pictures(name):
    return get_skybox(name)

@app.route('/assets/planets/<planet>')
def get_planet_texture_picture(planet):
    return get_planet_texture(planet)

@app.route('/assets/satellites/<planet>')
def get_satellite_texture_picture(planet):
    return get_satellite_texture(planet)

@app.route('/assets/heightmaps/<planet>')
def get_heightmap_picture(planet):
    return get_heightmap(planet)


@app.route("/cachePlanets")
def get_planets_cache():
    res = get_cache()
    return json.dumps(res, default=str)

@app.route("/cacheSatellites")
def satellites_cache():
    res = get_cache_satellites()
    return json.dumps(res, default=str)

@app.route("/cacheSize")
def get_cache_size():
    return cache_size()


def parse_names(names):
    names = names.replace("[", "")
    names = names.replace("]", "")
    return names.split(",")

# For testing purposes.

# @app.route("/conn")
# def conn():
#     # client = pymongo.MongoClient("mongodb://solar-system:solar-system@mongo:27017")
#     mydb = connectToDatabase()
#     planet_collection = mydb["planets"]
#     data = planet_collection.find_one({'_id': '399'})
#     return data


# Local db commands:
# sudo service mongod start
# db.user.remove({})
# mongoimport --db celestialBodies --collection planets --file neptune.json

# Docker commands:
# docker run --name solar-system -p 27017:27017 mongo


# mongo --username solar-system --password solar-system
# sudo docker-compose build
# sudo docker-compose up
