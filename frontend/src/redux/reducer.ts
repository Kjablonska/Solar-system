import UserOptions from '../types/userOptions';
import findFetchPeriod from '../utils/findFetchPeriod';

const { formatDate } = findFetchPeriod();
interface UserOptionsReducer {
    userOptions: UserOptions,
}

export const userOptionsReducer = (
    state: UserOptionsReducer = {
        userOptions: {
            isRealTime: true,
            startDate: formatDate(new Date()),
            endDate: undefined,
            delay: 1000,
        },
    },
    action: any,
) => {
    switch (action.type) {
        case 'SELECT_OPTIONS':
            console.log('options', action.payload.options);
            return {
                ...state,
                userOptions: action.payload.options,
            };
        default:
            return state;
    }
};
