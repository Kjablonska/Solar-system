import { ArcRotateCamera, Vector3, PointLight, StandardMaterial, Scene, MeshBuilder } from "@babylonjs/core";
import SceneComponent from "./SceneComponent.jsx";

export const CreateScene = () => {
    const attacheCamera = (scene: Scene) => {
        var camera = new ArcRotateCamera("camera1",  0, 0, 0, new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());
        const canvas = scene.getEngine().getRenderingCanvas();   
        camera.attachControl(canvas, true);
    }
    
    const attacheLight = (scene: Scene) => {
        var light = new PointLight("light", new Vector3(0, 0, 0), scene);
        light.intensity = 2;
    
        const sun = MeshBuilder.CreateSphere("sphere", { diameter: 3 }, scene)
        sun.position.copyFrom(light.position)
        const material = new StandardMaterial("mat", scene)
        material.emissiveColor = light.diffuse;
        sun.material = material;
    }
    
    const onSceneReady = (scene: Scene) => {
        attacheCamera(scene);
        attacheLight(scene);
    };
    
    const onRender = (scene:any) => {
        
        // if (box !== undefined) {
        //   var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      
        //   const rpm = 10;
        //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        // }
    };

    return (
        <div id="my-canvas">
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </div>
    )
}
