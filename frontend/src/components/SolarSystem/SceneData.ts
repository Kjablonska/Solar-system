import {
    ArcRotateCamera,
    Vector3,
    Curve3,
    PointLight,
    StandardMaterial,
    Color3,
    Scene,
    MeshBuilder,
    Mesh,
    CubeTexture,
    Texture,
} from '@babylonjs/core';

import { PlanetData, VisualisationData } from '../../types/planetInterfaces';

const diameterMap = new Map<string, number>([
    ['Sun', 3.037737488],
    ['Mercury', 0.582616308],
    ['Venus', 0.977214404],
    ['Earth', 1],
    ['Mars', 0.726283167],
    ['Jupiter', 2.049572932],
    ['Saturn', 1.975402265],
    ['Uranus', 1.602859343],
    ['Neptune', 1.58913628],
    ['Luna', 0.435240298],
]);

export class SceneData {
    private camera: ArcRotateCamera;
    private light: PointLight;
    private sun: Mesh;
    private meshes: Map<string, Mesh> = new Map();
    public visualisationData: VisualisationData[] = [];
    private scene: Scene;
    private fill: number;

    constructor(planetsData: PlanetData[], scene: Scene, refill: number) {
        this.scene = scene;
        this.attacheCamera(scene);
        this.attacheLight(scene);
        this.fill = refill;
        this.addPlanets(planetsData);
    }

    attacheLight = (scene: Scene) => {
        this.light = new PointLight('light', new Vector3(0, 0, 0), scene);
        this.light.intensity = 2;

        this.sun = MeshBuilder.CreateSphere('sun', { diameter: diameterMap.get('Sun') }, scene);
        this.sun.position.copyFrom(this.light.position);
        const material = new StandardMaterial('sunMaterial', scene);
        material.diffuseTexture = new Texture(`./assets/planets/Sun`, scene);
        material.emissiveColor = this.light.diffuse;
        this.sun.material = material;
    };

    attacheCamera = (scene: Scene) => {
        this.camera = new ArcRotateCamera('camera1', 0, 0, 0, new Vector3(0, 0, 0), scene);
        this.camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();
        this.camera.attachControl(canvas, true);
        this.camera.lowerBetaLimit = -Infinity;
        this.camera.upperBetaLimit = Infinity;
    };

    addPlanets = (planetsData: PlanetData[]) => {
        if (planetsData === undefined) return;

        for (const el of planetsData) {
            const planetName = el.planet;
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, this.fill, false);
            let diameter = diameterMap.get(planetName);
            console.log(planetName, diameter)
            if (diameter === undefined)
                diameter = 1;
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: diameter }, this.scene);
            var material = new StandardMaterial(planetName, this.scene);
            material.diffuseTexture = new Texture(`./assets/planets/${planetName}`, this.scene);

            (material.diffuseTexture as Texture).vScale = -1;
            (material.diffuseTexture as Texture).uScale = -1;
            planet.material = material;

            this.meshes.set(planetName, planet);
            const newPlanetData: VisualisationData = {
                planet: planet,
                orbit: planetCurve.getPoints(),
                iter: 0,
                length: planetCurve.getPoints().length,
            };
            this.visualisationData.push(newPlanetData);
        }

        this.generateSkyBox();
    };

    generateSkyBox = () => {
        const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000.0 });
        const skyboxMaterial = new StandardMaterial('skyBox', this.scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture('./assets/skybox/stars', this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    };

}
