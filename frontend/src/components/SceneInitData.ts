import {
    ArcRotateCamera,
    Vector3,
    Scene,
    PointLight
} from '@babylonjs/core';

// TODO: make a class from it.
export const attacheCamera = (scene: Scene) => {
    // const camera = new ArcRotateCamera('camera1', -Math.PI/2, Math.PI/4, 3, new Vector3(0, 0, 0), scene);
    const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 100, Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.wheelPrecision = 60;
    camera.lowerRadiusLimit = 0.1;
    camera.minZ = 0.1;
    camera.attachControl(canvas, true);

};

export const createLight = (scene: Scene) => {
    return new PointLight("light", new Vector3(0, 1, 0), scene);
}