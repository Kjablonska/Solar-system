import { Curve3, Vector3 } from '@babylonjs/core';
import { KeyboardEventTypes } from 'babylonjs/Events/keyboardEvents';
import { PlanetData } from '../types/planetInterfaces';
import rescaleData from './rescaleData';

const DEFAULT_STEP = '10m';

interface OribtDataProps {
    planet: string[];
    startDate: string;
    endDate: string;
    fill: number;
    step: string;
}

export default async function getData({ planet, startDate, endDate, fill, step }: OribtDataProps) {

    async function getPlanetOrbiteData(planetNames: string[]) {
        const response = await fetch(
            `http://localhost:5000/getObjectsJPLData?name=${planetNames}&start=${startDate}&end=${endDate}&step=${step}`,
        );
        const orbite = await response.json();
        const readyData: Map<string, Vector3[]> = new Map();
        for (const key in orbite) {
            const newData = rescaleData(orbite[key], key);
            const planetCurve = Curve3.CreateCatmullRomSpline(newData, fill, false);
            readyData.set(key, planetCurve.getPoints());
        }

        return readyData;
    }

    return getPlanetOrbiteData(planet);
}


async function getPlanetOrbiteData({ planet, startDate, endDate, fill, step }: OribtDataProps) {
    const response = await fetch(
        `http://localhost:5000/getObjectsJPLData?name=${planet}&start=${startDate}&end=${endDate}&step=${step}`,
    );
    const orbite = await response.json();
    const readyData: Map<string, Vector3[]> = new Map();
    for (const key in orbite) {
        const newData = rescaleData(orbite[key], key);
        const planetCurve = Curve3.CreateCatmullRomSpline(newData, fill, false);
        readyData.set(key, planetCurve.getPoints());
    }

    return readyData;
}

