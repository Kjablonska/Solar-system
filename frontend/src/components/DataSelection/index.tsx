import { useState } from 'react';
import styled from 'styled-components';
import ParamsPicker from './paramsPicker/ParamsPicker';
import dataSelectionBackground from '../../assets/data_selection_background.png';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

export enum VisualisationMode {
    Satellites = 'satellites',
    SolarSystem = 'solarSystem',
}

const DataSelectionContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-size: contain;
    background-position: center;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    width: 650px;
    height: 360px;
    top: 30%;
    margin-left: 130px;
    background-image: url(${dataSelectionBackground});
`;

const ModeSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
`;

const ModeCheckBox = styled.button`
    outline: none;
    height: 25px;
    width: 25px;
    background: #d6cfcb;
    border: 1px solid #000000;
    box-sizing: border-box;
    margin-top: 5px;
`;

const ModalText = styled.span`
    color: #d6cfcb;
    height: 40px;
    margin-left: 30px;
    font-size: 30px;
    -webkit-text-stroke: 0.7px black;
`;

const ModalTitle = styled.div.attrs({ children: 'Please select mode' })`
    font-size: 36px;
    line-height: 35px;
    color: #d6cfcb;
    -webkit-text-stroke: 0.7px black;
    height: 60px;
`;

const DataSelection = () => {
    const [mode, setMode] = useState<VisualisationMode | null>(null);
    const handleModeSelection = (selectedMode: VisualisationMode) => {
        setMode(selectedMode);
        const selected = document.getElementById(selectedMode);
        selected!.style.backgroundColor = '#a6808c';
        const unselected = document.getElementById(
            selectedMode === VisualisationMode.Satellites
                ? VisualisationMode.SolarSystem
                : VisualisationMode.Satellites,
        );
        unselected!.style.backgroundColor = '#d6cfcb';
    };

    return (
        <div>
            <DataSelectionContainer>
                <ModalTitle />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <ModeSelectionContainer>
                        <ModeCheckBox
                            id={VisualisationMode.SolarSystem}
                            onClick={() => handleModeSelection(VisualisationMode.SolarSystem)}
                        />
                        <ModalText>Solar System</ModalText>
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <ModeCheckBox
                            id={VisualisationMode.Satellites}
                            onClick={() => handleModeSelection(VisualisationMode.Satellites)}
                        />
                        <ModalText>Planet & its satellite</ModalText>
                    </ModeSelectionContainer>
                </div>
            </DataSelectionContainer>
            {mode !== null && <ParamsPicker visualisationMode={mode} />}
        </div>
    );
};

export default DataSelection;
