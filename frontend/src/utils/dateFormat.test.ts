import { defineStartingPeriod, findNewPeriod, formatTime } from './findFetchPeriod';

describe('date formatting tests', () => {
    it('format time test', () => {
        const date = new Date(2021, 1, 1, 5, 30, 10);
        const formatted = formatTime(date);
        expect(formatted).toStrictEqual({ hours: 5, minutes: 30 });
    });

    it('test starting period Real Time mode', () => {
        const period = defineStartingPeriod(1, '2021-01-01');
        expect(period).toStrictEqual({ start: '2021-01-01', end: '2021-1-2' });
    });

    it('test starting period Medium mode', () => {
        const period = defineStartingPeriod(120, '2021-01-01');
        expect(period).toStrictEqual({ start: '2021-01-01', end: '2021-5-1' });
    });

    it('test starting period Fast mode', () => {
        const period = defineStartingPeriod(300, '2021-01-01');
        expect(period).toStrictEqual({ start: '2021-01-01', end: '2021-10-28' });
    });

    it('find new period Real Time mode', () => {
        const newPeriod = findNewPeriod({start: '2021-01-01', end: '2021-01-02'}, 1);
        expect(newPeriod).toStrictEqual({start: '2021-01-02', end: '2021-1-3'})
    });

    it('find new period Medium mode', () => {
        const newPeriod = findNewPeriod({start: '2021-01-01', end: '2021-01-02'}, 120);
        expect(newPeriod).toStrictEqual({start: '2021-01-02', end: '2021-5-2'})
    });

    it('find new period Fast mode', () => {
        const newPeriod = findNewPeriod({start: '2021-01-01', end: '2021-01-02'}, 300);
        expect(newPeriod).toStrictEqual({start: '2021-01-02', end: '2021-10-29'})
    });
});
