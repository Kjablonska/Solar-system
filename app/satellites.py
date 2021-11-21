import pymongo
from astroquery.jplhorizons import Horizons
from astropy import units as u
from cache import search_satellites_cache, add_to_satellites_cache

def get_satellites(planet, start, end, step):
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
    return data