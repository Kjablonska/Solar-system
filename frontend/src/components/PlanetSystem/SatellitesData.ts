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
} from '@babylonjs/core';
import { PlanetData, VisualisationData } from '../../types/planetInterfaces';
import { attacheCamera } from '../SceneInitData';


const diameterMap = new Map<string, number>([
    ['Luna', 8.2],
    ['Phobos', 0.1],
    ['Venus', 0.05],
    ['Io', 1],
    ['Eurpoa', 1],
    ['Ganymede', 1],
    ['Callisto', 1],
    ['Mimas', 1],
    ['Enceladus', 1],
    ['Tethys', 1],
    ['Dione', 1],
    ['Rhea', 1],
    ['Titan', 1],
    ['Hyperion', 1],
    ['Iapetus', 1],
    ['Ariel', 1],
    ['Umbriel', 1],
    ['Oberon', 1],
    ['Miranda', 1],
    ['Triton', 1],
    ['Nereid', 1],
    ['Naiad', 1],
    ['Thalassa', 1],
    ['Despina', 1],
    ['Galatea', 1],
    ['Larissa', 1],
    ['Proteus', 1]
]);

export class SceneData {
    private meshes: Map<string, Mesh> = new Map();
    public visualisationData: VisualisationData[] = [];
    private scene: Scene;
    private fill: number;
    private visualisationMinutes: number;
    private planet: string;
    public planetMesh: Mesh;

    constructor(planetsData: PlanetData[], scene: Scene, refill: number, planet: string, minutes: number) {
        this.scene = scene;
        attacheCamera(scene);
        new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        this.fill = refill;
        this.visualisationMinutes = minutes;
        this.planet = planet;
        this.addPlanet();

        this.addSatellites(planetsData);
        this.generateSkyBox();
    }

    addPlanet = () => {
        const heightMap = `http://localhost:5000/assets/heightmaps/${this.planet}`;
        const planet = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 30, diameter: 30, updatable: true },
            this.scene,
        );

        const planet1 = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 100, diameter: 30, updatable: true },
            this.scene,
        );

        const planet2 = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 160, diameter: 30, updatable: true },
            this.scene,
        );

        const planet3 = MeshBuilder.CreateSphere(
            this.planet,
            { segments: 256, diameter: 30, updatable: true },
            this.scene,
        );

        planet3.addLODLevel(50, planet2);
        planet3.addLODLevel(80, planet1);
        planet3.addLODLevel(100, planet);
        var material = new StandardMaterial(this.planet, this.scene);
        material.diffuseTexture = new Texture(`http://localhost:5000/assets/planets/${this.planet}`, this.scene);

        planet.applyDisplacementMap(heightMap, 0, 0.3);
        planet1.applyDisplacementMap(heightMap, 0, 0.6);
        planet2.applyDisplacementMap(heightMap, 0, 0.8);
        planet3.applyDisplacementMap(heightMap, 0, 1);
        (material.diffuseTexture as Texture).vScale = -1;
        planet.material = material;
        planet1.material = material;
        planet2.material = material;
        planet3.material = material;

        this.planetMesh = planet3;
    };

    addSatellites = (planetsData: PlanetData[]) => {
        if (planetsData === undefined || planetsData.length < 1) return;
        console.log('planets data', planetsData);
        for (const el of planetsData) {
            const planetName = el.planet;
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, this.fill, false);
            const points = planetCurve.getPoints().slice(this.visualisationMinutes * 60);

            let diameter = diameterMap.get(planetName);
            diameter = diameter !== undefined ? diameter : 5;
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: diameter }, this.scene);
            var material = new StandardMaterial(planetName, this.scene);
            material.diffuseTexture = new Texture(`http://localhost:5000/assets/satellites/${planetName}`, this.scene);

            (material.diffuseTexture as Texture).vScale = -1;
            planet.material = material;

            this.meshes.set(planetName, planet);
            const newPlanetData: VisualisationData = {
                planet: planet,
                orbit: points,
                iter: 0,
                length: points.length,
            };
            this.visualisationData.push(newPlanetData);
        }
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
