import { ArcRotateCamera, Vector3, Curve3, PointLight, StandardMaterial, Scene, MeshBuilder, Mesh } from "@babylonjs/core";
import { PlanetData } from "../../utils/planetInterfaces"
import SceneComponent from "./SceneComponent.jsx";

interface SceneProps {
    planetsData: PlanetData[]
}

interface VisualisationData {
    planet: Mesh,
    orbit: Vector3[],
    iter: number,
}

export const CreateScene: React.FC<SceneProps> = ({planetsData}):any => {
    console.log("create scene", planetsData)
    const visualisationData: VisualisationData[] = [];

    const attacheCamera = (scene: Scene) => {
        var camera = new ArcRotateCamera("camera1",  0, 0, 0, new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();   
        camera.attachControl(canvas, true);
    }
    
    const attacheLight = (scene: Scene) => {
        var light = new PointLight("light", new Vector3(0, 0, 0), scene);
        light.intensity = 2;
    
        const sun = MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene)
        sun.position.copyFrom(light.position)
        const material = new StandardMaterial("mat", scene)
        material.emissiveColor = light.diffuse;
        sun.material = material;
    }
    
    const onSceneReady = (scene: Scene) => {
        attacheCamera(scene);
        attacheLight(scene);
        addPlantes(scene);
    };

    const addPlantes = (scene: Scene) => {
        if (planetsData === undefined) {
            return;
        }

        console.log("add planets", planetsData)
        for (const el of planetsData) {
            const position = el.position;
            const planetName = el.planet;

            const points = []
            for (let i = 0; i < position.x.length; i++) {
                points.push(new Vector3(position.x[i]/10000000, position.y[i]/10000000, position.z[i]/10000000))
            }
            
            // Draw orbits and planets
            const planetCurve = Curve3.CreateCatmullRomSpline(points, 20, false);
            Mesh.CreateLines(planetName, planetCurve.getPoints(), scene);

            const planet = MeshBuilder.CreateSphere(planetName, {diameter: 4}, scene);
            planet.position.x = points[0].x;
            planet.position.y = points[0].y;
            planet.position.y = points[0].z;

            const newPlanetData:VisualisationData = {planet: planet, orbit: planetCurve.getPoints(), iter: 0}
            visualisationData.push(newPlanetData)
            console.log(visualisationData)
        }

    }
    
    const onRender = (scene:any) => {
        if (visualisationData !== undefined && visualisationData.length === planetsData.length) {
        //   var deltaTimeInMillis = scene.getEngine().getDeltaTime();
        //   const rpm = 10;
        //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
            for (const data of visualisationData) {
                data.planet.position.x = data.orbit[data.iter].x;
                data.planet.position.y = data.orbit[data.iter].y;
                data.planet.position.z = data.orbit[data.iter].z;
                
                data.iter++;
                if (data.iter > data.orbit.length - 1)
                    data.iter = data.orbit.length - 1
            }
        }
    };

    return (
        <div id="my-canvas">
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </div>
    )
}
