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
    font-size: 14px;
`;

const InfoContent = styled.div`
    padding-top: 100px;
    padding-left: 200px;
    padding-right: 50px;
`;

const CloseButton = styled.button.attrs({ children: 'X' })`
    float: right;
`;

const ParamsTable = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    width: 50%;
    margin-top: 30px;
    margin-bottom: 30px;
`;

const TableHeader = styled.th`
    border: 1px solid black;
    height: 30px;
`;

const TableContent = styled.td`
    border: 1px solid black;
    height: 40px;
`;

const Info: React.FC<InfoProps> = ({ onClose }) => {
    return (
        <InfoContainer>
            <InfoContent>
                <CloseButton onClick={onClose} />
                <h1>Welcome to the Solar System visualisation!</h1>
                <p>This application presents the accurate solar system data as 3D modes.</p>
                <p>It was created as a bachelor thesis project.</p>
                <ul>
                    <h3>Modes</h3>
                </ul>
                <li>
                    Solar System - renders Sun with 8 planets of the solar system orbiting around it: Mercury, Venus,
                    Earth, Mars, Jupiter, Saturn, Uranus and Neptune. The origin point of the Cartesian coordinate
                    system is the center of the Sun.
                    <ParamsTable>
                        <tr>
                            <TableHeader style={{ width: '200px' }}>Parameter</TableHeader>
                            <TableHeader>Description</TableHeader>
                        </tr>
                        <tr>
                            <TableContent>Start date</TableContent>
                            <TableContent>
                                Defines the beginning of the time frame used in the visualisation.
                            </TableContent>
                        </tr>
                        <tr>
                            <TableContent>End date</TableContent>
                            <TableContent>
                                Defines the end date of the time frame. The visualisation freezes once it reaches the
                                end date. If not set, the visualisation will continue in real time.
                            </TableContent>
                        </tr>
                        <tr>
                            <TableContent>Speed mode</TableContent>
                            <TableContent>
                                Defines the visualisation speed which is defined by the time needed for one jump -
                                transition between two subsequent orbit points.
                            </TableContent>
                        </tr>
                    </ParamsTable>
                    Speed modes are defined as follows:
                    <ParamsTable style={{ width: '40%' }}>
                        <tr>
                            <TableHeader style={{ width: '200px' }}>Speed mode</TableHeader>
                            <TableHeader>Description</TableHeader>
                        </tr>
                        <tr>
                            <TableContent>Real Time</TableContent>
                            <TableContent>One jump corresponds to 1 second in the real world.</TableContent>
                        </tr>
                        <tr>
                            <TableContent>Medium</TableContent>
                            <TableContent>One jump corresponds to 2.4 hours in the real world.</TableContent>
                        </tr>
                        <tr>
                            <TableContent>Fast</TableContent>
                            <TableContent>One jump corresponds to 4.8 hours in the real world.</TableContent>
                        </tr>
                    </ParamsTable>
                </li>

                <li>
                    Planet & its satellites - presents selected planet with its planetary satellites. The origin point
                    of the Cartesian coordinate system is the center of the chosen planet.
                    <ParamsTable>
                        <tr>
                            <TableHeader style={{ width: '200px' }}>Parameter</TableHeader>
                            <TableHeader>Description</TableHeader>
                        </tr>
                        <tr>
                            <TableContent>Planet</TableContent>
                            <TableContent>To be selected from the planets of the solar system.</TableContent>
                        </tr>
                        <tr>
                            <TableContent>Start date</TableContent>
                            <TableContent>
                                Defines the beginning of the time frame used in the visualisation.
                            </TableContent>
                        </tr>
                        <tr>
                            <TableContent>End date</TableContent>
                            <TableContent>
                                Defines the end date of the time frame. The visualisation freezes once it reaches the
                                end date. If not set, the visualisation will continue in real time.
                            </TableContent>
                        </tr>
                    </ParamsTable>
                </li>

                <div>
                    When all parameters are correctly set, the start button apprears. On click, the visualisation
                    starts.
                </div>
            </InfoContent>
        </InfoContainer>
    );
};

export default Info;
