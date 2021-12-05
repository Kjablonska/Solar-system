import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserOptions from '../../../types/userOptions';
import { setUserSelection } from '../../../redux/action';
import { VisualisationMode } from '..';
import PickerSatellites from './PickerSatellites';
import PickerSolarSystem from './PickerSolarSystem';
import { useState } from 'react';
import ErrorHandler from './ErrorHandler';
import styled from 'styled-components';
import { SpeedModes } from '../../../utils/speedModes';
import { formatDate, formatTime } from '../../../utils/findFetchPeriod';

interface ParamsPickerProps {
    visualisationMode: VisualisationMode;
}

const ErrorContainer = styled.div`
position: absolute;
width: 100%;
height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 35px;
`;

export interface PickerProps {
    startVisualisation: (start: Date | null, end: Date | null, planet?: string, mode?: SpeedModes) => void;
}

const ParamsPicker: React.FC<ParamsPickerProps> = ({ visualisationMode }) => {
    const [isError, openError] = useState<boolean>(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const startVisualisation = (startValue: Date | null, endValue: Date | null, planet?: string, mode?: SpeedModes) => {
        if (startValue === null || (endValue !== null && startValue !== null && endValue <= startValue)) {
            openError(true);
            return false;
        }
        console.log(startValue, endValue);
        if (startValue === null) return;
        const newUserOptions: UserOptions = {
            mode: mode === undefined ? 'RealTime' : mode,
            startDate: startValue !== null ? formatDate(startValue) : formatDate(new Date()),
            time: visualisationMode === VisualisationMode.Satellites ? formatTime(startValue) : undefined,
            planet: visualisationMode === VisualisationMode.Satellites ? planet : undefined,
            endDate: endValue !== null ? formatDate(endValue) : undefined,
        };
        dispatch(setUserSelection(newUserOptions));
        visualisationMode === 'solarSystem' ? history.push('/visualisation') : history.push('/planet');

        return true;
    };

    const closeErrorMessage = () => {
        openError(false);
    };

    return (
        <>
            {isError && (
                <ErrorContainer>
                    <ErrorHandler onClose={closeErrorMessage} />
                </ErrorContainer>
            )}
            {visualisationMode === VisualisationMode.Satellites ? (
                <PickerSatellites startVisualisation={startVisualisation} />
            ) : (
                <PickerSolarSystem startVisualisation={startVisualisation} />
            )}
        </>
    );
};

export default ParamsPicker;
