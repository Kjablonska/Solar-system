import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import retryButton from '../../assets/error/retry.png';
import goBackButton from '../../assets/error/back.png';
import { Star1, Star3, Star4, Star5, Star6 } from '../../styles/Stars';

const ErrorContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #2a0e58;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Message = styled.div`
    height: 100px;
    max-width: 800px;
    font-size: 24px;
    color: #d6cfcb;
    align-items: center;
`;

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RetryButton = styled.button`
    background: url(${retryButton}) no-repeat;
    border: none;
    width: 184px;
    height: 65px;
`;

const GoBackButton = styled.button`
    background: url(${goBackButton}) no-repeat;
    border: none;
    width: 300px;
    height: 86px;
`;

interface ErrorMessageProps {
    onRetry: () => any;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ onRetry }) => {
    const history = useHistory();
    const onNewDataSelection = () => {
        history.push('/');
    };

    return (
        <ErrorContainer>
            <Star1 />
            <Star6 />
            <Star3 />
            <Star4 />
            <Star5 />
            <Message>
            Something went wrong while fetching the data
            <span>   &#128126;</span>
            </Message>
            <ButtonsContainer>
                <RetryButton onClick={onRetry} />
                <GoBackButton onClick={onNewDataSelection} />
            </ButtonsContainer>
        </ErrorContainer>
    );
};

export default ErrorMessage;
