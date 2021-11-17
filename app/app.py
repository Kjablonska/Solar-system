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

@app.route("/getPlanetInfo")
def get_info():
    planet = request.args.get('planet')
    planet_data = get_planet(planet)
    if planet_data is None:
        return None
    return json.dumps(planet_data["info"])

# -----------------------------------------------------------
#
# Method for finding planet's satellites JPL data.
# @params:
#   planet    -   name of the planet for which the satellites data is fetched.
#
# -----------------------------------------------------------

def get_planet(planet):
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planet_collection = mydb["planets"]

    planet_data = planet_collection.find_one({'name': planet})
    client.close()
    return planet_data

@app.route("/getSatellitesJPLData")
def get_satellites():
    planet = request.args.get('planet')
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')

    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planet_collection = mydb["planets"]

    planet_data = planet_collection.find_one({'name': planet})
    if planet_data is None:
        return {}

    location = f'@{planet_data["_id"]}'
    satellites = planet_data["satellites"]
    objects = {}
    data = {}

    for satellite in satellites:
        cache_res = search_satellites_cache(satellite["name"], start, mydb)
        if (cache_res is not None):
            data[satellite["name"]] = cache_res
            continue

        res = Horizons(id=str(satellite["_id"]), location=location, epochs={
                       "start": str(start), "stop": str(end), "step": str(step)}, id_type='majorbody')
        vec = res.vectors()
        possitons_data = {}
        for name in vec.colnames:
            if name in ['x', 'y', 'z']:
                possitons_data[name] = vec[name].to(u.km).value.tolist()
        data[satellite["name"]] = possitons_data
        add_to_satellites_cache(satellite["name"], start, possitons_data, mydb)


    client.close()
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


@app.route("/getSolarSystemJPLData")
def get_JPL_solar_system_data():
    names = request.args.get('name')
    names = parse_names(names)
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    planets = get_planets_data(start, end, step, names)
    asteroids = get_asteroids_data(start, end, step)

    data = dict(planets)
    data.update(asteroids)
    return json.dumps(data)


@app.route("/getPlanetsJPLData")
def get_JPL_planets_data():
    names = request.args.get('name')
    names = parse_names(names)
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')

    data = get_planets_data(start, end, step, names)
    return json.dumps(data)


def get_planets_data(start, end, step, names):
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planets = get_planets(names, mydb)
    print(planets)
    objects = {}
    data = {}

    for planet in planets:
        if (step == '1h'):
            cache_res = search_planets_cache(planet["name"], start, mydb)
            if (cache_res is not None):
                data[planet["name"]] = cache_res
                continue

        res = Horizons(id=str(planet["_id"]), location='@Sun', epochs={"start": str(
            start), "stop": str(end), "step": str(step)}, id_type='majorbody')
        vec = res.vectors()
        print(planet)
        possitons_data = {}
        for name in vec.colnames:
            if name in ['x', 'y', 'z']:
                possitons_data[name] = vec[name].to(u.km).value.tolist()
        data[planet["name"]] = possitons_data
        if (step == '1h'):
            add_to_planets_cache(planet["name"], start, possitons_data, mydb)

    client.close()

    return data


@app.route("/cache")
def get_cache():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planets_cache = mydb["planetsCache"]
    res = list(planets_cache.find())
    client.close()
    return json.dumps(res, default=str)

@app.route("/cacheS")
def get_cache_s():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planets_cache = mydb["satellitesCache"]
    res = list(planets_cache.find())
    client.close()
    return json.dumps(res, default=str)


def search_planets_cache(planet, date, mydb):
    planets_cache = mydb["planetsCache"]
    data = planets_cache.find_one(
        {"$and": [{'planet': planet}, {'date': date}]})
    if data == None:
        return None
    return data['points']


def search_satellites_cache(satellite, date, mydb):
    satellites_cache = mydb["satellitesCache"]
    data = satellites_cache.find_one(
        {"$and": [{'satellite': satellite}, {'date': date}]})
    if data == None:
        return None
    return data['points']


def add_to_planets_cache(planet, start, data, mydb):
    planets_cache = mydb["planetsCache"]
    planets_cache.insert({'planet': planet, 'date': start, 'points': data})

def add_to_satellites_cache(planet, start, data, mydb):
    satellites_cache = mydb["satellitesCache"]
    satellites_cache.insert({'satellite': planet, 'date': start, 'points': data})


@app.route("/getAsteroidsJPLData")
def get_JPL_asteroid_belt():
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    data = get_asteroids_data(start, end, step)

    return json.dumps(data)


def get_asteroids_data(start, end, step):
    asteroids = get_asteroids()
    print(asteroids)
    objects = {}
    data = {}

    for asteroid in asteroids:
        # print("here")
        res = Horizons(id=str(asteroid["_id"]), location='@Sun', epochs={"start": str(
            start), "stop": str(end), "step": str(step)}, id_type='smallbody')
        vec = res.vectors()
        print(asteroid)
        possitons_data = {}
        for name in vec.colnames:
            if name in ['x', 'y', 'z']:
                possitons_data[name] = vec[name].to(u.km).value.tolist()
        data[asteroid["name"]] = possitons_data

    return data


def parse_names(names):
    names = names.replace("[", "")
    names = names.replace("]", "")
    return names.split(",")


def get_planets(names, mydb):
    planet_collection = mydb["planets"]
    print(type(names))
    print(names)
    res = planet_collection.find({'name': {"$in": names}})
    data = []
    for doc in res:
        data.append(doc)
    return data


@app.route("/asteroid")
def get_asteroids():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    asteroids_collection = mydb["asteroids"]
    res = asteroids_collection.find()
    client.close()
    data = []
    for doc in res:
        print(doc)
        data.append(doc)
    return data

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


@app.route('/assets/heightmaps/<planet>')
def get_heightmap(planet):
    return send_file(
        "./assets/heightmaps/{}.jpg".format(planet),
        as_attachment=True,
        attachment_filename="{}.jpg".format(planet),
        mimetype='image/jpeg'
    )

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
