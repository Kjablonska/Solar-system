# Celestial Bodies Visualisation

Web application developed as a bachelor thesis project.

# Deploy

## Frontend

To run the project locally:

```
cd frontend
npm install
npm start
```

Then go to ```http://localhost:3000/``` page in your browser.

To run tests:
```
cd frontend
yarn test
```

## Backend 
To backend server and database locally:
```
cd app
docker-compose up --build
```

See logs:  
```
sudo docker logs <app_image_id>
```
Run tests: 
```
sudo docker exec -it <app_image_id> pytest test.py
```

Note! To check app_image_id please run 
```
sudo docker container ls
```
and find the ID of ```app_web``` image.


## Description
The system visualises the acctual Solar System data provided by the NASA JPL Horizons service (https://ssd.jpl.nasa.gov/horizons/).
There are two visualisation modes: Solar System and Planet & its satellites. Both are dependend on the user selected parameters.

"Solar System" mode:
* Start date  - Defines the beginning of the time frame used in the visualisation.  
* End date (optional) - Defines the end date of the time frame. The visualisation freezes once it reaches the end date. If not set, the visualisation will continue in real time.  
* Speed mode & Defines the visualisation speed which is defined by the time needed for one jump - transition between two subsequent orbit points.
    The available speed modes are defined as follows:  
        - Real Time - one jump corresponds to 1 second in the real world.  
        - Medium - one jump corresponds to 2.4 hours in the real world.   
        - Fast - one jump corresponds to 4.8 hours in the real world.  
        
"Planet & its satellites" mode:  
* Planet - To be selected from the planets of the solar system.   
* Start date  - Defines the beginning of the time frame used in the visualisation.  
* End date (optional) - Defines the end date of the time frame. The visualisation freezes once it reaches the end date. If not set, the visualisation will continue in real time.  
* Speed mode & Defines the visualisation speed which is defined by the time needed for one jump - transition between two subsequent orbit points. 