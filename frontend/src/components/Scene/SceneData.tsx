import {
    ArcRotateCamera,
    Vector3,
    Curve3,
    PointLight,
    StandardMaterial,
    Scene,
    MeshBuilder,
    Mesh,
} from '@babylonjs/core';
// import * as GUI from '@babylonjs/gui';
import { PlanetData } from '../../utils/planetInterfaces';
import SceneComponent from './SceneComponent.jsx';
import React from 'react';
import planetTimer from '../../hooks/PlanetTimer';

interface SceneProps {
    planetsData: PlanetData[];
    realTime: boolean;
    realTimeData: any;
    startDate: string;
    endDate: string;
}

interface VisualisationData {
    planet: Mesh;
    orbit: Vector3[];
    iter: number;
}

const CreateScene: React.FC<SceneProps> = ({ realTimeData, realTime, planetsData, startDate, endDate }): any => {
    const visualisationData: VisualisationData[] = [];
    const timePeriod = 30;

    const attacheCamera = (scene: Scene) => {
        var camera = new ArcRotateCamera('camera1', 0, 0, 0, new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();
        camera.attachControl(canvas, true);
        camera.lowerBetaLimit = -Infinity;
        camera.upperBetaLimit = Infinity;
    };

    const attacheLight = (scene: Scene) => {
        var light = new PointLight('light', new Vector3(0, 0, 0), scene);
        light.intensity = 2;

        const sun = MeshBuilder.CreateSphere('sphere', { diameter: 5 }, scene);
        sun.position.copyFrom(light.position);
        const material = new StandardMaterial('mat', scene);
        material.emissiveColor = light.diffuse;
        sun.material = material;
    };

    const onSceneReady = (scene: Scene) => {
        attacheCamera(scene);
        attacheLight(scene);
        addPlantes(scene);
    };

    const addPlantes = (scene: Scene) => {
        if (planetsData === undefined) return;

        for (const el of planetsData) {
            const position = el.position;
            const planetName = el.planet;

            const points: Vector3[] = [];
            for (let i = 0; i < position.x.length; i++)
                points.push(new Vector3(position.x[i] / 10000000, position.y[i] / 10000000, position.z[i] / 10000000)); // TODO: rescale.

            const planetCurve = Curve3.CreateCatmullRomSpline(points, 60, false);
            Mesh.CreateLines(planetName, planetCurve.getPoints(), scene);
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: 0.5 }, scene);

            const newPlanetData: VisualisationData = { planet: planet, orbit: planetCurve.getPoints(), iter: 0 };
            visualisationData.push(newPlanetData);
        }

        console.warn('add timer');
        const timer = planetTimer(scene, movePlanet);
        timer.start(1000);
    };

    const onRender = (scene: any) => {
        // Does nothing.
        console.log('on render');

    };

    const movePlanet = () => {
        if (visualisationData !== undefined && visualisationData.length === planetsData.length) {
            console.log('move planet');
            for (let data of visualisationData) {
                if (realTime) {
                    data = setPosition(data);
                    data.orbit.shift();
                    data.iter++;
                    if (data.iter > data.orbit.length / 3) {
                        data = onDataEnd(data);
                    }

                    // TODO: add advanced text to each planet.
                } else {
                    data = setPosition(data);
                    data.iter++;
                    if (data.iter > data.orbit.length - 1) {
                        data.iter = data.orbit.length - 1;
                    }
                }
            }
        }
    };

    const setPosition = (data: VisualisationData): VisualisationData => {
        data.planet.position.x = data.orbit[0].x;
        data.planet.position.y = data.orbit[0].y;
        data.planet.position.z = data.orbit[0].z;
        return data;
    };

    const onDataEnd = (data: VisualisationData): VisualisationData => {
        startDate = calculatStart();
        endDate = calculateEnd();
        console.log(startDate);
        console.log(endDate);
        const newData = realTimeData(data.planet.name, startDate, endDate);
        data.orbit.push(newData);
        data.iter = 0;

        return data;
    };

    const calculateEnd = () => {
        const newEnd = new Date(endDate);
        newEnd.setDate(newEnd.getDate() + timePeriod);
        return `${newEnd.getFullYear()}-${newEnd.getMonth() + 1}-${newEnd.getDate()}`;
    };

    const calculatStart = () => {
        return endDate;
    };

    return (
        <div id='my-canvas'>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    );
};

export default CreateScene;
