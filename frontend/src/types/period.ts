import { SpeedModes } from "../speedModes";

export interface DatesPeriod {
    start: string;
    end: string;
}

export interface VisualisationOptions {
    start: string;
    end?: string;
    currentEnd: string;
    mode: SpeedModes;
}

// step: '10m', period: '2d', refill: 10 * 58, timerSpeed: 1000
export interface FetchData {
    step: string;
    period: number;
    refill: number;
    timerSpeed: number;
}