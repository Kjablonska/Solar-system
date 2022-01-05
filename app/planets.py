import pymongo
from flask import abort
from astroquery.jplhorizons import Horizons
import json
from astropy import units as u
from cache import search_planets_cache, add_to_planets_cache
from database import close_db_connection
from common import validate_dates

from requests import exceptions as ex1
from urllib3 import exceptions as ex2


def get_planets_data(start, end, step, names):
    client, mydb = connect_to_db()
    data = {}
    try:
        validate_dates(start, end)
        planets = get_planets(names, mydb)
        for planet in planets:
            if (step == '1h'):
                cache_res = search_planets_cache(planet["name"], start, mydb)
                if (cache_res is not None):
                    data[planet["name"]] = cache_res
                    continue
            possitons_data = get_JPL_Horizons(start, end, step, planet["_id"])
            data[planet["name"]] = possitons_data
            if (step == '1h'):
                add_to_planets_cache(planet["name"], start, possitons_data, mydb)
    except (ex1.ConnectTimeout, ex2.MaxRetryError, ex2.ConnectTimeoutError) as error:
        print(error)
        abort(408, error)
    except ValueError:
        abort(422, 'Invalid input data.')
    finally:
        close_db_connection(client)
    return data

def get_JPL_Horizons(start, end, step, planet_id):
    res = Horizons(id=str(planet_id), location='@Sun', epochs={"start": str(
        start), "stop": str(end), "step": str(step)}, id_type='majorbody')
    vec = res.vectors()
    possitons_data = {}
    data = {}
    for name in vec.colnames:
        if name in ['x', 'y', 'z']:
            possitons_data[name] = vec[name].to(u.km).value.tolist()
    return possitons_data


def connect_to_db():
    try:
        client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
        mydb = client["celestial-bodies"]
        return client, mydb
    except (pymongo.ServerSelectionTimeoutError) as error:
        abort(503, error)

def get_planets(names, mydb):
    planet_collection = mydb["planets"]
    res = planet_collection.find({'name': {"$in": names}})
    data = []
    for doc in res:
        data.append(doc)
    print(data, len(data))
    if len(data) < 1:
        raise ValueError

    return data


def get_info(planet):
    planet_data = get_planet(planet)
    if planet_data is None:
        abort(404, 'Info for {0} not found'.format(planet))
    return planet_data["info"]


def get_planet(planet):
    client, mydb = connect_to_db()

    planet_data = mydb['planets'].find_one({'name': planet})
    close_db_connection(client)
    return planet_data
