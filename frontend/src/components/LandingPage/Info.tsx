import styled from 'styled-components';
import { Star1, Star2, Star3, Star5, Star7 } from '../../styles/Stars';
import rocket from '../../assets/rocket.png'

interface InfoProps {
    onClose: () => void;
}

export const Rocket = styled.div`
    position: absolute;
    top: 35%;
    left: 75%;
    height: 480px;
    width: 280px;
    background: url(${rocket}) no-repeat;
    transform: rotate(-30deg);
`;

const InfoContainer = styled.div`
    position: relative;
    font-size: 20px;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #171738;
`;

const InfoContent = styled.div`
    padding-top: 30px;
    padding-left: 200px;
    padding-right: 50px;
    color: #F1EDEE;
    width: 60%;
`;

const CloseButton = styled.button.attrs({ children: 'X' })`
    float: right;
    border: 0.5px solid #F1EDEE;
    border-radius: 5px;
    font-weight: bold;
    color: #F1EDEE;
    margin-right: -300px;
    background: #171738;
`;

const ParamsTable = styled.table`
    border: 0.5px solid #171738;
    border-collapse: collapse;
    width: 60%;
    margin-top: 20px;
    margin-bottom: 30px;
`;

const TableHeader = styled.th`
    border: 0.5px solid #171738;
    height: 20px;
`;

const TableContent = styled.td`
    border: 0.5px solid #171738;
    height: 25px;
`;

const Info: React.FC<InfoProps> = ({ onClose }) => {
    return (
        <InfoContainer>
            <Star1 />
            <Star2 />
            <Star3 />
            <Star5 />
            <Star7 />
            <Rocket />
            <InfoContent>
                <CloseButton onClick={onClose} />
                <h1>Welcome to the Solar System Visualisation! 🛸</h1>
                <p>This application presents the accurate solar system data as 3D modes.</p>
                <h3>There are two available modes:</h3>
                <li>
                    <span style={{color: '#169873'}}><b>Solar System </b></span>
                    - renders Sun with 8 planets of the solar system orbiting around it: Mercury, Venus,
                    Earth, Mars, Jupiter, Saturn, Uranus and Neptune. The origin point of the Cartesian coordinate
                    system is the center of the Sun.
                    <ParamsTable>
                        <tbody>
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
                        </tbody>
                    </ParamsTable>
                    Speed modes are defined as follows:
                    <ParamsTable style={{ width: '50%' }}>
                        <tbody>
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
                        </tbody>
                    </ParamsTable>
                </li>

                <li>
                    <span style={{color: '#B95F89'}}><b>Planet & its satellites </b></span>
                    - presents selected planet with its planetary satellites. The origin point
                    of the Cartesian coordinate system is the center of the chosen planet.
                    <ParamsTable>
                        <tbody>
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
                        </tbody>
                    </ParamsTable>
                </li>

                <div>
                    When all parameters are correctly set, the start button apprears. On click, the visualisation
                    starts.
                    <br></br>
                    The visualisation contains of the rendered model and user interface containing:
                        <li style={{marginBottom: '5px', marginTop: '10px'}}><b>Clock</b> - displays the current visusalisation date and time.</li>
                        <li style={{marginBottom: '5px'}}><b>"More info" button</b> - displays more info about the visible celestial bodies.</li>
                        <li style={{marginBottom: '5px'}}><b>"Back" button</b> - redirect to the parameter selection view.</li>
                        <li style={{marginBottom: '5px'}}><b>"X" button</b> - toggles user interface.</li>
                        <li><b>"Show labels" button</b> - toggles labels.</li>
                </div>
            </InfoContent>
        </InfoContainer>
    );
};

export default Info;
