import { useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import dataSelectionBackground from '../../assets/data_selection_background.png';
import startButton from '../../assets/start_button.png';
import DatePicker from 'react-datepicker';
import UserOptions from '../../types/userOptions';
import findFetchPeriod from '../../utils/findFetchPeriod';
import { setUserSelection } from '../../redux/action';
import { SpeedModes } from '../../speedModes';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const DataSelectionContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-size: contain;
    background-position: center;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    width: 500px;
    height: 500px;
    top: 45%;
    left: 10%;
    background-image: url(${dataSelectionBackground});
`;

const ModeSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
`;

const ModeCheckBox = styled.label`
    height: 20px;
    width: 20px;
    background: #a6808c;
    background: #a6808c;
    border: 1px solid #000000;
    box-sizing: border-box;
`;

const ModalText = styled.label`
    color: #2a0e58;
    height: 40px;
    margin-left: 40px;
`;

const ModalTitle = styled.div.attrs({ children: 'Please select mode' })`
    font-size: 30px;
    line-height: 35px;
    color: #d6cfcb;
    -webkit-text-stroke: 0.7px black;
    height: 60px;
`;

const SelectionText = styled.div`
    color: #2a0e58;
    height: 30px;
    width: 100px;
`;

const DropDown = styled.select`
    width: 122px;
    height: 22px;
    background: #a6808c;
    border: 0.1px solid black;
`;

const Option = styled.option`
    color: #2a0e58;
    background: #a6808c;
`;

const StartButton = styled.button`
    border: none;
    position: absolute;
    width: 175px;
    height: 67px;
    top: 85%;
    left: 35%;
    background: url(${startButton});
`;

const DataSelection = () => {
    const { formatDate } = findFetchPeriod();
    const dispatch = useDispatch();
    const history = useHistory();

    const [startValue, setStart] = useState<Date | null>(null);
    const [endValue, setEnd] = useState<Date | null>(null);
    const [mode, setMode] = useState<SpeedModes>(SpeedModes.RealTime);

    const handleSpeedModeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setMode(event.target.value as SpeedModes);
    };

    const startVisualisation = () => {
        const newUserOptions: UserOptions = {
            mode: mode,
            startDate: startValue !== null ? formatDate(startValue) : formatDate(new Date()),
            endDate: mode !== SpeedModes.RealTime && endValue !== null ? formatDate(endValue) : undefined,
        };
        dispatch(setUserSelection(newUserOptions));
        history.push('/visualisation')
    }


    return (
        <div>
            <DataSelectionContainer>
                <ModalTitle />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ModeSelectionContainer>
                        <ModeCheckBox />
                        <ModalText>Real time</ModalText>
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <ModeCheckBox />
                        <ModalText>Select visualisation data</ModalText>
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <SelectionText>start date</SelectionText>
                        <DatePicker
                            isClearable
                            placeholderText='Select start date'
                            selected={startValue}
                            onChange={(date: Date) => setStart(date)}
                            wrapperClassName='date-picker-wrapper'
                            className='date-picker'
                            clearButtonClassName='date-picker-clear-button'
                        />
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <SelectionText>end date</SelectionText>
                        <DatePicker
                            isClearable
                            placeholderText='Select end date'
                            selected={endValue}
                            onChange={(date: Date) => setEnd(date)}
                            wrapperClassName='date-picker-wrapper'
                            className='date-picker'
                            clearButtonClassName='date-picker-clear-button'
                        />
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <SelectionText>speed date</SelectionText>
                        <DropDown onChange={handleSpeedModeSelection}>
                            <Option id='real-time' value={SpeedModes.RealTime}>
                                Real-time
                            </Option>
                            <Option id='medium' value={SpeedModes.Medium}>
                                Medium
                            </Option>
                            <Option id='fast' value={SpeedModes.Fast}>
                                Fast
                            </Option>
                            <Option id='very-fast' value={SpeedModes.VeryFast}>
                                Very fast
                            </Option>
                        </DropDown>
                    </ModeSelectionContainer>
                </div>
            </DataSelectionContainer>
            <StartButton onClick={startVisualisation} />
        </div>
    );
};

export default DataSelection;
