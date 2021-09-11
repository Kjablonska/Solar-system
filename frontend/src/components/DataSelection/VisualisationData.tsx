import { useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import UserOptions from '../../types/userOptions';
import findFetchPeriod from '../../utils/findFetchPeriod';
import DatePicker from "react-datepicker";
import { setUserSelection } from '../../redux/action';
import "react-datepicker/dist/react-datepicker.css";

const VisualisationData = () => {
    const { formatDate } = findFetchPeriod();
    const options = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);

    const [startValue, setStart] = useState<Date>(new Date());
    const [endValue, setEnd] = useState<Date>();
    const realTime = endValue === undefined;

    const dispatch = useDispatch();

    const handleUserOptionsChange = () => {
        console.log(endValue);
        const newUserOptions: UserOptions = {
            isRealTime: realTime,
            startDate: formatDate(startValue),
            endDate: realTime === false && endValue !== undefined ? formatDate(endValue) : undefined,
        };
        dispatch(setUserSelection(newUserOptions));
    };

    return (
        <div style={{position: 'absolute', top: '2%'}}>
            <DatePicker selected={startValue} onChange={(date: Date) => setStart(date)} />
            <DatePicker selected={endValue} onChange={(date: Date) => setEnd(date)} />
            <button onClick={handleUserOptionsChange}>Save</button>
        </div>
    );
};

export default VisualisationData;