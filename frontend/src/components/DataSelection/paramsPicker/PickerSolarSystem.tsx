import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { SpeedModes } from '../../../utils/speedModes';
import { PickerProps } from './ParamsPicker';
import { Option, DropDown, ModeSelectionContainer, ParamsPickerContainer, SelectionText, StartButton } from './style';

const PickerSolarSystem: React.FC<PickerProps> = ({ startVisualisation }) => {
    const [startValue, setStart] = useState<Date | null>(null);
    const [endValue, setEnd] = useState<Date | null>(null);
    const [mode, setMode] = useState<SpeedModes>('RealTime');

    const handleSpeedModeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setMode(event.target.value as SpeedModes);
    };

    const onStart = () => {
        startVisualisation(startValue, endValue, undefined, mode);
    };

    return (
        <ParamsPickerContainer>
            <div>
                <ModeSelectionContainer>
                    <SelectionText>Start date:</SelectionText>
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
                    <SelectionText>End date:</SelectionText>
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
                    <SelectionText>Speed mode</SelectionText>
                    <DropDown onChange={handleSpeedModeSelection}>
                        <Option id='real-time' value={'RealTime'}>
                            Real-time
                        </Option>
                        <Option id='medium' value={'Medium'}>
                            Medium
                        </Option>
                        <Option id='fast' value={'Fast'}>
                            Fast
                        </Option>
                    </DropDown>
                </ModeSelectionContainer>
            </div>
            {startValue !== null && <StartButton onClick={onStart} />}
        </ParamsPickerContainer>
    );
};

export default PickerSolarSystem;
