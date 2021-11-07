import { Curve3, Vector3 } from '@babylonjs/core';
import { FetchObjects } from '../types/period';
import rescaleData from './rescaleData';
interface OribtDataProps {
    objects: FetchObjects;
    startDate: string;
    endDate: string;
    fill: number;
    step: string;
}

export default async function getPlanetOrbitData({ objects, startDate, endDate, fill, step }: OribtDataProps) {
    let response;
    if (objects.satellites) {
        response = await fetch(
            `http://localhost:5000/getSatellitesJPLData?planet=${objects.planets}&start=${startDate}&end=${endDate}&step=${step}`,
        );
    } else {
        response = await fetch(
            `http://localhost:5000/getPlanetsJPLData?name=${objects.planets}&start=${startDate}&end=${endDate}&step=${step}`,
        );
    }
    const orbite = await response.json();
    const readyData: Map<string, Vector3[]> = new Map();
    for (const key in orbite) {
        const newData = rescaleData(orbite[key], key);
        const planetCurve = Curve3.CreateCatmullRomSpline(newData, fill, false);
        readyData.set(key, planetCurve.getPoints());
    }

    return readyData;
}
