from flask import abort
import pymongo
from datetime import datetime
from database import connect_to_db, close_db_connection

CACHE_SIZE = 200

def get_cache_data():
    client = connect_to_db()
    mydb = client["celestial-bodies"]
    planets_cache = mydb["planetsCache"]
    res = list(planets_cache.find())
    close_db_connection(client)
    return res

# def get_planets_cache_collection():
#     client = connect_to_db()
#     mydb = client["celestial-bodies"]
#     planets_cache = mydb["planetsCache"]
#     return client, planets_cache


# def get_satellites_cache_collection():
#     client = connect_to_db()
#     mydb = client["celestial-bodies"]
#     satellites_cache = mydb["satellitesCache"]
#     return client, satellites_cache

def get_cache_satellites():
    client = connect_to_db()
    mydb = client["celestial-bodies"]
    planets_cache = mydb["satellitesCache"]
    res = list(planets_cache.find())
    print(res)
    close_db_connection(client)
    return res


def search_satellites_cache(satellite, date, mydb):
    satellites_cache = mydb["satellitesCache"]
    return search_cache(satellites_cache, date, satellite)


def search_planets_cache(planet, date, mydb):
    planets_cache = mydb["planetsCache"]
    return search_cache(planets_cache, date, planet)

def search_satellites_cache_db(planet, date):
    client = connect_to_db()
    mydb = client["celestial-bodies"]
    planets_cache = mydb["satellitesCache"]
    res = search_cache(planets_cache, date, planet)
    close_db_connection(client)
    return res

def search_planets_cache_db(planet, date):
    client = connect_to_db()
    mydb = client["celestial-bodies"]
    planets_cache = mydb["planetsCache"]
    res = search_cache(planets_cache, date, planet)
    close_db_connection(client)
    return res

def search_cache(cache, date, body):
    print(cache)
    data = cache.find_one(
        {"$and": [{'object': body}, {'date': date}]}
    )
    if data == None:
        return None

    cache.update_one({"$and": [{'object': body}, {'date': date}]}, {
        "$set": {'last_used': datetime.now()}})
    return data['points']


def add_to_planets_cache(planet, start, data, mydb):
    planets_cache = mydb["planetsCache"]
    update_cache(planets_cache, planet, start, data)


def add_to_satellites_cache(satellite, start, data, mydb):
    satellites_cache = mydb["satellitesCache"]
    update_cache(satellites_cache, satellite, start, data)


def update_cache(cache, body, start, data):
    cache.insert_one(
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
    client = connect_to_db()
    mydb = client["celestial-bodies"]
    satellites_cache = mydb["satellitesCache"]
    size = satellites_cache.count_documents({})
    close_db_connection(client)
    return str(size)
