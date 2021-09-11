import { SpeedModes } from '../speedModes';
import UserOptions from '../types/userOptions';
import findFetchPeriod from '../utils/findFetchPeriod';

const { formatDate } = findFetchPeriod();
interface UserOptionsReducer {
    userOptions: UserOptions,
}

export const userOptionsReducer = (
    state: UserOptionsReducer = {
        userOptions: {
            mode: SpeedModes.Fast,
            startDate: formatDate(new Date()),
            endDate: undefined,
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
