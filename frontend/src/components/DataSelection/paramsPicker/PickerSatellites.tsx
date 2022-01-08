import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { planets } from '../../../utils/consts';
import { PickerProps } from './ParamsPicker';
import { Option, DropDown, ModeSelectionContainer, ParamsPickerContainer, SelectionText, StartButton } from './style';

const PickerSatellites: React.FC<PickerProps> = ({ startVisualisation }) => {
    const [startValue, setStart] = useState<Date | null>(null);
    const [endValue, setEnd] = useState<Date | null>(null);
    const [planet, setPlanet] = useState<string>(planets[0]);

    const onStart = () => {
        startVisualisation(startValue, endValue, planet);
    };

    const handlePlanetSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setPlanet(event.target.value);
    };

    const generatePlanetsSelection = () => {
        const options: any[] = planets.map((planet: string) => {
            return (
                <Option key={planet} value={planet}>
                    {planet}
                </Option>
            );
        });

        return options;
    };

    return (
        <ParamsPickerContainer>

            <div>
                <ModeSelectionContainer>
                    <SelectionText>Planet:</SelectionText>
                    <DropDown onChange={handlePlanetSelection}>{generatePlanetsSelection()}</DropDown>
                </ModeSelectionContainer>
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
                        dateFormat='P HH:mm'
                        timeFormat='HH:mm'
                        timeIntervals={5}
                        showTimeSelect
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
            </div>
            {startValue !== null && <StartButton onClick={onStart} />}
        </ParamsPickerContainer>
    );
};

export default PickerSatellites;
