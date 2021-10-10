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
    ["Sun", 3.037737488],
    ["Mercury", 0.582616308],
    ["Venus", 0.977214404],
    ["Earth", 1],
    ["Mars", 0.726283167],
    ['Jupiter', 2.049572932],
    ['Saturn', 1.975402265],
    ['Uranus', 1.602859343],
    ['Neptun', 1.58913628],
]);
export class SceneData {
    private camera: ArcRotateCamera;
    private light: PointLight;
    private sun: Mesh;
    private meshes: Map<string, Mesh> = new Map();
    public visualisationData: VisualisationData[] = [];
    private scene: Scene;
    private fill: number = 58;

    constructor(planetsData: PlanetData[], scene: Scene, fill: number) {
        this.scene = scene;
        this.attacheCamera(scene);
        this.attacheLight(scene);
        this.addPlanets(planetsData, scene);
        this.fill = fill;
    }

    attacheLight = (scene: Scene) => {
        this.light = new PointLight('light', new Vector3(0, 0, 0), scene);
        this.light.intensity = 2;

        this.sun = MeshBuilder.CreateSphere('sun', { diameter: diameterMap.get("Sun") }, scene);
        // this.sun = MeshBuilder.CreateSphere('sun', { diameter:0.2  }, scene);
        this.sun.position.copyFrom(this.light.position);
        const material = new StandardMaterial('mat', scene);
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
            // Data is fetched in the period of one minute. Fill each two points with 58 points to make the period of 1second.
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, this.fill, false);

            Mesh.CreateLines(`${planetName} orbite`, planetCurve.getPoints(), scene);
            const planet = MeshBuilder.CreateSphere(planetName, { diameter: diameterMap.get(planetName) }, scene);
            // const planet = MeshBuilder.CreateSphere(planetName, { diameter: 0.2 }, scene);

            var material = new StandardMaterial(planetName, scene);
            console.log(planetName)
            if (planetName === 'Mercury') material.diffuseColor = new Color3(0.05, 0.34, 0.72); // blue
            else if (planetName === 'Venus') material.diffuseColor = new Color3(0.72, 0.05, 0.69); // pink
            else if (planetName === 'Earth') material.diffuseColor = new Color3(0.18, 0.72, 0.05); // green
            else if (planetName === 'Mars') material.diffuseColor = new Color3(0.95, 0.94, 0.02); // yellow
            else if (planetName === 'Jupiter') material.diffuseColor = new Color3(0.82, 0.24, 0.24); //red
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
    };

    generateVisualisationData = (planetsData: PlanetData[]) => {
        for (const el of planetsData) {
            const planetCurve = Curve3.CreateCatmullRomSpline(el.position, this.fill, false);
            const newPlanetData: VisualisationData = {
                planet:
                    this.meshes.get(el.planet) || MeshBuilder.CreateSphere(el.planet, { diameter: diameterMap.get(el.planet) }, this.scene),
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
