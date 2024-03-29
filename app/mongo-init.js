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
db.createCollection('planetsCache');
db.createCollection('satellitesCache');

db.planets.insert(
    [
        {
            "_id": "0",
            "name": "SolarSystem",
            "info": {
                "Age": "~ 4.6 billion years",
                "Planets": "8 planets: Mercury, Venus, Erth, Mars, Jupiter, Saturn, Uranus, Neptune",
                "Number of asteroids": "Over 1.113,527",
                "Number of moons": "Over 200",
                "Diameter": "18.75 trillion km",
                "Orbit time": "230 million years",
                "Speed": "720,000 km/h",
                "Galaxy": "Milky Way"
            },
        },
        {
            "_id": "199",
            "name": "Mercury",
            "info": {
                "Orbit period": "87.97 d",
                "Mass": "3.285 × 10^23 kg",
                "Redius": "2,439.7 km",
                "Mean solar day": "58d 15h 30m",
                "Surface area": "74.8 million km²",
                "Gravity": "3.7 m/s²"
            },
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
                    "name": "Moon",
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
            "info": {
                "Radius": "3389.5km",
                "Distance from Sun": "227.9 million km",
                "Mass": "6.39 × 10^23 kg",
                "Orbital period": "687 days",
                "Mean solar day": "1day 37minutes",
                "Gravity": "3.721 m/s²"
            },
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
            "info": {
                "Radius": "69911 km",
                "Distance from Sun": "778.5 million km",
                "Mass": "1.898 × 10^27 kg",
                "Orbital period": "12 years",
                "Mean solar day": "9h 56m"
            },
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
            "info": {
                "Radius": "58232 km",
                "Distance from Sun": "1.434 billion km",
                "Mass": "5.683 × 10^26 kg",
                "Orbital period": "29 years",
                "Mean solar day": "10h 42m"
            },
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
            "info": {
                "Radius": "25362 km",
                "Distance from Sun": "2.871 billion km",
                "Mass": "8.681 × 10^25 kg",
                "Orbital period": "84 years",
                "Mean solar day": "17h 14m"
            },
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
            "info": {
                "Radius": "24622 km",
                "Distance from Sun": "4.495 billion km",
                "Mass": "1.024 × 10^26 kg",
                "Orbital period": "165 years",
                "Mean solar day": "16h 6m"
            },
        }
    ]
);
