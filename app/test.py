import pytest
import json

# First party modules
from app import get_app

@pytest.fixture
def client():
    app = get_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

# Correct planet, data present, should return 200 OK.
def test_planet_info(client):
    response = client.get("/getPlanetInfo?planet=Earth")
    assert response.status_code == 200

def test_solar_system_info(client):
    response = client.get("/getPlanetInfo?planet=SolarSystem")
    assert response.status_code == 200

# Given planet does not exist in the database = there is no info for it.
# Should return 404 Not found.
def test_planet_info_not_found(client):
    response = client.get("/getPlanetInfo?planet=Pluto")
    assert response.status_code == 404

# Incorrect dates (start date < end date), raise ValueError.
def test_planet_data_incorrect(client):
    response = client.get("/getPlanetsJPLData?name=Mercury,Venus,Earth&start=2021-12-14&end=2021-12-10&step=2h")
    assert response.status_code == 422

def test_planet_data_incorrect_name(client):
    response = client.get("/getPlanetsJPLData?name=Luna&start=2021-12-14&end=2021-12-15&step=2h")
    assert response.status_code == 422

# Incorrect dates (start date < end date), raise ValueError.
def test_satellites_data_incorrect(client):
    response = client.get("/getSatellitesJPLData?planet=Earth&start=2021-12-14&end=2021-12-10&step=2h")
    assert response.status_code == 422

# Incorrect planet name
def test_satellites_planet_incorrect(client):
    response = client.get("/getSatellitesJPLData?planet=Pluto&start=2021-12-14&end=2021-12-10&step=2h")
    data = json.loads(response.get_data(as_text=True))
    assert data == {}

def test_add_to_cache(client):
    response = client.get("/getSatellitesJPLData?planet=Earth&start=2021-12-14&end=2021-12-15&step=1h")
    cache_search = client.get('/searchSatellitesCache?date=2021-12-14&body=Luna')
    res = cache_search.get_data(as_text=True)
    assert res != ''

def test_find_in_cache_satellites(client):
    cache_search = client.get('/searchSatellitesCache?date=2021-12-14&body=Earth')
    res = cache_search.get_data(as_text=True)
    assert res == ''

def test_add_to_cache_planets(client):
    response = client.get("/getPlanetsJPLData?name=Earth&start=2021-12-14&end=2021-12-15&step=1h")
    cache_search = client.get('/searchPlanetsCache?date=2021-12-14&body=Earth')
    res = cache_search.get_data(as_text=True)
    assert res != ''

def test_find_in_cache_planets(client):
    cache_search = client.get('/searchPlanetsCache?date=2021-12-14&body=Luna')
    res = cache_search.get_data(as_text=True)
    assert res == ''