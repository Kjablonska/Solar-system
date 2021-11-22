import findFetchPeriod from '../../../utils/findFetchPeriod';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SpeedModes } from '../../../speedModes';
import UserOptions from '../../../types/userOptions';
import { setUserSelection } from '../../../redux/action';
import { VisualisationMode } from '..';
import PickerSatellites from './PickerSatellites';
import PickerSolarSystem from './PickerSolarSystem';
import { useState } from 'react';
import ErrorHandler from './ErrorHandler';

interface ParamsPickerProps {
    visualisationMode: VisualisationMode;
}

export interface PickerProps {
    startVisualisation: (start: Date | null, end: Date | null, planet?: string, mode?: SpeedModes) => void;
}

const ParamsPicker: React.FC<ParamsPickerProps> = ({ visualisationMode }) => {
    const [isError, openError] = useState<boolean>(false);
    const { formatDate, formatTime } = findFetchPeriod();
    const dispatch = useDispatch();
    const history = useHistory();

    const startVisualisation = (startValue: Date | null, endValue: Date | null, planet?: string, mode?: SpeedModes) => {
        // console.log("onstart", startValue, endValue, startValue!.getTime() < endValue!.getTime())
        // if (startValue === null || (endValue !== null && startValue !== null && endValue.getTime() > startValue.getTime())) {
        //     openError(true);
        //     return;
        // }
        console.log(startValue, endValue);
        if (startValue === null)
            return;
        const newUserOptions: UserOptions = {
            mode: mode === undefined ? SpeedModes.RealTime : mode,
            startDate: startValue !== null ? formatDate(startValue) : formatDate(new Date()),
            time: visualisationMode === VisualisationMode.Satellites ? formatTime(startValue) : undefined,
            planet: visualisationMode === VisualisationMode.Satellites ? planet : undefined,
            endDate: endValue !== null ? formatDate(endValue) : undefined,
        };
        dispatch(setUserSelection(newUserOptions));
        visualisationMode === 'solarSystem' ? history.push('/visualisation') : history.push('/planet');
    };

    const closeErrorMessage = () => {
        openError(false)
    }

    return (
        <>
            {isError && <ErrorHandler onClose={closeErrorMessage}/>}
            {visualisationMode === VisualisationMode.Satellites ? (
                <PickerSatellites startVisualisation={startVisualisation} />
            ) : (
                <PickerSolarSystem startVisualisation={startVisualisation} />
            )}
        </>
    );
};

export default ParamsPicker;
