import {
    StandardMaterial,
    Color3,
    Scene,
    MeshBuilder,
    CubeTexture,
    Texture,
} from '@babylonjs/core';

const SKYBOX_SIZE = 1000.0

export function generateSkyBox(scene: Scene) {
    const skybox = MeshBuilder.CreateBox('skyBox', { size: SKYBOX_SIZE }, scene);
    const skyboxMaterial = new StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture('./assets/skybox/stars', scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
};
