import { Scene } from "@babylonjs/core";

export const saveScene = (scene: Scene) => {
  console.log("save scene", scene);
  return {
    type: "SAVE_SCENE",
    payload: { scene: scene },
  };
};
