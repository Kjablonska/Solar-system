import stars from '../../assets/spinner/stars.jpg';
import turtle from '../../assets/spinner/turtle.png';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg) translateX(300px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(300px) rotate(-360deg);
  }
`;

const ConstatntElipse = styled.div`
    position: absolute;
    width: 400px;
    height: 300px;
    background: url(${turtle});
`;

const RotatingElipse = styled.div`
    position: absolute;
    animation: ${rotate} 6s linear infinite;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 150px;
    margin-top: 100px;
`;

const Sun = styled.div`
    width: 80px;
    height: 80px;
    background: yellow;
    border-radius: 50%;
`;

const AnimationContainer = styled.div`
    width: 400px;
    height: 300px;
    margin-top: 100px;
    flex: 2;
`;

const SpinnerContainer = styled.div`
    /* background-color: #2a0e58; */
    background: url(${stars});
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const SpinnerTitle = styled.div.attrs({ children: 'Please wait for the data to be loaded' })`
    color: #d6cfcb;
    height: 100px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spinner = () => {
    return (
        <SpinnerContainer>
            <SpinnerTitle />
            <AnimationContainer>
                <ConstatntElipse />
                <RotatingElipse>
                    <Sun />
                </RotatingElipse>
            </AnimationContainer>
        </SpinnerContainer>
    );
};

export default Spinner;
