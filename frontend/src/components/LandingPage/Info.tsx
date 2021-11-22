import styled from 'styled-components';

interface InfoProps {
    onClose: () => void;
}

const InfoContainer = styled.div`
    position: relative;
    background: rgb(112, 243, 245);
    background: linear-gradient(0deg, rgba(112, 243, 245, 1) 0%, rgba(157, 150, 134, 1) 100%);
    font-size: 20px;
    width: 100%;
    height: 100%;
`;

const InfoContent = styled.div`
    padding-top: 100px;
    padding-left: 200px;
    padding-right: 50px;
`;

const CloseButton = styled.button.attrs({ children: 'X' })`
    float: right;
`;

const Info: React.FC<InfoProps> = ({ onClose }) => {
    return (
        <InfoContainer>
            <InfoContent>
                <CloseButton onClick={onClose} />
                <p>Welcome to the Solar System visualisation!</p>
                <p>...</p>
            </InfoContent>
        </InfoContainer>
    );
};

export default Info;
