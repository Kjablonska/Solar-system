import styled from 'styled-components';
import startButton from '../../../assets/start_button.png';
import paramsPickerBackground from '../../../assets/params_picker_background.png';

export const SelectionText = styled.div`
    color: #d6cfcb;
    -webkit-text-stroke: 0.3px black;
    font-size: 20px;
    height: 30px;
    width: 135px;
`;

export const SelectionTextSatellites = styled.div`
    color: #d6cfcb;
    -webkit-text-stroke: 0.3px black;
    font-size: 20px;
    height: 30px;
    width: 160px;
`;

export const DropDown = styled.select`
    width: 142px;
    height: 27px;
    background: #d6cfcb;
    border: 0.1px solid black;
    outline: none;
`;

export const Option = styled.option`
    color: #2a0e58;
    background: #d6cfcb;
`;

export const ParamsPickerContainer = styled.div`
    position: absolute;
    width: 439px;
    height: 235px;
    display: flex;
    background-size: contain;
    background-position: center;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-image: url(${paramsPickerBackground});
    top: 55%;
    left: 35%;
`;

export const ModeSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    margin-bottom: 5px;
`;

export const StartButton = styled.button`
    border: none;
    position: absolute;
    outline: none;
    width: 175px;
    height: 67px;
    top: 90%;
    left: 80%;
    background: url(${startButton});
`;