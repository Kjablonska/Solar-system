import { SpeedModes } from "../speedModes";

interface UserOptions {
    mode: SpeedModes;
    startDate: string;
    endDate?: string;
}

export default UserOptions;