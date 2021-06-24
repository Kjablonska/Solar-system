from flask import Flask, request, jsonify
from flask_cors import CORS

from astroquery.jplhorizons import Horizons
from astroquery.simbad import Simbad
from astropy.coordinates import ICRS

from astropy import units as u
from astropy.coordinates import SkyCoord

from astropy.table import Table
import pymongo
import json
from astropy import units as u

# TODO:
# 1. possition according to the revolution time: according to the planet that has the longest one?
# 2. add rotation time to database.
# 3. clean the code.

app = Flask(__name__)
CORS(app)

@app.route("/getPlanet")
def get_planetId_by_name():
    name = request.args.get('name')
    return get_planet(name)


@app.route("/getSatellites")
def get_planets_satellites():
    db = connectToDatabase()
    planet_collection = db["planets"]
    planet = request.args.get('planet')

    data = planet_collection.find_one({'name': planet})
    satellites = data["satellites"]
    return json.dumps(satellites)


@app.route("/getObjectJPLData")
def get_JPL_data():
    name = request.args.get('name')
    print(name)
    planet = get_planet(name)
    print(planet)
    print(planet["_id"])

    # 1 MO
    obj = Horizons(id = str(planet["_id"]), location='@Sun', epochs = {"start": "2010-04-01", "stop": "2021-03-30", "step": "1MO"}, id_type='majorbody')

    vec = obj.vectors()
    possitons_data = {}
    for name in vec.colnames:
        if name in ['x', 'y', 'z']:
            possitons_data[name] = vec[name].to(u.km).value.tolist()
    return possitons_data


@app.route("/getStars")
def get_starts():
    name = request.args.get('name')
    result_table = Simbad.query_object(name)

    # Conversion to cartesian coordinates.
    result_table['DEC']
    result_table['RA']
    c = SkyCoord(ra='05 34 31.94', dec='+22 00 52.2',
                 unit=(u.hourangle, u.deg))
    c.cartesian.x
    c.cartesian.y
    c.cartesian.z

    # c = SkyCoord(frame='fk4', ra='14h29m42.9451s', dec='-62d40m46.170s')
    # c.cartesian
    # c = SkyCoord(ra='14h29m42.9451s', dec='-62d40m46.170s', distance=0.0013009097*u.kpc)

    #####
    # 0.10280963


# TODO: put db credentials in config file.
def connectToDatabase():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["solar-system"]
    return mydb


def get_planet(name):
    db = connectToDatabase()
    planet_collection = db["planets"]
    return planet_collection.find_one({'name': name})


# Init db.
@app.route("/getdb")
def dbConnect():
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client['solar-system']
    print(db)

    collection = db['planets']

    collection.insert_one({'_id': '199', 'name': 'Mercury', "revolution": "56"})
    collection.insert_one({'_id': '299', 'name': 'Venus', "revolution": "225"})
    collection.insert_one({'_id': '399', 'name': 'Earth', "revolution": "356"})
    collection.insert_one({'_id': '499', 'name': 'Mars', "revolution": "687"})
    collection.insert_one({'_id': '599', 'name': 'Jupiter', "revolution": "4328"})
    collection.insert_one({'_id': '699', 'name': 'Saturn', "revolution": "10752"})
    collection.insert_one({'_id': '799', 'name': 'Uranus', "revolution": "30660"})
    collection.insert_one({'_id': '899', 'name': 'Neptune', "revolution": "60148.35"})

    return str(db.list_collection_names())



# Local db commands:
# sudo service mongod start
# db.user.remove({})
# mongoimport --db celestialBodies --collection planets --file neptune.json

# Docker commands:
# docker run --name solar-system -p 27017:27017 mongo