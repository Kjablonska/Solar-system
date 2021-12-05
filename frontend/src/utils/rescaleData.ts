import { Vector3 } from '@babylonjs/core';
import { PositionData } from '../types/planetInterfaces';

const scaleMap = new Map<string, number>([
    ['Earth', 10000],
    ['Mars', 100],
    ['Jupiter', 10000],
    ['Saturn', 10000],
    ['Uranus', 10000],
    ['Neptune', 1000],
]);

const SCALE_CONST = 25512000;

export default function rescaleData(position: PositionData, planet: string, satellite: boolean): Vector3[] {
    const points: Vector3[] = [];
    let factor = SCALE_CONST;

    if (satellite) factor = scaleMap.get(planet) || 1000;

    for (let i = 0; i < position.x.length; i++) {
        points.push(new Vector3(position.x[i] / factor, position.y[i] / factor, position.z[i] / factor));
    }
    return points;
}
