import {
    ArcRotateCamera,
    Vector3,
    Curve3,
    PointLight,
    StandardMaterial,
    Scene,
    MeshBuilder,
    Mesh,
} from '@babylonjs/core';
import { PlanetData, VisualisationData } from "../../types/planetInterfaces";

export class SceneData {
    private camera: ArcRotateCamera;
    private light: PointLight;
    private sun: Mesh;
    private meshes: Map<string, Mesh> = new Map();
    public visualisationData: VisualisationData[] = [];
    private scene: Scene;

    constructor(planetsData: PlanetData[], scene: Scene) {
        this.scene = scene;
        this.attacheCamera(scene);
        this.attacheLight(scene);
        this.addPlanets(planetsData, scene);
    }

    attacheLight = (scene: Scene) => {
        this.light = new PointLight('light', new Vector3(0, 0, 0), scene);
        this.light.intensity = 2;

        this.sun = MeshBuilder.CreateSphere('sphere', { diameter: 5 }, scene);
        this.sun.position.copyFrom(this.light.position);
        const material = new StandardMaterial('mat', scene);
        material.emissiveColor = this.light.diffuse;
        this.sun.material = material;
    }

    attacheCamera = (scene: Scene) => {
        this.camera = new ArcRotateCamera('camera1', 0, 0, 0, new Vector3(0, 0, 0), scene);
        this.camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();
        this.camera.attachControl(canvas, true);
        this.camera.lowerBetaLimit = -Infinity;
        this.camera.upperBetaLimit = Infinity;
    }

    addPlanets = (planetsData: PlanetData[], scene: Scene) => {
        if (planetsData === undefined) return;

        for (const el of planetsData) {
            const planetName = el.planet;

            // Data is fetched in the period of one minute. Fill each two points with 58 points to make the period of 1second.
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, 58, false);

            Mesh.CreateLines(`${planetName} orbite`, planetCurve.getPoints(), scene);
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: 0.5 }, scene);

            this.meshes.set(planetName, planet);
            const newPlanetData: VisualisationData = { planet: planet, orbit: planetCurve.getPoints(), iter: 0, length: planetCurve.getPoints().length };
            this.visualisationData.push(newPlanetData);
        }
    };

    generateVisualisationData = (planetsData: PlanetData[]) => {
        for (const el of planetsData) {
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, 58, false);
            const newPlanetData: VisualisationData = { planet: this.meshes.get(el.planet) || MeshBuilder.CreateSphere(el.planet, { diameter: 0.5 }, this.scene), orbit: planetCurve.getPoints(), iter: 0, length: planetCurve.getPoints().length };
            this.visualisationData.push(newPlanetData);
        }
    }

    public updateScene = (planetsData: PlanetData[]) => {
        this.visualisationData = [];
        this.generateVisualisationData(planetsData);
        // this.addPlantes(planetsData, this.scene)
    }
}