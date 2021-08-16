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
import { PlanetData, VisualisationData } from '../../types/planetInterfaces';
import SceneComponent from './SceneComponent';
import React from 'react';
import planetTimer from '../../utils/setMovementTimer';
import useFillOrbitesData from '../../hooks/useFillOrbitesPoints';

interface SceneProps {
    planetsData: PlanetData[];
    isRealTime: boolean;
    startDate: string;
    endDate: string;
    speed: number;
}

const CreateScene: React.FC<SceneProps> = ({ isRealTime, planetsData, startDate, endDate, speed }) => {
    const visualisationData: VisualisationData[] = [];

    const { movePlanet } = useFillOrbitesData({ isRealTime, startDate, endDate });

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
            const points = el.position;
            const planetName = el.planet;

            console.log('add planets', planetsData, typeof points);

            // Data is fetched in the period of one minute. Fill each two points with 58 points to make the period of 1second.
            const planetCurve = Curve3.CreateCatmullRomSpline(points, 58, false);

            Mesh.CreateLines(planetName, planetCurve.getPoints(), scene);
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: 0.5 }, scene);

            const newPlanetData: VisualisationData = { planet: planet, orbit: planetCurve.getPoints(), iter: 0 };
            visualisationData.push(newPlanetData);
        }

        console.log(visualisationData);
        const timer = planetTimer({ scene, movePlanet, visualisationData, planetsData, speed });

        // TODO: adjust to the selected data.
        console.log('timer', speed);
        timer.start(speed);
    };

    const onRender = (scene: any) => {};

    return (
        <div id='my-canvas'>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
        </div>
    );
};

export default CreateScene;
