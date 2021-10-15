import elipse from '../../assets/elipse_spinner2.png';
import rotating from '../../assets/elipse_spinner.png';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const ConstatntElipse = styled.div`
    width: 470px;
    height: 450px;
    background: url(${elipse});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RotatingElipse = styled.div`
position: absolute;
    width: 300px;
    height: 380px;
    background: url(${rotating});
    border-radius: 50%;
    animation: ${rotate} 2s linear infinite;
`;

const SpinnerContainer = styled.div`
    position: relative;
    background-color: #2a0e58;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Spinner = () => {
    return (
        <SpinnerContainer>
            <div>
            <ConstatntElipse />
            <RotatingElipse />
            </div>
        </SpinnerContainer>
    );
};

export default Spinner;
