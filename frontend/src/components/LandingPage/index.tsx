import styled from 'styled-components';
import DataSelection from '../DataSelection';
import infoButton from '../../assets/info_button.png';
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
    left: 10%;
    color: #a6808c;
    font-size: 50px;
    line-height: 35px;
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
            <InfoButton />
        </BackgroundContainer>
    );
};

export default LandingPage;
