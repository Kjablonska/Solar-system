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
    objects: FetchObjects;
}

export interface FetchObjects {
    planets: string[];
    satellites?: boolean;
}

export interface FetchData {
    step: string;
    period: number;
    refill: number;
    timerSpeed: number;
}