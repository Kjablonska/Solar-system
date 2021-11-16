import {
    Vector3,
    Curve3,
    HemisphericLight,
    StandardMaterial,
    Color3,
    Scene,
    MeshBuilder,
    Mesh,
    CubeTexture,
    Texture,
    Space,
} from '@babylonjs/core';
import { PlanetData, VisualisationData } from '../../types/planetInterfaces';
import { attacheCamera } from '../SceneInitData';

export class SceneData {
    private meshes: Map<string, Mesh> = new Map();
    public visualisationData: VisualisationData[] = [];
    private scene: Scene;
    private fill: number;
    private planet: string;

    constructor(planetsData: PlanetData[], scene: Scene, refill: number, planet: string) {
        this.scene = scene;
        attacheCamera(scene);
        new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        this.fill = refill;
        this.planet = planet;
        this.addPlanet();

        // this.scene.fogMode = Scene.FOGMODE_EXP;
        // // this.scene.fogEnd = 30;
        // this.scene.fogDensity = 0.008;
        this.addSatellites(planetsData);
    }

    addPlanet = () => {
        const heightMap = `http://localhost:5000/assets/heightmaps/${this.planet}`;
        const planet = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 30, diameter: 20, updatable: true },
            this.scene,
        );

        const planet1 = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 80, diameter: 20, updatable: true },
            this.scene,
        );

        const planet2 = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 140, diameter: 20, updatable: true },
            this.scene,
        );

        const planet3 = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 256, diameter: 20, updatable: true },
            this.scene,
        );

        planet3.addLODLevel(30, planet2)
        planet3.addLODLevel(60, planet1);
        planet3.addLODLevel(100, planet)
        var material = new StandardMaterial(this.planet, this.scene);
        material.diffuseTexture = new Texture(`http://localhost:5000/assets/planets/${this.planet}`, this.scene);
        // material.wireframe = true;
        planet.applyDisplacementMap(heightMap, 0, 0.1);
        planet1.applyDisplacementMap(heightMap, 0, 0.3);
        planet2.applyDisplacementMap(heightMap, 0, 0.4);
        planet3.applyDisplacementMap(heightMap, 0, 0.6);
        (material.diffuseTexture as Texture).vScale = -1;
        // (material.diffuseTexture as Texture).uScale = -1;
        planet.material = material;
        planet1.material = material;
        planet2.material = material;
        planet3.material = material;
    };

    addRotatation = (planet: Mesh) => {
        var earthAxis = new Vector3(Math.sin((23 * Math.PI) / 180), Math.cos((23 * Math.PI) / 180), 0);
        var axisLine = MeshBuilder.CreateLines(
            'axis',
            { points: [earthAxis.scale(-5), earthAxis.scale(5)] },
            this.scene,
        );
        var angle = 7.2921159*0.00005; // per second.
        var angle = 0.0007
        this.scene.registerBeforeRender(function () {
            planet.rotate(earthAxis, angle, Space.WORLD);
        });
    };

    addSatellites = (planetsData: PlanetData[]) => {
        if (planetsData === undefined) return;

        for (const el of planetsData) {
            const planetName = el.planet;
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: 5 }, this.scene);
            var material = new StandardMaterial(planetName, this.scene);
            material.diffuseTexture = new Texture(`http://localhost:5000/assets/satellites/${planetName}`, this.scene);

            (material.diffuseTexture as Texture).vScale = -1;
            // (material.diffuseTexture as Texture).uScale = -1;
            planet.material = material;

            this.meshes.set(planetName, planet);
            const newPlanetData: VisualisationData = {
                planet: planet,
                orbit: el.position as Vector3[],
                iter: 0,
                length: el.position.length,
            };
            this.visualisationData.push(newPlanetData);
        }

        this.generateSkyBox();
    };

    generateSkyBox = () => {
        const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, this.scene);
        const skyboxMaterial = new StandardMaterial('skyBox', this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture('http://localhost:5000/assets/stars', this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    };
}
