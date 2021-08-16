import { Vector3 } from '@babylonjs/core';
import { PositionData } from "../types/planetInterfaces";

export default function rescaleData(position: PositionData): Vector3[] {
    const points: Vector3[] = [];
    console.log("rescale", position);
    for (let i = 0; i < position.x.length; i++)
        points.push(new Vector3(position.x[i] / 10000000, position.y[i] / 10000000, position.z[i] / 10000000));
    return points;
}