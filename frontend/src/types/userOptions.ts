import { SpeedModes } from "../speedModes";

interface UserOptions {
    isRealTime: boolean;
    mode: SpeedModes;
    startDate: string;
    endDate?: string;
}

export default UserOptions;