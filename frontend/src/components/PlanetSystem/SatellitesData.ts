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
    ['Io', 0.8],
    ['Eurpoa', 0.6],
    ['Ganymede', 1.1],
    ['Callisto', 1],
    ['Mimas', 0.1],
    ['Enceladus', 0.13],
    ['Tethys', 0.2],
    ['Dione', 0.3],
    ['Rhea', 0.4],
    ['Titan', 1.3],
    ['Hyperion', 0.06],
    ['Iapetus', 0.3],
    ['Ariel', 0.7],
    ['Umbriel', 0.7],
    ['Titania', 0.9],
    ['Oberon', 0.9],
    ['Miranda', 0.2],
    ['Triton', 1.7],
    ['Nereid', 0.2],
    ['Naiad', 0.04],
    ['Thalassa', 0.05],
    ['Despina', 0.1],
    ['Galatea', 0.1],
    ['Larissa', 0.1],
    ['Proteus', 0.3],
]);

const gasPlanets = ['Jupiter', 'Saturn', 'Neptune', 'Uranus'];

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
        const heightMap = `./assets/heightmaps/${this.planet}.jpg`;

        const isGasPlanet = gasPlanets.includes(this.planet);

        const basePlanet = isGasPlanet
            ? MeshBuilder.CreateSphere(this.planet, { diameter: 30, updatable: true }, this.scene)
            : MeshBuilder.CreateSphere(this.planet, { segments: 256, diameter: 30, updatable: true }, this.scene);

        const material = new StandardMaterial(this.planet, this.scene);
        material.diffuseTexture = new Texture(`../assets/planets/${this.planet}.jpg`, this.scene);
        if (!isGasPlanet) {
            const planet = MeshBuilder.CreateSphere(
                `${this.planet}0`,
                { segments: 30, diameter: 30, updatable: true },
                this.scene,
            );

            const planet1 = MeshBuilder.CreateSphere(
                `${this.planet}1`,
                { segments: 100, diameter: 30, updatable: true },
                this.scene,
            );

            const planet2 = MeshBuilder.CreateSphere(
                `${this.planet}2`,
                { segments: 160, diameter: 30, updatable: true },
                this.scene,
            );

            basePlanet.addLODLevel(50, planet2);
            basePlanet.addLODLevel(80, planet1);
            basePlanet.addLODLevel(100, planet);

            planet.applyDisplacementMap(heightMap, 0, 0.3);
            planet1.applyDisplacementMap(heightMap, 0, 0.6);
            planet2.applyDisplacementMap(heightMap, 0, 0.8);
            (material.diffuseTexture as Texture).vScale = -1;
            planet.material = material;
            planet1.material = material;
            planet2.material = material;

            basePlanet.applyDisplacementMap(heightMap, 0, 1);
        }

        basePlanet.material = material;

        this.planetMesh = basePlanet;
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
            material.diffuseTexture = new Texture(`./assets/satellites/${planetName}.jpg`, this.scene);

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
        skyboxMaterial.reflectionTexture = new CubeTexture('./assets/skybox/stars', this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    };
}
