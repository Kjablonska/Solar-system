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

from satellites import get_satellites
from planets import get_info, get_planets_data
from cache import get_cache_data, get_cache_satellites, search_satellites_cache_db, search_planets_cache_db

app = Flask(__name__)

CORS(app)


def get_app():
    return app


@app.route("/getSatellitesJPLData")
def get_satellites_data():
    planet = request.args.get('planet')
    start = request.args.get('start')
    end = request.args.get('end')
    step = request.args.get('step')
    data = get_satellites(planet, start, end, step)
    return json.dumps(data)


@app.route("/getPlanetsJPLData")
def get_JPL_planets_data():
    names = request.args.get('name')
    print(names)
    names = parse_names(names)
    print(names)
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



def parse_names(names):
    names = names.replace("[", "")
    names = names.replace("]", "")
    return names.split(",")
