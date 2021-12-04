import pytest
import json

# First party modules
from app import get_app
from cache import search_planets_cache_db, search_satellites_cache_db
from planets import get_planets, connect_to_db
from database import close_db_connection


@pytest.fixture
def client():
    app = get_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# -----------------------------------------------------------
#
# Planet's info tests.
#
# ------------------------------------------------------------

"""
Case scenario: request for planet's info for planet that exists in database.
Expected result: Response 200 OK.
"""


def test_planet_info(client):
    response = client.get("/getPlanetInfo?planet=Earth")
    assert response.status_code == 200


"""
Case scenario: request for planet's info for planet that exists in database.
Expected result: Response 200 OK.
"""


def test_solar_system_info(client):
    response = client.get("/getPlanetInfo?planet=SolarSystem")
    assert response.status_code == 200


"""
Case scenario: request for planet's info for planet that does not exist in database.
Expected result: Response 404 Not found.
"""


def test_planet_info_not_found(client):
    response = client.get("/getPlanetInfo?planet=Pluto")
    assert response.status_code == 404


# -----------------------------------------------------------
#
# Planet's data tests.
#
# ------------------------------------------------------------
"""
Case scenario: request for incorrect dates: start date greater than end date.
Expected result: Response 422 Invalid Input Data.
"""


def test_planet_data_incorrect(client):
    response = client.get(
        "/getPlanetsJPLData?name=Mercury,Venus,Earth&start=2021-12-14&end=2021-12-10&step=2h")
    assert response.status_code == 422


"""
Case scenario: correct parameters.
Expected result: Response 200 OK.
"""


def test_planet_data_correct(client):
    response = client.get(
        "/getPlanetsJPLData?name=Mercury,Venus,Earth&start=2021-12-14&end=2021-12-15&step=2h")
    assert response.status_code == 200


"""
Case scenario: request for incorrect planet: given planet does not exist in database.
Expected result: Response 422 Invalid Input Data.
"""


def test_planet_data_incorrect_name(client):
    response = client.get(
        "/getPlanetsJPLData?name=Luna&start=2021-12-14&end=2021-12-15&step=2h")
    assert response.status_code == 422


"""
Case scenario: request for correct data but dates are passed without leading zeros.
Expected result: Response 200 OK.
"""


def test_planet_data_dates_check(client):
    response = client.get(
        "/getPlanetsJPLData?name=Earth&start=2021-1-4&end=2021-1-5&step=2h")
    assert response.status_code == 200


"""
Case scenario: request for planets.
Expected result: All planets data returned.
"""


def test_get_planets():
    client, db = connect_to_db()
    res = get_planets(['Mercury', 'Venus', 'Earth', 'Mars',
                      'Jupiter', 'Saturn', 'Uranus', 'Neptune'], db)
    close_db_connection(client)
    assert len(res) == 8


# -----------------------------------------------------------
#
# Satellites's data tests.
#
# ------------------------------------------------------------
"""
Case scenario: request for incorrect dates: start date greater than end date.
Expected result: Response 422 Invalid Input Data.
"""


def test_satellites_data_incorrect(client):
    response = client.get(
        "/getSatellitesJPLData?planet=Earth&start=2021-12-14&end=2021-12-10&step=2h")
    assert response.status_code == 422


"""
Case scenario: correct parameters.
Expected result: Response 200 OK.
"""


def test_satellites_data_correct(client):
    response = client.get(
        "/getSatellitesJPLData?planet=Earth&start=2021-12-14&end=2021-12-15&step=2h")
    assert response.status_code == 200


"""
Case scenario: request for incorrect planet: given planet does not exist in database.
This results in no satellites being found.
Expected result: Response 422 Invalid Input Data.
"""


def test_satellites_planet_incorrect(client):
    response = client.get(
        "/getSatellitesJPLData?planet=Pluto&start=2021-12-14&end=2021-12-10&step=2h")

    assert response.status_code == 422


def test_add_to_cache(client):
    response = client.get(
        "/getSatellitesJPLData?planet=Earth&start=2021-12-14&end=2021-12-15&step=1h")
    res = search_satellites_cache_db('Luna', '2021-12-14')
    assert res != None


# -----------------------------------------------------------
#
# Cache tests.
#
# ------------------------------------------------------------

"""
Case scenario: cache is empty. Request for correct data.
Expected result: Response 200 OK.
"""


def test_find_in_cache_satellites(client):
    res = search_satellites_cache_db('Earth', '2021-12-14')
    assert res == None


"""
Case scenario: Request for planets' data in Real Time mode should result in adding them to the planet's cache.
Serach for the newly added data in cache.
Expected result: Result is not None.
"""


def test_add_to_cache_planets(client):
    response = client.get(
        "/getPlanetsJPLData?name=Earth&start=2021-12-14&end=2021-12-15&step=1h")
    res = search_planets_cache_db('Earth', '2021-12-14')
    assert res != None


"""
Case scenario: Search satellites's cache for planet's data from the previuous test.
Expected result: Result is None.
"""


def test_find_in_cache_satellites(client):
    res = search_satellites_cache_db('Earth', '2021-12-14')
    assert res == None


"""
Case scenario: Request for satellites data in Real Time mode should result in adding them to the satellites's cache.
Serach for the newly added data in cache.
Expected result: Result is not None.
"""


def test_add_to_cache_satellites(client):
    response = client.get(
        "/getSatellitesJPLData?planet=Earth&start=2021-12-14&end=2021-12-15&step=1h")
    res = search_planets_cache_db('Earth', '2021-12-14')
    assert res != None


"""
Case scenario: Search planets cache for satellites's data from the previous test.
Expected result: Result is None.
"""


def test_find_in_cache_planets(client):
    res = search_planets_cache_db('Luna', '2021-12-14')
    assert res == None
