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

export interface FetchData {
    step: string;
    period: number;
    refill: number;
    timerSpeed: number;
}