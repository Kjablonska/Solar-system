import UserOptions from '../types/userOptions';
import { formatDate } from '../utils/findFetchPeriod';

export interface UserOptionsReducer {
    userOptions: UserOptions;
}

export const userOptionsReducer = (
    state: UserOptionsReducer = {
        userOptions: {
            mode: 'RealTime',
            startDate: formatDate(new Date()),
            planet: undefined,
            endDate: undefined,
        },
    },
    action: any,
) => {
    switch (action.type) {
        case 'SELECT_OPTIONS':
            return {
                ...state,
                userOptions: action.payload.options,
            };
        default:
            return state;
    }
};

