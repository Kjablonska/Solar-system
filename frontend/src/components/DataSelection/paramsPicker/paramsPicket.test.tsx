import React from 'react'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import PickerSatellites from './PickerSatellites';
import { StartButton } from './style';
import PickerSolarSystem from './PickerSolarSystem';

describe('params picker tests', () => {
    configure({ adapter: new Adapter() });
    it('picker satellites - start button should not occure', () => {
        const satelitesPicker = shallow(<PickerSatellites startVisualisation={() => {}} />);
        const startButton = satelitesPicker.find(<StartButton />);
        expect(startButton).toEqual({});
    });

    it('picker solar system - start button should not occure', () => {
        const satelitesPicker = shallow(<PickerSolarSystem startVisualisation={() => {}} />);
        const startButton = satelitesPicker.find(<StartButton />);
        expect(startButton).toEqual({});
    });

});
