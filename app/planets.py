import pymongo
from astroquery.jplhorizons import Horizons
import json
from astropy import units as u
from cache import search_planets_cache, add_to_planets_cache

# def get_JPL_solar_system_data(names, start, end, step):
#     planets = get_planets_data(start, end, step, names)
#     asteroids = get_asteroids_data(start, end, step)

#     data = dict(planets)
#     data.update(asteroids)
#     return json.dumps(data)

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


def get_planets(names, mydb):
    planet_collection = mydb["planets"]
    print(type(names))
    print(names)
    res = planet_collection.find({'name': {"$in": names}})
    data = []
    for doc in res:
        data.append(doc)
    return data


def get_info(planet):
    planet_data = get_planet(planet)
    if planet_data is None:
        return None
    return planet_data["info"]


def get_planet(planet):
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planet_collection = mydb["planets"]

    planet_data = planet_collection.find_one({'name': planet})
    client.close()
    return planet_data