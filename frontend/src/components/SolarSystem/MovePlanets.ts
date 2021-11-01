import { Scene, LinesMesh, Vector3, Curve3, MeshBuilder } from '@babylonjs/core';
import { DatesPeriod, FetchData, VisualisationOptions } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import { findNewPeriod } from '../../utils/findFetchPeriod';
import getPlanetOrbitData from '../../utils/getOrbiteData';
import ErrorHandler from '../../utils/handlers/ErrorHandler';

interface OribteDrawer {
    linesMesh: LinesMesh;
    initPosition: Vector3;
    buffer: Vector3[];
}

export class MovePlanets {
    visualisationData: VisualisationData[];
    visualisationOptions: VisualisationOptions;
    fetchAll: boolean = false;
    fetchData: FetchData;
    currentPeriod: DatesPeriod;
    onEndDateReached: () => void;
    stop: boolean = false;
    stopFetch: boolean = false;
    errorHandler: ErrorHandler;
    scene: Scene;
    linesMeshes: Map<string, OribteDrawer>;
    oribteDrawerCounter: number = 0;
    draw: boolean = true;

    constructor(
        visualisationData: VisualisationData[],
        visualisationOptions: VisualisationOptions,
        fetchData: FetchData,
        scene: Scene,
    ) {
        this.visualisationOptions = visualisationOptions;
        this.currentPeriod = { start: visualisationOptions.start, end: visualisationOptions.currentEnd };
        this.visualisationData = visualisationData;
        this.fetchData = fetchData;
        this.errorHandler = new ErrorHandler(this.onDataEnd);
        this.scene = scene;
        this.linesMeshes = new Map<string, OribteDrawer>();
        for (let el of visualisationData) {
            const initPoints = [];

            for (let i = 0; i < 10; i++) {
                initPoints.push(el.orbit[i]);
            }

            const lineMesh = MeshBuilder.CreateLines(`${el.planet.name} orbit`, {
                points: initPoints,
                updatable: true,
            });
            this.linesMeshes.set(el.planet.name, {
                linesMesh: lineMesh,
                initPosition: el.orbit[10],
                buffer: initPoints,
            });
        }

        console.log(this.linesMeshes);
    }

    movePlanet = async () => {
        this.oribteDrawerCounter++;
        if ((this.oribteDrawerCounter = 10)) {
            this.draw = true;
            this.oribteDrawerCounter = 0;
        }
        console.log(this.visualisationData !== undefined && !this.stop &&  !this.checkIfEndDateReached())
        if (this.visualisationData !== undefined && !this.stop && !this.checkIfEndDateReached()) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data, this.draw);
                data.orbit.shift();
                data.iter += 1;

                if (!this.stopFetch && !this.fetchAll && data.iter > data.length / 4) {
                    this.fetchAll = true;
                    await this.onDataEnd().then(() => {
                        this.fetchAll = false;
                    });
                }
            }
            this.draw = false;
        }
    };

    stopVisualisation = () => {
        console.log('visualisation stopped');
        this.stop = true;
    };

    startVisualisation = () => {
        console.log("stopeed")
        this.stop = false;
    };

    setPosition = (data: VisualisationData, draw: boolean): VisualisationData => {
        if (data.orbit.length < 1) this.stopVisualisation();
        else {
            data.planet.position.x = data.orbit[0]._x;
            data.planet.position.y = data.orbit[0]._y;
            data.planet.position.z = data.orbit[0]._z;
            if (draw) {
                this.drawOrbit(data.orbit[0], data.planet.name);
            }
        }
        return data;
    };

    drawOrbit = (position: Vector3, planetName: string) => {
        const orbit = this.linesMeshes.get(planetName);
        if (!orbit) {
            console.log('No such planet!');
            return;
        }

        const { linesMesh, buffer, initPosition } = orbit;

        linesMesh.dispose();

        const orbitPoints = Curve3.CreateCatmullRomSpline([initPosition, position], 10, false).getPoints();
        const newBuffer = [...buffer, ...orbitPoints.slice(-1)];
        const linesMeshInstance = MeshBuilder.CreateLines(`${planetName}`, {
            points: newBuffer,
        });

        this.linesMeshes.set(planetName, { linesMesh: linesMeshInstance, initPosition: position, buffer: newBuffer });
    };

    onDataEnd = async () => {
        try {
            console.log('DATA ENDED');
            this.currentPeriod = findNewPeriod(this.currentPeriod, this.fetchData.period);
            if (this.checkIfEndDateReached())
                return;

            const newData = await getPlanetOrbitData({
                planet: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Luna'],
                startDate: this.currentPeriod.start,
                endDate: this.currentPeriod.end,
                fill: this.fetchData.refill,
                step: this.fetchData.step,
            });

            for (const el of this.visualisationData) {
                const toModify = newData.get(el.planet.name);
                el.length = el.orbit.length + toModify!.length;
                el.orbit.push(...toModify!);
                el.iter = 0;
            }
            this.startVisualisation();
            this.stopFetch = false;
        } catch (e: any) {
            // this.stopVisualisation();
            console.log('ERROR', e);
            this.stopFetch = true;
            this.errorHandler.openErrorHandler();
        }
    };

    checkIfEndDateReached = () => {
        if (
            this.visualisationOptions.end !== undefined &&
            new Date(this.currentPeriod.end) >= new Date(this.visualisationOptions.end)
        ) {
            console.log("end")
            this.onEndDateReached();
            return  true;
        }

        return false;
    };
}

