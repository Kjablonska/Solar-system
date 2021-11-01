import {
    ArcRotateCamera,
    Vector3,
    Scene,
    PointLight
} from '@babylonjs/core';

// TODO: make a class from it.
export const attacheCamera = (scene: Scene) => {
    const camera = new ArcRotateCamera('camera1', -Math.PI/2, Math.PI/4, 3, new Vector3(0, 0, 0), scene);
    // camera.fov = 1000;
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    camera.lowerBetaLimit = -Infinity;
    camera.upperBetaLimit = Infinity;
};

export const createLight = (scene: Scene) => {
    return new PointLight("light", new Vector3(0, 1, 0), scene);
}