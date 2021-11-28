import styled from 'styled-components';

interface ErrorHandlerProps {
    onClose: () => void;
}

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.button.attrs({ children: 'x' })`
    color: white;
    background: transparent;
    border-radius: 5px;
    border: 1px solid #A6808C;
    font-size: 12px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
`;

const ErrorText = styled.p`
    color: white;
    font-size: 20px;
`;

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ onClose }) => {
    console.log("error")
    return (
        <ErrorContainer style={{position: 'absolute'}}>
            <ErrorText>Start date must be earlier than end date!</ErrorText>
            <CloseButton onClick={onClose} />
        </ErrorContainer>
    );
};

export default ErrorHandler;
