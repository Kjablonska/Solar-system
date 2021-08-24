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
            "satellites": [],
        },
        {
            "_id": "399",
            "name": "Earth",
            "satellites": [
                {
                    "_id": "301",
                    "name": "Moon"
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
            "name": "Naptune",
            "satellites": []
        }
    ]
)