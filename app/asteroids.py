import pymongo
from astroquery.jplhorizons import Horizons
from astropy import units as u

def get_asteroids():
    client = pymongo.MongoClient(
        "mongodb://solar-system:solar-system@mongo:27017")
    mydb = client["celestial-bodies"]
    asteroids_collection = mydb["asteroids"]
    res = asteroids_collection.find()
    data = []
    for doc in res:
        print(doc)
        data.append(doc)
    client.close()
    return data


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