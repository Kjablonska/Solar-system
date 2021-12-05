import { defineStartingPeriod, findFetchParameters, findNewPeriod, formatTime } from './findFetchPeriod';

describe('date formatting tests', () => {
    it('format time test', () => {
        const date = new Date(2021, 1, 1, 5, 30, 10);
        const formatted = formatTime(date);
        expect(formatted).toStrictEqual({ hours: 5, minutes: 30 });
    });

    it('format time test', () => {
        const date = new Date(2021, 1, 1, 5, 30, 10);
        const formatted = formatTime(date);
        expect(formatted).not.toEqual({ hours: 30, minutes: 10 });
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
        const newPeriod = findNewPeriod({ start: '2021-01-01', end: '2021-01-02' }, 1);
        expect(newPeriod).toStrictEqual({ start: '2021-01-02', end: '2021-1-3' });
    });

    it('find new period Real Time mode iter', () => {
        const newPeriod1 = findNewPeriod({ start: '2021-01-01', end: '2021-01-02' }, 1);
        const newPeriod2 = findNewPeriod({ start: newPeriod1.start, end: newPeriod1.end }, 1);
        const newPeriod3 = findNewPeriod({ start: newPeriod2.start, end: newPeriod2.end }, 1);
        expect(newPeriod3).toStrictEqual({ start: '2021-1-4', end: '2021-1-5' });
    });

    it('find new period Medium mode', () => {
        const newPeriod = findNewPeriod({ start: '2021-01-01', end: '2021-01-02' }, 120);
        expect(newPeriod).toStrictEqual({ start: '2021-01-02', end: '2021-5-2' });
    });

    it('find new period Medium mode iter', () => {
        const newPeriod1 = findNewPeriod({ start: '2021-01-01', end: '2021-01-02' }, 120);
        const newPeriod2 = findNewPeriod({ start: newPeriod1.start, end: newPeriod1.end }, 120);
        const newPeriod3 = findNewPeriod({ start: newPeriod2.start, end: newPeriod2.end }, 120);
        expect(newPeriod3).toStrictEqual({ start: '2021-8-30', end: '2021-12-28' });
    });

    it('find new period Fast mode', () => {
        const newPeriod = findNewPeriod({ start: '2021-01-01', end: '2021-01-02' }, 300);
        expect(newPeriod).toStrictEqual({ start: '2021-01-02', end: '2021-10-29' });
    });

    it('find new period Fast mode iter', () => {
        const newPeriod1 = findNewPeriod({ start: '2021-01-01', end: '2021-01-02' }, 300);
        const newPeriod2 = findNewPeriod({ start: newPeriod1.start, end: newPeriod1.end }, 300);
        const newPeriod3 = findNewPeriod({ start: newPeriod2.start, end: newPeriod2.end }, 300);
        expect(newPeriod3).toStrictEqual({ start: '2022-8-25', end: '2023-6-21' });
    });

    it('find fetch prameters Real Time mode', () => {
        const params = findFetchParameters('RealTime');
        expect(params).toEqual({step: '1h', period: 1, refill: 3540, timerSpeed: 1000})
    })

    it('find fetch prameters Medium mode', () => {
        const params = findFetchParameters('Medium');
        expect(params).toEqual({step: '24h', period: 120, refill: 100, timerSpeed: 10})
    })

    it('find fetch prameters Fast mode', () => {
        const params = findFetchParameters('Fast');
        expect(params).toEqual({step: '48h', period: 300, refill: 10, timerSpeed: 10})
    })

    it('find fetch prameters Satellite mode', () => {
        const params = findFetchParameters('Satellite');
        expect(params).toEqual({step: '1h', period: 1, refill: 3540, timerSpeed: 1000})
    })

    it('find fetch prameters Satellite mode', () => {
        const params = findFetchParameters('Satellite');
        expect(params).not.toEqual({step: '24h', period: 120, refill: 100, timerSpeed: 10})
    })
});
