import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import findFetchPeriod from '../../utils/findFetchPeriod';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { SpeedModes } from '../../speedModes';
import UserOptions from '../../types/userOptions';
import { setUserSelection } from '../../redux/action';
import startButton from '../../assets/start_button.png';
import paramsPickerBackground from '../../assets/params_picker_background.png';
import { planets } from '../../utils/consts';

interface ParamsPickerProps {
    visualisationMode: string;
}

const SelectionText = styled.div`
    color: #d6cfcb;
    -webkit-text-stroke: 0.3px black;
    font-size: 22px;
    height: 30px;
    width: 150px;
`;

const DropDown = styled.select`
    width: 112px;
    height: 27px;
    background: #d6cfcb;
    border: 0.1px solid black;
    outline: none;
`;

const Option = styled.option`
    color: #2a0e58;
    background: #d6cfcb;
`;

const ParamsPickerContainer = styled.div`
    position: absolute;
    width: 439px;
    height: 235px;
    display: flex;
    background-size: contain;
    background-position: center;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-image: url(${paramsPickerBackground});
    top: 55%;
    left: 35%;
`;

const ModeSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    margin-bottom: 5px;
`;

const StartButton = styled.button`
    border: none;
    position: absolute;
    outline: none;
    width: 175px;
    height: 67px;
    top: 90%;
    left: 80%;
    background: url(${startButton});
`;

const ParamsPicker: React.FC<ParamsPickerProps> = ({ visualisationMode }) => {
    const { formatDate } = findFetchPeriod();
    const dispatch = useDispatch();
    const history = useHistory();

    const [startValue, setStart] = useState<Date | null>(null);
    const [endValue, setEnd] = useState<Date | null>(null);
    const [mode, setMode] = useState<SpeedModes>(SpeedModes.RealTime);
    const [planet, setPlanet] = useState<string>(planets[0]);

    const handleSpeedModeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setMode(event.target.value as SpeedModes);
    };

    const generatePlanetsSelection = () => {
        const options: any[] = planets.map((planet: string) => {
            return (
                <Option key={planet} value={planet}>
                    {planet}
                </Option>
            );
        });

        console.log(options, planets);

        return options;
    };

    const handlePlanetSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setPlanet(event.target.value);
    };

    const startVisualisation = () => {
        console.log(startValue, endValue);
        const newUserOptions: UserOptions = {
            mode: mode,
            startDate: startValue !== null ? formatDate(startValue) : formatDate(new Date()),
            endDate: endValue !== null ? formatDate(endValue) : undefined,
        };
        dispatch(setUserSelection(newUserOptions));
        visualisationMode === 'solarSystem' ? history.push('/visualisation') : history.push('/planet')
    };
    return (
        <ParamsPickerContainer>
            <div>
                {visualisationMode === 'planet' && (
                    <ModeSelectionContainer>
                        <SelectionText>Planet</SelectionText>
                        <DropDown onChange={handlePlanetSelection}>{generatePlanetsSelection()}</DropDown>
                    </ModeSelectionContainer>
                )}
                <ModeSelectionContainer>
                    <SelectionText>Start date</SelectionText>
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
                    <SelectionText>End date</SelectionText>
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
                {visualisationMode === 'solarSystem' && (
                    <ModeSelectionContainer>
                        <SelectionText>Speed mode</SelectionText>
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
                        </DropDown>
                    </ModeSelectionContainer>
                )}
            </div>
            {
                startValue !== null && <StartButton onClick={startVisualisation} />
            }
        </ParamsPickerContainer>
    );
};

export default ParamsPicker;
