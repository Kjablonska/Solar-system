import { SpeedModes } from "../speedModes";

interface UserOptions {
    mode: SpeedModes;
    startDate: string;
    planet?: string;
    endDate?: string;
}

export default UserOptions;