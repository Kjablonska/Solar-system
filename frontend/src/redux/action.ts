import UserOptions from "../types/userOptions";

export const setUserSelection = (options: UserOptions) => {
  return {
    type: "SELECT_OPTIONS",
    payload: { options },
  };
};
