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
db.createCollection('planetsCache');
db.createCollection('satellitesCache');

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
);

db.planets.insert(
    [
        {
            "_id": "0",
            "name": "SolarSystem",
            "info": {},
        },
        {
            "_id": "199",
            "name": "Mercury",
            "info": {},
            "satellites": [],
        },
        {
            "_id": "299",
            "name": "Venus",
            "info":
            {
                "Radius": "6051.84 km",
                "Mass": "48.685 x10^23 kg",
                "Gravity": "8.870 m/s^2",
                "Density": "5.204 g/cm^3",
                "Mean solar day": "116.7490 d",
                "Orbit period": "225 d",
                "Orbit speed": "35.021 km/s",
                "Mean temperature": "735 K"
            },

            "satellites": [],
        },
        {
            "_id": "399",
            "name": "Earth",
            "info":
            {
                "Radius": "6371.01 km",
                "Mass": "5.97219 x10^24 kg",
                "Density": "5.51 g/cm^3",
                "Mean solar day": "23.9344695944 h",
                "Orbit period": "365.256 d",
                "Mean temperature": "270 K"
            },
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
            ],
            "info": {},
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
                }
            ],
            "info": {},
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
                },
                {
                    "_id": "604",
                    "name": "Dione"
                },
                {
                    "_id": "605",
                    "name": "Rhea"
                },
                {
                    "_id": "606",
                    "name": "Titan"
                },
                {
                    "_id": "607",
                    "name": "Hyperion"
                },
                {
                    "_id": "608",
                    "name": "Iapetus"
                },
            ],
            "info": {},
        },
        {
            "_id": "799",
            "name": "Uranus",
            "satellites": [
                {
                    "_id": "701",
                    "name": "Ariel"
                },
                {
                    "_id": "702",
                    "name": "Umbriel"
                },
                {
                    "_id": "703",
                    "name": "Titania"
                },
                {
                    "_id": "704",
                    "name": "Oberon"
                },
                {
                    "_id": "705",
                    "name": "Miranda"
                }
            ],
            "info": {},
        },
        {
            "_id": "899",
            "name": "Neptune",
            "satellites": [
                {
                    "_id": "801",
                    "name": "Triton"
                },
                {
                    "_id": "802",
                    "name": "Nereid"
                },
                {
                    "_id": "803",
                    "name": "Naiad"
                },
                {
                    "_id": "804",
                    "name": "Thalassa"
                },
                {
                    "_id": "805",
                    "name": "Despina"
                },
                {
                    "_id": "806",
                    "name": "Galatea"
                },
                {
                    "_id": "807",
                    "name": "Larissa"
                },
                {
                    "_id": "808",
                    "name": "Proteus"
                },
            ],
            "info": {},
        }
    ]
);
