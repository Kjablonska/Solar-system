import findFetchPeriod from '../../../utils/findFetchPeriod';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SpeedModes } from '../../../speedModes';
import UserOptions from '../../../types/userOptions';
import { setUserSelection } from '../../../redux/action';
import { VisualisationMode } from '..';
import PickerSatellites from './PickerSatellites';
import PickerSolarSystem from './PickerSolarSystem';

interface ParamsPickerProps {
    visualisationMode: VisualisationMode;
}

export interface PickerProps {
    startVisualisation: (start: Date | null, end: Date | null, planet?: string, mode?: SpeedModes) => void;
}

const ParamsPicker: React.FC<ParamsPickerProps> = ({ visualisationMode }) => {
    const { formatDate, formatTime } = findFetchPeriod();
    const dispatch = useDispatch();
    const history = useHistory();

    const startVisualisation = (startValue: Date | null, endValue: Date | null, planet?: string, mode?: SpeedModes) => {
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

    return (
        <>
            {visualisationMode === VisualisationMode.Satellites ? (
                <PickerSatellites startVisualisation={startVisualisation} />
            ) : (
                <PickerSolarSystem startVisualisation={startVisualisation} />
            )}
        </>
    );
};

export default ParamsPicker;
