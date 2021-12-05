import rescaleData from './rescaleData';
import { PositionData } from '../types/planetInterfaces';
import { Vector3 } from '@babylonjs/core';

describe('date formatting tests', () => {
    it('rescale data test satellites Earth', () => {
        const toScale: PositionData = {
            x: [1000, 1000, 1000],
            y: [2000, 2000, 2000],
            z: [3000, 3000, 3000],
        };

        const expectedRes: Vector3[] = [
            new Vector3(0.1, 0.2, 0.3),
            new Vector3(0.1, 0.2, 0.3),
            new Vector3(0.1, 0.2, 0.3),
        ];

        const rescaled = rescaleData(toScale, 'Earth', true);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test satellites Mars', () => {
        const toScale: PositionData = {
            x: [1000, 1000, 1000],
            y: [2000, 2000, 2000],
            z: [3000, 3000, 3000],
        };

        const expectedRes: Vector3[] = [new Vector3(10, 20, 30), new Vector3(10, 20, 30), new Vector3(10, 20, 30)];

        const rescaled = rescaleData(toScale, 'Mars', true);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test satellites Jupiter', () => {
        const toScale: PositionData = {
            x: [10000, 10000, 10000],
            y: [20000, 20000, 20000],
            z: [30000, 30000, 30000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3)];

        const rescaled = rescaleData(toScale, 'Jupiter', true);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test satellites Saturn', () => {
        const toScale: PositionData = {
            x: [10000, 10000, 10000],
            y: [20000, 20000, 20000],
            z: [30000, 30000, 30000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3)];

        const rescaled = rescaleData(toScale, 'Saturn', true);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test satellites Uranus', () => {
        const toScale: PositionData = {
            x: [10000, 10000, 10000],
            y: [20000, 20000, 20000],
            z: [30000, 30000, 30000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3)];

        const rescaled = rescaleData(toScale, 'Uranus', true);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test satellites Neptune', () => {
        const toScale: PositionData = {
            x: [1000, 1000, 1000],
            y: [2000, 2000, 2000],
            z: [3000, 3000, 3000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 2, 3), new Vector3(1, 2, 3), new Vector3(1, 2, 3)];

        const rescaled = rescaleData(toScale, 'Neptune', true);

        expect(rescaled).toEqual(expectedRes);
    });

    // Planets

    it('rescale data test Earth', () => {
        const toScale: PositionData = {
            x: [25512000, 25512000, 25512000],
            y: [25512000, 25512000, 25512000],
            z: [25512000, 25512000, 25512000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 1, 1), new Vector3(1, 1, 1), new Vector3(1, 1, 1)];

        const rescaled = rescaleData(toScale, 'Earth', false);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test float numbers', () => {
        const toScale: PositionData = {
            x: [2551200, 2551200, 2551200],
            y: [2551200, 2551200, 2551200],
            z: [2551200, 2551200, 2551200],
        };

        const expectedRes: Vector3[] = [
            new Vector3(0.1, 0.1, 0.1),
            new Vector3(0.1, 0.1, 0.1),
            new Vector3(0.1, 0.1, 0.1),
        ];

        const rescaled = rescaleData(toScale, 'Earth', false);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test Jupiter', () => {
        const toScale: PositionData = {
            x: [25512000, 25512000, 25512000],
            y: [25512000, 25512000, 25512000],
            z: [25512000, 25512000, 25512000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 1, 1), new Vector3(1, 1, 1), new Vector3(1, 1, 1)];

        const rescaled = rescaleData(toScale, 'Jupiter', false);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test Saturn', () => {
        const toScale: PositionData = {
            x: [25512000, 25512000, 25512000],
            y: [25512000, 25512000, 25512000],
            z: [25512000, 25512000, 25512000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 1, 1), new Vector3(1, 1, 1), new Vector3(1, 1, 1)];

        const rescaled = rescaleData(toScale, 'Jupiter', false);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test Uranus', () => {
        const toScale: PositionData = {
            x: [25512000, 25512000, 25512000],
            y: [25512000, 25512000, 25512000],
            z: [25512000, 25512000, 25512000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 1, 1), new Vector3(1, 1, 1), new Vector3(1, 1, 1)];

        const rescaled = rescaleData(toScale, 'Uranus', false);

        expect(rescaled).toEqual(expectedRes);
    });

    it('rescale data test Neptune', () => {
        const toScale: PositionData = {
            x: [25512000, 25512000, 25512000],
            y: [25512000, 25512000, 25512000],
            z: [25512000, 25512000, 25512000],
        };

        const expectedRes: Vector3[] = [new Vector3(1, 1, 1), new Vector3(1, 1, 1), new Vector3(1, 1, 1)];

        const rescaled = rescaleData(toScale, 'Neputne', false);

        expect(rescaled).toEqual(expectedRes);
    });
});
