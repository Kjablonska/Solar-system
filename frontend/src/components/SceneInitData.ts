import {
    ArcRotateCamera,
    Vector3,
    Scene,
    PointLight
} from '@babylonjs/core';

export const attacheCamera = (scene: Scene) => {
    const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 120, Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.wheelPrecision = 40;
    camera.lowerRadiusLimit = 0.1;
    camera.minZ = 0.1;
    camera.attachControl(canvas, true);

};

export const createLight = (scene: Scene) => {
    return new PointLight("light", new Vector3(0, 1, 0), scene);
}
