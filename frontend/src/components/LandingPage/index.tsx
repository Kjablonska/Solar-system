import styled from 'styled-components';
import DataSelection from '../DataSelection';

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
    width: 20px;
    height: 20px;
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

const LandingPage = () => {
    return (
        <BackgroundContainer>
            <Header />
            <TopStar />
            <RightStar />
            <Planet />
            <DataSelection />
        </BackgroundContainer>
    );
};

export default LandingPage;
