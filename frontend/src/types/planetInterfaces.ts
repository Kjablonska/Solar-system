import {
    Vector3,
    Mesh,
} from '@babylonjs/core';

export interface PlanetData {
    planet: string,
    position: Vector3[];
}

export interface PositionData {
    x: number[],
    y: number[],
    z: number[]
}

export interface VisualisationData {
    planet: Mesh;
    orbit: Vector3[];
    iter: number;
}
