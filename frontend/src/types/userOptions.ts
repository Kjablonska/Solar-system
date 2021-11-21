import { SpeedModes } from "../speedModes";

export interface TimeSelection {
    hours: number;
    minutes: number;
}

interface UserOptions {
    mode: SpeedModes;
    startDate: string;
    time?: TimeSelection;
    planet?: string;
    endDate?: string;
}

export default UserOptions;