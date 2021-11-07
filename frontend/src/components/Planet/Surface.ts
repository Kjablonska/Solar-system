import { Material, MeshBuilder, Scene, Mesh, Vector3, Space, VertexBuffer, StandardMaterial, Texture, Nullable } from '@babylonjs/core';
import { Side } from './const';

const DEFAULT_SUBDIVISIONS = 60;

class Surface {
    private radius: number = 400;
    ground: Mesh;
    scene: Scene;
    private roundConst: Vector3;
    pixels: any;
    width: number;
    height: number;
    size: number;

    constructor(side: Side, scene: Scene, radius: number) {
        this.scene = scene;
        this.radius = radius;
        this.size = ((1.0 / Math.sqrt(3)) * this.radius) / 20;
        this.roundConst = new Vector3(0, 1.0, 0).scale(this.size / 2);

        this.ground = MeshBuilder.CreateGround(
            side.name,
            { width: this.size, height: this.size, subdivisions: DEFAULT_SUBDIVISIONS, updatable: true },
            scene,
        );

        var materialCol = new StandardMaterial("mat", scene);
        let textureCol = new Texture(`http://localhost:5000/assets/planets/Earth_old`, scene);
        // materialCol.diffuseTexture = textureCol;
        // this.ground.material = materialCol;
        // this.ground.material.wireframe = true;

        const texture = new Texture(`http://localhost:5000/assets/planets/Earth`, scene);

        materialCol.diffuseTexture = texture;
        this.ground.material = materialCol;
        if (texture) {
            (<Texture>texture).onLoadObservable.add( () => {
                this.pixels = texture.readPixels();
                this.width = texture.getBaseSize().width;
                this.height = texture.getBaseSize().height;
                this.mapToSphere();
                this.normalize();

                this.ground.position = new Vector3(0, 0, 0).add(side.direction.scale(this.radius / 200000));
                this.ground.rotate(new Vector3(1, 0, 0), side.rotateX, Space.WORLD);
                this.ground.rotate(new Vector3(0, 1, 0), side.rotateY, Space.WORLD)
            })
        };
    }


    mapToSphere() {
        let vertices = this.ground.getVerticesData(VertexBuffer.PositionKind)
        let uv = this.ground.getVerticesData(VertexBuffer.UVKind);
        if (!vertices || !this.pixels || !uv) return;

        for (let i = 0; i < vertices.length / 3; i++) {
            const u = uv![i*2];
            const v = uv![i*2 + 1];
            const height = this.pixels[Math.floor(Math.floor(u*this.width + v*this.width*this.height))*4]/4000
            console.log(height);
            const currVertex = new Vector3(vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]).add(
                this.roundConst,
            );
            const rescaledVertex = currVertex.scale(this.radius / currVertex.length()).add(this.roundConst.negate());

            let heightVector = rescaledVertex.add(rescaledVertex.normalize().scale(height))

            vertices[i * 3] = heightVector._x;
            vertices[i * 3 + 1] = heightVector._y
            vertices[i * 3 + 2] = heightVector._z
        }

        this.ground.updateVerticesData(VertexBuffer.PositionKind, vertices);
        this.ground.refreshBoundingInfo(true)
        this.ground.createNormals(false)
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
    }

    async testTriangles(texture: Texture) {
        let uv = this.ground.getVerticesData(VertexBuffer.UVKind);
        let vertices = this.ground.getVerticesData(VertexBuffer.PositionKind);
        if (!vertices || !this.pixels ||!uv) return;
        for (let i = 0; i < vertices.length / 3; i++) {
            const u = uv![i*2];
            const v = uv![i*2 + 1];
            const currVertex = new Vector3(vertices[i * 3], vertices[i * 3 + 1], vertices[i*3 + 2])
            vertices[i*3+1] += this.pixels[Math.floor(Math.floor(u*this.width + v*this.width*this.height))*4]/500;
        }
        this.ground.updateVerticesData(VertexBuffer.PositionKind, vertices);
    }
}

export default Surface;
