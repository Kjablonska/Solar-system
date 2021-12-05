import { DatesPeriod, FetchData } from '../types/period';
import { SpeedModes } from './speedModes';

export const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return {hours: hours, minutes: minutes}
}

export const defineStartingPeriod = (fetchStep: number, startDate?: string) => {
    const start = startDate ? startDate : formatDate(new Date());
    const end = findNewEnd(start, fetchStep);
    return { start, end };
};

export const findFetchParameters = (speedMode: SpeedModes): FetchData => {
    switch (speedMode) {
        case 'Satellite':
        case 'RealTime':
            return {step: '1h', period: 1, refill: 3540, timerSpeed: 1000};
        case 'Medium':
            return {step: '24h', period: 120, refill: 100, timerSpeed: 10};
        case 'Fast':
            return {step: '48h', period: 300, refill: 10, timerSpeed: 10};
        default:
            return {step: '1h', period: 2, refill: 60 * 58, timerSpeed: 1000};
    }
}

export const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const findNewEnd = (currentEnd: string, fetchStep: number): string => {
    const newEnd = new Date(currentEnd);
    newEnd.setDate(newEnd.getDate() + fetchStep);
    return formatDate(newEnd);
};

export const findNewPeriod = (currentPeriod: DatesPeriod, fetchStep: number): DatesPeriod => {
    const newStart = currentPeriod.end;
    const newEnd = findNewEnd(newStart, fetchStep);
    return { start: newStart, end: newEnd };
};

