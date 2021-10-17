import { Vector3 } from '@babylonjs/core';
import { PositionData } from '../types/planetInterfaces';

// TODO
interface ScaleDistance {
    diameter: number;
    distance: number;
}

const diameterMap = new Map<string, number>([
    ['Mercury', 453904.0452],
    ['Venus', 848228.2847],
    ['Earth', 1172781.436],
    ['Mars', 1786610.223],
    ['Jupiter', 6103794.293],
    ['Saturn', 11237848.86],
    ['Uranus', 22518814.68],
    ['Naptune', 35239103.17],
]);

export default function rescaleData(position: PositionData, planet: string): Vector3[] {
    const points: Vector3[] = [];
    let factor = diameterMap.get(planet);
    if (factor === undefined) {
        factor = 100000;
        console.log('undewfi', planet);
    }

    for (let i = 0; i < position.x.length; i++) {
        points.push(new Vector3(position.x[i] / (12756000 * 2), position.y[i] / (12756000 * 2), position.z[i] / (12756000 * 2)));
        // points.push(new Vector3(position.x[i] / (127560000), position.y[i] / (127560000), position.z[i] / (127560000)));
    }
    return points;
}
