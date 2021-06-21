import { Scene } from "@babylonjs/core";

export const sceneReducer = (
  state = {
    scene: Scene,
  },
  action: any
) => {
  switch (action.type) {
    case "SAVE_SCENE":
      console.log("scene", state);
      return {
        ...state,
        scene: action.payload,
      };
    default:
      return state;
  }
};
