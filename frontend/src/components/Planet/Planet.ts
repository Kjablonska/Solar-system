import { Vector3 } from '@babylonjs/core';

export class Planet {
    position: Vector3 = new Vector3(0, 0, 0);
    radius: number = 10;
    nodes: any;

    createSides() {
        const sides = [
            ['Up', this.position.add(new Vector3(0, this.radius, 0))],
            ['Down', this.position.add(new Vector3(0, -this.radius, 0))],
            ['Front', this.position.add(new Vector3(0, 0, -this.radius))],
            ['Back', this.position.add(new Vector3(0, 0, this.radius))],
            ['Right', this.position.add(new Vector3(this.radius, 0, 0))],
            ['Left', this.position.add(new Vector3(-this.radius, 0, 0))],
        ];
        sides.forEach((side) => {
            // const node = new Node(side[0], side[1], this.radius * 2, this);
            // this.nodes.push(node);
        });
    }
}

export default Planet;
