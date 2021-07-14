import { ArcRotateCamera, Vector3, Curve3, PointLight, StandardMaterial, Scene, MeshBuilder, Mesh } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui"
import { PlanetData } from "../../utils/planetInterfaces"
import SceneComponent from "./SceneComponent.jsx";
import React from 'react';

interface SceneProps {
    planetsData: PlanetData[],
    realTime: boolean,
    realTimeData: any,
    startDate: string,
    endDate: string,
}

interface VisualisationData {
    planet: Mesh,
    orbit: Vector3[],
    iter: number,
}

const CreateScene: React.FC<SceneProps> = ({realTimeData, realTime, planetsData, startDate, endDate}):any => {
    const visualisationData: VisualisationData[] = [];
    console.log("create scene rerender")

    const timePeriod = 30

    const attacheCamera = (scene: Scene) => {
        var camera = new ArcRotateCamera("camera1",  0, 0, 0, new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();   
        camera.attachControl(canvas, true);
        camera.lowerBetaLimit =-Infinity
        camera.upperBetaLimit = Infinity
    }
    
    const attacheLight = (scene: Scene) => {
        var light = new PointLight("light", new Vector3(0, 0, 0), scene);
        light.intensity = 2;
    
        const sun = MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene)
        sun.position.copyFrom(light.position)
        const material = new StandardMaterial("mat", scene)
        material.emissiveColor = light.diffuse;
        sun.material = material;
    }
    
    const onSceneReady = (scene: Scene) => {
        attacheCamera(scene);
        attacheLight(scene);
        addPlantes(scene);
    };


    const addPlantes = (scene: Scene) => {
        if (planetsData === undefined)
            return;
        
        for (const el of planetsData) {
            const position = el.position;
            const planetName = el.planet;

            const points = []
            for (let i = 0; i < position.x.length; i++) 
                points.push(new Vector3(position.x[i]/10000000, position.y[i]/10000000, position.z[i]/10000000))
            
            // Draw orbits and planets
            const planetCurve = Curve3.CreateCatmullRomSpline(points, 20, false);
            Mesh.CreateLines(planetName, planetCurve.getPoints(), scene);

            const planet = MeshBuilder.CreateSphere(planetName, {diameter: 1}, scene);
            planet.position.x = points[0].x;
            planet.position.y = points[0].y;
            planet.position.y = points[0].z;
            
            const currDate = new Date()

            // textblock.text = currDate.getFullYear().toString() + '-' +  (currDate.getMonth() + 1).toString() + '-' + currDate.getDate().toString()  + currDate.getHours().toString() + '-' +  currDate.getMinutes().toString() + '-' + currDate.getSeconds().toString() ;
            // textblock.fontSize = 24;
            // textblock.top = -100;
            // textblock.color = "white";
            // advancedTexture.addControl(textblock);

            if (!realTime) {
                const newPlanetData:VisualisationData = {planet: planet, orbit: planetCurve.getPoints(), iter: 0}
                visualisationData.push(newPlanetData)
            }
            else {
                const newPlanetData:VisualisationData = {planet: planet, orbit: points, iter: 0}
                visualisationData.push(newPlanetData)
            }
        }
    }
    
    const onRender = (scene:any) => {
        if (visualisationData !== undefined && visualisationData.length === planetsData.length) {
            //   var deltaTimeInMillis = scene.getEngine().getDeltaTime();
            //   const rpm = 10;
            //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
            for (let data of visualisationData) {
                if (realTime) {
                    console.log(data.iter, data.orbit.length)
                    data.planet.position.x = data.orbit[0].x;
                    data.planet.position.y = data.orbit[0].y;
                    data.planet.position.z = data.orbit[0].z;

                    data.orbit.shift();
                    data.iter++;
                    // console.log(data.iter, data.orbit.length)
                    if (data.iter > data.orbit.length / 3) {
                        startDate = calculatStart();
                        endDate = calculateEnd();
                        console.log(startDate)
                        console.log(endDate)
                        const newData = realTimeData(data.planet.name, startDate, endDate);
                        data.orbit.push(newData)
                        data.iter = 0;
                    }

                }
                else {
                    data.planet.position.x = data.orbit[data.iter].x;
                    data.planet.position.y = data.orbit[data.iter].y;
                    data.planet.position.z = data.orbit[data.iter].z;
                    data.iter++;
                    if (data.iter > data.orbit.length - 1) {
                        data.iter = data.orbit.length - 1
                    }
                }

            }
        }

    };

    const calculateEnd = () => {
        const newEnd = new Date(endDate);
        newEnd.setDate(newEnd.getDate() + timePeriod);
        console.log("calcuate End", newEnd.getFullYear().toString() + '-' +  (newEnd.getMonth() + 1).toString() + '-' + newEnd.getDate().toString())
        return newEnd.getFullYear().toString() + '-' +  (newEnd.getMonth() + 1).toString() + '-' + newEnd.getDate().toString();
    }

    const calculatStart = () => {
        console.log("calcate start", endDate)
        return endDate;
    }


    return (
        <div id="my-canvas">
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </div>
    )
}

export default CreateScene
