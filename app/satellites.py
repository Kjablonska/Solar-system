import pymongo
from astroquery.jplhorizons import Horizons
from flask import abort
from astropy import units as u
from cache import search_satellites_cache, add_to_satellites_cache, connect_to_db
from database import connect_to_db, close_db_connection
from common import validate_dates

from requests import exceptions as ex1
from urllib3 import exceptions as ex2

def get_satellites(planet, start, end, step):
    client = connect_to_db()
    mydb = client["celestial-bodies"]
    planet_collection = mydb["planets"]

    planet_data = planet_collection.find_one({'name': planet})
    if planet_data is None:
        return {}

    location = f'@{planet_data["_id"]}'
    satellites = planet_data["satellites"]
    objects = {}
    data = {}
    try:
        validate_dates(start, end)
        for satellite in satellites:
            cache_res = search_satellites_cache(satellite["name"], start, mydb)
            if (cache_res is not None):
                data[satellite["name"]] = cache_res
                continue

            possitons_data = get_JPL_Horizons(start, end, step, location, satellite["_id"])
            data[satellite["name"]] = possitons_data
            add_to_satellites_cache(satellite["name"], start, possitons_data, mydb)
    except (ex1.ConnectTimeout, ex2.MaxRetryError, ex2.ConnectTimeoutError) as error:
        abort(408, error)
    except ValueError:
        abort(422, 'Invalid input data.')
    finally:
        close_db_connection(client)
    return data


def get_JPL_Horizons(start, end, step, location, satellite_id):
    res = Horizons(id=str(satellite_id), location=location, epochs={
                    "start": str(start), "stop": str(end), "step": str(step)}, id_type='majorbody')
    vec = res.vectors()
    possitons_data = {}
    for name in vec.colnames:
        if name in ['x', 'y', 'z']:
            possitons_data[name] = vec[name].to(u.km).value.tolist()
    return possitons_data