import { useState } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import dataSelectionBackground from '../../assets/data_selection_background.png';
import DatePicker from 'react-datepicker';
import UserOptions from '../../types/userOptions';
import findFetchPeriod from '../../utils/findFetchPeriod';

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
    background: #a6808c;
`;

const Option = styled.option`
    color: #2a0e58;
    background: #a6808c;
`;

const DataSelection = () => {
    const { formatDate } = findFetchPeriod();
    const dispatch = useDispatch();
    const options = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);

    const [startValue, setStart] = useState<Date>(new Date());
    const [endValue, setEnd] = useState<Date>();

    const handleUserOptionsChange = () => {
        console.log(endValue);
        const newUserOptions: UserOptions = {
            isRealTime: realTime,
            startDate: formatDate(startValue),
            endDate: realTime === false && endValue !== undefined ? formatDate(endValue) : undefined,
        };
        dispatch(setUserSelection(newUserOptions));
    };

    return (
        <div>
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
                        <DatePicker selected={startValue} onChange={(date: Date) => setStart(date)} />
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <SelectionText>end date</SelectionText>
                    </ModeSelectionContainer>
                    <ModeSelectionContainer>
                        <SelectionText>speed date</SelectionText>
                        <DatePicker selected={startValue} onChange={(date: Date) => setStart(date)} />
                        <DropDown>
                            <Option id='real-time'>Real-time</Option>
                            <Option id='medium'>Medium</Option>
                            <Option id='fast'>Fast</Option>
                            <Option id='very-fast'>Very fast</Option>
                        </DropDown>
                    </ModeSelectionContainer>
                </div>
            </DataSelectionContainer>
        </div>
    );
};

export default DataSelection;
