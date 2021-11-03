import { Vector3, Scene } from '@babylonjs/core';
import { Side } from './const';
import Surface from './Surface';

export class Planet {
    position: Vector3 = new Vector3(0, 0, 0);
    radius: number = 20;
    sphere: Surface[] = [];
    scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.createSides();
    }

    createSides() {
        const sides: Side[] = [
            { name: 'Front', direction: new Vector3(0, 0, -1.0), rotateX: -Math.PI / 2, rotateY: 0 },
            { name: 'Back', direction: new Vector3(0, 0, 1.0), rotateX: -Math.PI / 2, rotateY: Math.PI },
            { name: 'Up', direction: new Vector3(0, 1.0, 0), rotateX: 0, rotateY: 0 },
            { name: 'Down', direction: new Vector3(0, -1.0, 0), rotateX: -Math.PI, rotateY: 0 },
            { name: 'Right', direction: new Vector3(1.0, 0, 0), rotateX: -Math.PI / 2, rotateY: 1.5 * Math.PI },
            { name: 'Left', direction: new Vector3(-1.0, 0, 0), rotateX: -Math.PI / 2, rotateY: Math.PI / 2 },
        ];

        sides.forEach((side: Side) => {
            const surface = new Surface(side, this.scene, this.radius);
            this.sphere.push(surface);
        });
    }
}

export default Planet;
