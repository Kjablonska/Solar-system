import { SpeedModes } from '../speedModes';
import { DatesPeriod, FetchData } from '../types/period';

export default function findFetchPeriod() {
    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const findNewEnd = (currentEnd: string, fetchStep: number): string => {
        const newEnd = new Date(currentEnd);
        newEnd.setDate(newEnd.getDate() + fetchStep);
        return formatDate(newEnd);
    };

    const findNewPeriod = (currentPeriod: DatesPeriod, fetchStep: number): DatesPeriod => {
        const newStart = currentPeriod.end;
        const newEnd = findNewEnd(newStart, fetchStep);
        console.log("new fetch", newStart, newEnd);
        return { start: newStart, end: newEnd };
    };

    const defineStartingPeriod = (fetchStep: number, startDate?: string) => {
        const start = startDate ? startDate : formatDate(new Date());
        const end = findNewEnd(start, fetchStep);
        console.log("define staring period", fetchStep, startDate, end);
        return { start, end };
    };

    const findFetchParameters = (speedMode: SpeedModes): FetchData => {
        console.log("SPEED MODE", speedMode);
        switch (speedMode) {
            case SpeedModes.RealTime:
                return {step: '1h', period: 2, refill: 60 * 58, timerSpeed: 1000};
            case SpeedModes.Medium:
                return {step: '24h', period: 120, refill: 100, timerSpeed: 10}; // 1s == 24h
            case SpeedModes.Fast:
                return {step: '48h', period: 300, refill: 10, timerSpeed: 10};
            case SpeedModes.Satellite:
                return {step: '1h', period: 10, refill: 600 * 58, timerSpeed: 100};
                // return {step: '10m', period: 60, refill: 100, timerSpeed: 10};
                // return {step: '1m', period: 20, refill: 0, timerSpeed: 10};
            default:    // default is real-time mode.
                return {step: '1h', period: 2, refill: 60 * 58, timerSpeed: 1000};
        }
    }

    return { findNewPeriod, defineStartingPeriod, formatDate, findFetchParameters } as const;
}


export const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const findNewEnd = (currentEnd: string, period: number): string => {
    const newEnd = new Date(currentEnd);
    newEnd.setDate(newEnd.getDate() + period);
    return formatDate(newEnd);
};

export const findNewPeriod = (currentPeriod: DatesPeriod, period: number): DatesPeriod => {
    const newStart = currentPeriod.end;
    const newEnd = findNewEnd(newStart, period);
    console.log(currentPeriod, newStart, newEnd);
    return { start: newStart, end: newEnd };
};

export const defineStartingPeriod = (period: number, startDate?: string, endDate?: string) => {
    const start = startDate ? startDate : formatDate(new Date());
    const end = endDate ? endDate : findNewEnd(formatDate(new Date()), period);
    return { start, end };
};