import { Scene, LinesMesh, Vector3, Curve3, MeshBuilder, VertexBuffer } from '@babylonjs/core';
import { DatesPeriod, FetchData, VisualisationOptions } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import { findNewPeriod } from '../../utils/findFetchPeriod';
import getOrbiteData from '../../utils/getOrbiteData';
import ErrorHandler from './ErrorHandler';

const INIT_MOVEMENT = 1; // defines number of points to jump over.

interface OribteDrawer {
    linesMesh: LinesMesh;
    initPosition: Vector3;
    buffer: Vector3[];
}

export class MovePlanets {
    visualisationData: VisualisationData[];
    visualisationSpeed: number;
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
        speed: number,
        scene: Scene,
    ) {
        this.visualisationOptions = visualisationOptions;
        this.currentPeriod = { start: visualisationOptions.start, end: visualisationOptions.currentEnd };
        this.visualisationData = visualisationData;
        this.visualisationSpeed = speed || INIT_MOVEMENT;
        this.fetchData = fetchData;
        this.errorHandler = new ErrorHandler(this.onDataEnd);
        this.scene = scene;
        this.linesMeshes = new Map<string, OribteDrawer>();
        for (let el of visualisationData) {
            console.log('init drawer', el.planet.name);
            // const lineMesh = new LinesMesh(`${el.planet.name} orbite`, scene);
            const initPoints = [];

            for (let i = 0; i < 10; i++) {
                initPoints.push(el.orbit[i]);
            }

            const lineMesh = MeshBuilder.CreateLines(`${el.planet.name} orbit`, {
                points: initPoints,
                updatable: true,
            });
            this.linesMeshes.set(el.planet.name, { linesMesh: lineMesh, initPosition: el.orbit[10], buffer: initPoints });
            console.log("lines", initPoints, lineMesh);
        }

        console.log(this.linesMeshes)
    }

    movePlanet = async () => {
        this.oribteDrawerCounter++;
        if (this.oribteDrawerCounter = 10) {
            this.draw = true;
            this.oribteDrawerCounter = 0;
        }
        if (this.visualisationData !== undefined && !this.stop) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data, this.draw);
                data.orbit.splice(0, this.visualisationSpeed);
                data.iter += this.visualisationSpeed;

                if (!this.stopFetch && !this.fetchAll && data.iter > data.length / 4) {
                    // TODO: refill all data instead.
                    console.log('DATA ENDED');
                    this.fetchAll = true;
                    await this.onDataEnd().then(() => {
                        this.fetchAll = false;
                    });
                }
            }
            this.draw = false;
        }
    };

    changeSpeed = (speed: number) => {
        this.visualisationSpeed = speed;
    };

    stopVisualisation = () => {
        console.log('visualisation stopped');
        this.stop = true;
    };

    startVisualisation = () => {
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
        const orbi = this.linesMeshes.get(planetName)
        if (!orbi) {
            console.log("no such planet")
            return
        }

        const {linesMesh, buffer, initPosition} = orbi

        linesMesh.dispose()

        const orbitPoints = Curve3.CreateCatmullRomSpline([initPosition, position], 10, false).getPoints();
        const newBuffer = [...buffer, ...orbitPoints.slice(-1)]
        const linesMeshInstance = MeshBuilder.CreateLines(`${planetName}`, {
            points: newBuffer,
        })

        this.linesMeshes.set(planetName, { linesMesh: linesMeshInstance, initPosition: position, buffer: newBuffer })
    };

    onDataEnd = async () => {
        try {
            console.log('DATA ENDED');
            this.currentPeriod = findNewPeriod(this.currentPeriod, this.fetchData.period);
            // TODO: end date
            // if (this.endDate !== undefined && new Date(this.currentPeriod.end) >= new Date(this.endDate)) {
            //     this.onEndDateReached();
            //     return;
            // }

            const newData = await getOrbiteData({
                planet: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
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
}
