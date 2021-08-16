import { ChangeEvent, useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import UserOptions from '../../types/userOptions';
import findFetchPeriod from '../../utils/findFetchPeriod';
import DatePicker from 'react-date-picker';
import { setUserSelection } from '../../redux/action';

const DataSelection = () => {
    const { formatDate } = findFetchPeriod();
    const options = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);
    console.log('data sel', options);
    const [userOptions, setUserOptions] = useState<UserOptions>({
        ...options,
    });

    const [startValue, handleStartChange] = useState(new Date());
    const [endValue, handleEndChange] = useState(new Date());
    const [speed, setSpeed] = useState<number>(1000);
    const dispatch = useDispatch();

    const handleVisualisationSpeedChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSpeed(parseInt(event.target.value));
    };

    const handleUserOptionsChange = () => {
        const newUserOptions: UserOptions = {
            isRealTime: userOptions.isRealTime,
            delay: speed,
            startDate: formatDate(startValue),
            endDate: userOptions.isRealTime ? undefined : formatDate(endValue),
        };
        setUserOptions(newUserOptions);
        dispatch(setUserSelection(userOptions));
    };

    return (
        <>
            <DatePicker onChange={handleStartChange} value={startValue} />
            <DatePicker onChange={handleEndChange} value={endValue} />
            <input type='number' min='0.5' max='10000' id='speed' onChange={handleVisualisationSpeedChange} />
            <button onClick={handleUserOptionsChange}>Save</button>
        </>
    );
};

export default DataSelection;
