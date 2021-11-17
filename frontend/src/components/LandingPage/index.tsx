import { useState } from 'react';
import styled from 'styled-components';
import DataSelection from '../DataSelection';
import infoButton from '../../assets/info_button.png';
import Info from './Info'
import { Star1, Star2, Star3, Star4, Star5 } from '../../styles/Stars';

const BackgroundContainer = styled.div`
    position: relative;
    background-color: #2a0e58;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Header = styled.span.attrs({ children: 'Solar system visualisation' })`
    position: absolute;
    top: 15%;
    margin-left: 130px;
    color: #a6808c;
    font-size: 64px;
    line-height: 35px;
    -webkit-text-stroke: 0.7px black;
    text-shadow: 2px 2px 0px #889a9f;
`;

const Planet = styled.div`
    position: absolute;
    left: 65%;
    margin-top: -80px;
    width: 850px;
    height: 840px;
    border-radius: 50%;
    background: linear-gradient(180deg, #c4c4c4 0%, rgba(196, 196, 196, 0) 100%);
    overflow: hidden;
`;

const InfoButton = styled.button`
    border: none;
    position: absolute;
    width: 115px;
    height: 55px;
    top: 90%;
    left: 90%;
    background: url(${infoButton});
`;

const LandingPage = () => {
    const [openInfo, isInfoOpened] = useState<boolean>(false);

    return (
        <BackgroundContainer>
            <Header />
            <Star1 />
            <Star2 />
            <Planet />
            <Star3 />
            <Star4 />
            <Star5 />
            <DataSelection />
            <InfoButton onClick={() => isInfoOpened(true)}/>
            { openInfo &&
                <Info onClose={() => isInfoOpened(false)}/>
            }
        </BackgroundContainer>
    );
};

export default LandingPage;
