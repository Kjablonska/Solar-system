import { formatDate, formatTime } from '../utils/findFetchPeriod';
import { UserOptionsReducer, userOptionsReducer } from './reducer';

describe('reducer test', () => {
    it('initial state', () => {
        expect(userOptionsReducer(undefined, {})).toStrictEqual({
            userOptions: {
                mode: 'RealTime',
                startDate: formatDate(new Date()),
                planet: undefined,
                endDate: undefined,
            },
        });
    });

    it('set planet & its satellites parameters', () => {
        const date = new Date();
        const newState: UserOptionsReducer = {
            userOptions: {
                mode: 'Fast',
                startDate: formatDate(date),
                time: undefined,
                planet: 'Earth',
                endDate: undefined,
            },
        };

        const initState: UserOptionsReducer = {
            userOptions: {
                mode: 'RealTime',
                startDate: formatDate(new Date()),
                planet: undefined,
                endDate: undefined,
            },
        };
        expect(userOptionsReducer(newState, 'SELECT_OPTIONS')).not.toEqual(initState);
    });

    it('set solar system parameters', () => {
        const newState: UserOptionsReducer = {
            userOptions: {
                mode: 'RealTime',
                startDate: '2021-02-21',
                time: undefined,
                planet: undefined,
                endDate: undefined,
            },
        };
        expect(userOptionsReducer(newState, 'SELECT_OPTIONS')).toStrictEqual(newState);
    });

    it('set planet & its satellites parameters', () => {
        const date = new Date();
        const newState: UserOptionsReducer = {
            userOptions: {
                mode: 'RealTime',
                startDate: formatDate(date),
                time: formatTime(date),
                planet: 'Earth',
                endDate: undefined,
            },
        };
        expect(userOptionsReducer(newState, 'SELECT_OPTIONS')).toStrictEqual(newState);
    });

    it('set all optional parameters', () => {
        const date = new Date('2021-01-01');
        const newState: UserOptionsReducer = {
            userOptions: {
                mode: 'RealTime',
                startDate: formatDate(date),
                time: formatTime(date),
                planet: 'Earth',
                endDate: '2021-12-31',
            },
        };
        expect(userOptionsReducer(newState, 'SELECT_OPTIONS')).toStrictEqual(newState);
    });

    it('default action test', () => {
        const date = new Date('2021-01-01');
        const newState: UserOptionsReducer = {
            userOptions: {
                mode: 'RealTime',
                startDate: formatDate(date),
                time: formatTime(date),
                planet: 'Earth',
                endDate: '2021-12-31',
            },
        };
        expect(userOptionsReducer(newState, 'ACTION')).toStrictEqual(newState);
    });
});
