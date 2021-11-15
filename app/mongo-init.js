db.createUser(
    {
        user: "solar-system",
        pwd: "solar-system",
        roles: [
            {
                role: "readWrite",
                db: "celestial-bodies"
            }
        ]
    }
);

db.createCollection('planets');
db.createCollection('asteroids');

db.asteroids.insert(
    [
        {
            "_id": "951",
            "name": "Gaspra"
        },
        {
            "_id": "243",
            "name": "Ida"
        },
        {
            "_id": "431011",
            "name": "Dactyl"
        },
        {
            "_id": "000001",
            "name": "Ceres"
        },
        {
            "_id": "000002",
            "name": "Pallas"
        },
        {
            "_id": "000004",
            "name": "Vesta"
        },
        {
            "_id": "000016",
            "name": "Psyche"
        },
        {
            "_id": "000021",
            "name": "Lutetia"
        },
        {
            "_id": "000216",
            "name": "Kleopatra"
        },
        {
            "_id": "000433",
            "name": "Eros"
        },
        {
            "_id": "000511",
            "name": "Davida"
        },
        {
            "_id": "000253",
            "name": "Mathilde"
        },
        {
            "_id": "002867",
            "name": "Steins"
        },
        {
            "_id": "009969",
            "name": "Braille"
        },
        {
            "_id": "004015",
            "name": "WilsonHarringtonnnu"
        },
        {
            "_id": "004179",
            "name": "Toutatis"
        },
        {
            "_id": "025143",
            "name": "Itokawa"
        },
        {
            "_id": "101955",
            "name": "Bennu"
        },
    ]
)

db.planets.insert(
    [
        {
            "_id": "199",
            "name": "Mercury",
            "satellites": [],
        },
        {
            "_id": "299",
            "name": "Venus",
            "info": [
                {
                    "radius": "6051.84 km",
                    "mass": "48.685 x10^23 kg",
                    "gravity": "8.870 m/s^2",
                    "density": "5.204 g/cm^3",
                    "mean_solar_day": "116.7490 d",
                    "orbit_period": "225 d",
                    "orbit_speed": "35.021 km/s",
                    "mean_temperature": "735 K"
                }
            ],
            "satellites": [],
        },
        {
            "_id": "399",
            "name": "Earth",
            "info": [
                {
                    "radius": "6371.01 km",
                    "mass": "5.97219 x10^24 kg",
                    "density": "5.51 g/cm^3",
                    "mean_solar_day": "23.9344695944 h",
                    "orbit_period": "365.256 d",
                    "mean_temperature": "270 K"
                }
            ],
            "satellites": [
                {
                    "_id": "301",
                    "name": "Luna",
                }
            ]
        },
        {
            "_id": "499",
            "name": "Mars",
            "satellites": [
              {
                "_id": "401",
                "name": "Phobos"
              },
              {
                "_id": "402",
                "name": "Deimos"
              }
            ]
        },
        {
            "_id": "599",
            "name": "Jupiter",
            "satellites": [
                {
                    "_id": "501",
                    "name": "Io"
                },
                {
                    "_id": "502",
                    "name": "Europa"
                },
                {
                    "_id": "503",
                    "name": "Ganymede"
                },
                {
                    "_id": "504",
                    "name": "Callisto"
                },
                {
                    "_id": "505",
                    "name": "Amalthea"
                },
                {
                    "_id": "506",
                    "name": "Himalia"
                },
                {
                    "_id": "507",
                    "name": "Elara"
                },
                {
                    "_id": "508",
                    "name": "Pasiphae"
                },
                {
                    "_id": "509",
                    "name": "Sinope"
                },
                {
                    "_id": "510",
                    "name": "Lysithea"
                },
                {
                    "_id": "511",
                    "name": "Carme"
                },
                {
                    "_id": "512",
                    "name": "Ananke"
                },
                {
                    "_id": "513",
                    "name": "Leda"
                },
                {
                    "_id": "514",
                    "name": "Thebe"
                },
                {
                    "_id": "515",
                    "name": "Adrastea"
                },
                {
                    "_id": "516",
                    "name": "Metis"
                },
                {
                    "_id": "517",
                    "name": "Callirrhoe"
                }
            ]
        },
        {
            "_id": "699",
            "name": "Saturn",
            "satellites": [
                {
                  "_id": "601",
                  "name": "Mimas"
                },
                {
                  "_id": "602",
                  "name": "Enceladus"
                },
                {
                    "_id": "603",
                    "name": "Tethys"
                  }
              ]
        },
        {
            "_id": "799",
            "name": "Uranus",
            "satellites": []
        },
        {
            "_id": "899",
            "name": "Neptune",
            "satellites": []
        }
    ]
)