import { Vector3, Mesh } from '@babylonjs/core';
import { DeepImmutableArray } from 'babylonjs';

export interface PlanetData {
    planet: string;
    position: DeepImmutableArray<Vector3>;
}

export interface PositionData {
    x: number[];
    y: number[];
    z: number[];
}

export interface VisualisationData {
    planet: Mesh;
    orbit: Vector3[];
    iter: number;
    length: number;
}
