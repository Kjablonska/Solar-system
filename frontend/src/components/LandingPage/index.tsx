import styled from 'styled-components';
import DataSelection from '../DataSelection';
import startButton from '../../assets/start_button.png';
import infoButton from '../../assets/info_button.png';

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

const TopStar = styled.div`
    position: absolute;
    left: 5%;
    top: 15%;
    width: 30px;
    height: 30px;
    background: radial-gradient(50% 50% at 50% 50%, #d6cfcb 0%, rgba(196, 196, 196, 0) 100%);
`;

const RightStar = styled.div`
    position: absolute;
    left: 45%;
    top: 40%;
    width: 20px;
    height: 20px;
    background: radial-gradient(50% 50% at 50% 50%, #ede5a6 0%, rgba(252, 210, 129, 0) 100%);
`;

const Star3 = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    left: 60%;
    top: 75%;
    background: radial-gradient(50% 50% at 50% 50%, #a6808c 0%, rgba(196, 196, 196, 0) 100%);
`;

const Star4 = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 10%;
    top: 40%;
    background: radial-gradient(50% 50% at 50% 50%, #d6cfcb 0%, rgba(252, 210, 129, 0) 100%);
`;

const Star5 = styled.div`
    position: absolute;
    width: 25px;
    height: 25px;
    left: 50%;
    top: 90%;
    background: radial-gradient(50% 50% at 50% 50%, #ede5a6 0%, rgba(196, 196, 196, 0) 100%);
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

const StartButton = styled.button`
    border: none;
    position: absolute;
    width: 175px;
    height: 67px;
    top: 85%;
    left: 35%;
    background: url(${startButton});
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
            <TopStar />
            <RightStar />
            <Planet />
            <Star3 />
            <Star4 />
            <Star5 />
            <DataSelection />
            <StartButton />
            <InfoButton />
        </BackgroundContainer>
    );
};

export default LandingPage;
