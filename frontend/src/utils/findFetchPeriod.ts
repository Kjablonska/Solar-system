import DatesPeriod from '../types/period';
const FETCH_PERIOD = 10; // days

export default function findFetchPeriod() {
    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const findNewEnd = (currentEnd: string): string => {
        const newEnd = new Date(currentEnd);
        newEnd.setDate(newEnd.getDate() + FETCH_PERIOD);
        return formatDate(newEnd);
    };

    const findNewPeriod = (currentPeriod: DatesPeriod): DatesPeriod => {
        const newStart = currentPeriod.end;
        const newEnd = findNewEnd(newStart);
        return { start: newStart, end: newEnd };
    };

    const defineStartingPeriod = (startDate?: string, endDate?: string) => {
        const start = startDate ? startDate : formatDate(new Date());
        const end = endDate ? endDate : findNewEnd(formatDate(new Date()));
        return { start, end };
    };

    return { findNewPeriod, defineStartingPeriod, formatDate } as const;
}
