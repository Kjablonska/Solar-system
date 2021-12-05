import React from 'react'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, configure } from 'enzyme';
import LandingPage from '.';
import InfoButton from '.';

describe('landing page tests', () => {
    configure({ adapter: new Adapter() });
    it('info button should occure', () => {
        const satelitesPicker = shallow(<LandingPage />);
        const infoButton = satelitesPicker.find(<InfoButton />);
        expect(infoButton).toEqual({});
    });
});
