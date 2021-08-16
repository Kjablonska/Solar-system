import UserOptions from "../types/userOptions";

export const setUserSelection = (options: UserOptions) => {
  console.log("set options", options);
  return {
    type: "SELECT_OPTIONS",
    payload: { options: options },
  };
};
