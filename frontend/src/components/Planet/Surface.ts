import { Material, MeshBuilder, Scene, Mesh, Vector3, Space, VertexBuffer, StandardMaterial } from '@babylonjs/core';
import { Side } from './const';

const DEFAULT_SUBDIVISIONS = 20;

class Surface {
    private radius: number = 20;
    private material: Material;
    ground: Mesh;
    private roundConst = new Vector3(0, 1.0, 0).scale(this.radius / 2.0);

    constructor(side: Side, scene: Scene, radius: number) {
        this.ground = MeshBuilder.CreateGround(
            side.name,
            { width: radius, height: radius, subdivisions: DEFAULT_SUBDIVISIONS, updatable: true },
            scene,
        );
        this.ground.material = new StandardMaterial("mat", scene);
        this.ground.material.wireframe = true;
        this.radius = radius;
        this.ground.position = new Vector3(0, 0, 0).add(side.direction.scale(radius / 2.0));
        this.ground.rotate(new Vector3(1, 0, 0), side.rotateX, Space.WORLD);
        this.ground.rotate(new Vector3(0, 1, 0), side.rotateY, Space.WORLD);
        this.mapToSphere();
        this.normalize();
    }

    mapToSphere() {
        let vertices = this.ground.getVerticesData(VertexBuffer.PositionKind)
        if (!vertices) return;

        for (let i = 0; i < vertices.length / 3; i++) {
            const currVertex = new Vector3(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]).add(
                this.roundConst,
            );
            const rescaledVertex = currVertex.scale(this.radius / currVertex.length()).add(this.roundConst.negate());
            vertices[i * 3] = rescaledVertex._x;
            vertices[i * 3 + 1] = rescaledVertex._y;
            vertices[i * 3 + 2] = rescaledVertex._z;
        }

        this.ground.updateVerticesData(VertexBuffer.PositionKind, vertices);
        // this.ground.refreshBoundingInfo(true);
        console.log("mapped", vertices.length)
    }

    normalize() {
        let normals = this.ground.getVerticesData(VertexBuffer.NormalKind);
        let vertices = this.ground.getVerticesData(VertexBuffer.PositionKind);

        if (!vertices || !normals) return;

        for (let i = 0; i < normals.length / 3; i++) {
            const currNormal = new Vector3(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]).add(
                this.roundConst,
            );
            const rescaledNormal  = currNormal.scale(1.0 / currNormal.length());
            normals[i * 3] = rescaledNormal._x;
            normals[i * 3 + 1] = rescaledNormal._y;
            normals[i * 3 + 2] = rescaledNormal._z;
        }

        this.ground.updateVerticesData(VertexBuffer.NormalKind, vertices);
        console.log("normalized")
    }
}

export default Surface;
