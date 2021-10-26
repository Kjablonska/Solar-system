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
    Texture
} from '@babylonjs/core';
import { PlanetData, VisualisationData } from '../../types/planetInterfaces';

// linear scale
// ["Mercury", 0.382486673],
// ["Venus", 0.948886798],
// ["Earth", 1],
// ["Mars", 0.532455315],
// ['Jupiter', 11.20915648],
// ['Saturn', 9.449357165],
// ['Uranus', 4.007369081],
// ['Neptun', 3.882721856],
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
    ['Luna', 0.435240298]
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
        this.addPlanets(planetsData, scene);
        console.log("SCENE DATA CLASS", refill, this.fill)
    }

    attacheLight = (scene: Scene) => {
        this.light = new PointLight('light', new Vector3(0, 0, 0), scene);
        this.light.intensity = 2;

        this.sun = MeshBuilder.CreateSphere('sun', { diameter: diameterMap.get('Sun') }, scene);
        // this.sun = MeshBuilder.CreateSphere('sun', { diameter:0.2  }, scene);
        this.sun.position.copyFrom(this.light.position);
        const material = new StandardMaterial('mat', scene);
        material.diffuseTexture = new Texture(`http://localhost:5000/assets/planets/Sun`, scene);
        material.emissiveColor = this.light.diffuse;
        this.sun.material = material;
    };

    attacheCamera = (scene: Scene) => {
        this.camera = new ArcRotateCamera('camera1', 0, 0, 0, new Vector3(0, 0, 0), scene);
        // this.camera.fov = 1000;
        this.camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();
        this.camera.attachControl(canvas, true);
        this.camera.lowerBetaLimit = -Infinity;
        this.camera.upperBetaLimit = Infinity;
    };

    addPlanets = (planetsData: PlanetData[], scene: Scene) => {
        if (planetsData === undefined) return;

        for (const el of planetsData) {
            const planetName = el.planet;

            // TODO: draw oribtes.
            console.log("fillito", this.fill);

            // TODO: Fix fill parameter żelcia żelcia
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, this.fill, false);
            // const p = planetCurve.getPoints();
            // Mesh.CreateLines(`${planetName} orbite`, p, scene);

            const planet = MeshBuilder.CreateSphere(planetName, { diameter: diameterMap.get(planetName) }, scene);
            var material = new StandardMaterial(planetName, scene);
            material.diffuseTexture = new Texture(`http://localhost:5000/assets/planets/${planetName}`, scene);

            // TODO: rotate images and delete u v scale.
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

        this.generateSkyBox(scene);
    };

    generateSkyBox = (scene: Scene) => {
        const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
        const skyboxMaterial = new StandardMaterial('skyBox', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture('http://localhost:5000/assets/stars', scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        console.log("skybox");
    }

    generateVisualisationData = (planetsData: PlanetData[]) => {
        for (const el of planetsData) {
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, this.fill, false);
            const newPlanetData: VisualisationData = {
                planet:
                    this.meshes.get(el.planet) ||
                    MeshBuilder.CreateSphere(el.planet, { diameter: diameterMap.get(el.planet) }, this.scene),
                orbit: planetCurve.getPoints(),
                iter: 0,
                length: planetCurve.getPoints().length,
            };
            this.visualisationData.push(newPlanetData);
        }
    };

    public updateScene = (planetsData: PlanetData[]) => {
        this.visualisationData = [];
        this.generateVisualisationData(planetsData);
        // this.addPlantes(planetsData, this.scene)
    };
}
