import pymongo
from datetime import datetime

CACHE_SIZE = 20

def get_cache():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planets_cache = mydb["planetsCache"]
    res = list(planets_cache.find())
    client.close()
    return res


def get_cache_satellites():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    planets_cache = mydb["satellitesCache"]
    res = list(planets_cache.find())
    client.close()

    return res


def search_satellites_cache(satellite, date, mydb):
    satellites_cache = mydb["satellitesCache"]
    return search_cache(satellites_cache, date, satellite)


def search_planets_cache(planet, date, mydb):
    planets_cache = mydb["planetsCache"]
    return search_cache(planets_cache, date, planet)


def search_cache(cache, date, body):
    data = cache.find_one(
        {"$and": [{'object': body}, {'date': date}]}
    )
    if data == None:
        return None

    cache.updateOne({"$and": [{'object': body}, {'date': date}]}, {
        "$set": {'last_used': datetime.now()}})
    return data['points']


def add_to_planets_cache(planet, start, data, mydb):
    planets_cache = mydb["planetsCache"]
    update_cache(planets_cache, planet, start, data)


def add_to_satellites_cache(satellite, start, data, mydb):
    satellites_cache = mydb["satellitesCache"]
    update_cache(satellites_cache, satellite, start, data)


def update_cache(cache, body, start, data):
    cache.insert(
        {'object': body, 'date': start, 'points': data, 'last_used': datetime.now()})
    size = cache.count_documents({})

    if size > CACHE_SIZE:
        res = cache.find()
        dates = []
        for doc in res:
            print(doc)
            dates.append(doc["last_used"])

        dates.sort()
        last_used = dates[0]
        cache.delete_one({"last_used": last_used})


def cache_size():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    satellites_cache = mydb["satellitesCache"]
    size = satellites_cache.count_documents({})
    client.close()
    return str(size)
