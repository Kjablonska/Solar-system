import { Vector3 } from '@babylonjs/core';

export interface Side {
    name: string;
    direction: Vector3;
    rotateX: number;
    rotateY: number;
}