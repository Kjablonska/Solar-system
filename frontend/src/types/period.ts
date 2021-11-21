import { SpeedModes } from "../speedModes";
import { TimeSelection } from "./userOptions";

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
    time?: TimeSelection;
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