import styled from 'styled-components';
import dataSelectionBackground from '../../assets/data_selection_background.png';
import DatePicker from "react-datepicker";

const DataSelectionContainer = styled.div`
position: absolute;
    display: flex;
    flex-direction: column;
    background-size: contain;
    background-position: center;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    width: 500px;
    height: 500px;
    top: 45%;
    left: 10%;
    background-image: url(${dataSelectionBackground});
`;

const ModeSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
`;

const ModeCheckBox = styled.label`
    height: 20px;
    width: 20px;
    background: #a6808c;
    background: #a6808c;
    border: 1px solid #000000;
    box-sizing: border-box;
`;

const ModalText = styled.label`
    color: #2a0e58;
    height: 40px;
    margin-left: 40px;
`;

const ModalTitle = styled.div.attrs({ children: 'Please select mode' })`
    font-size: 30px;
    line-height: 35px;
    color: #d6cfcb;
    -webkit-text-stroke: 0.7px black;
    height: 60px;
`;

const SelectionText = styled.div`
    color: #2a0e58;
    height: 30px;
    width: 100px;
    display: flex;
    align-items: center;
`;

const DropDown = styled.select`
    width: 100px;
    background: #A6808C;
`;

const Option = styled.option`
    color: #2a0e58;
    background: #A6808C;
`;

const DataSelection = () => {
    return (
        <DataSelectionContainer>
            <ModalTitle />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ModeSelectionContainer>
                    <ModeCheckBox />
                    <ModalText>Real time</ModalText>
                </ModeSelectionContainer>
                <ModeSelectionContainer>
                    <ModeCheckBox />
                    <ModalText>Select visualisation data</ModalText>
                </ModeSelectionContainer>
                <ModeSelectionContainer>
                    <SelectionText>start date</SelectionText>
                </ModeSelectionContainer>
                <ModeSelectionContainer>
                    <SelectionText>end date</SelectionText>
                </ModeSelectionContainer>
                <ModeSelectionContainer>
                    <SelectionText>speed date</SelectionText>
                    <DropDown>
                        <Option id='real-time'>Real-time</Option>
                        <Option id='normal'>Normal</Option>
                        <Option id='medium'>Medium</Option>
                        <Option id='fast'>Fast</Option>
                        <Option id='very-fast'>Very fast</Option>
                    </DropDown>
                </ModeSelectionContainer>
            </div>
        </DataSelectionContainer>
    );
};

export default DataSelection;
