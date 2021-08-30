import { PlanetData } from '../../types/planetInterfaces';
import SceneComponent from './SceneComponent';
import React, { useEffect } from 'react';
import { FetchData } from '../../types/period';

interface SceneProps {
    planetsData: PlanetData[];
    isRealTime: boolean;
    startDate: string;
    endDate: string;
    fetchData: FetchData;
}

const CreateScene: React.FC<SceneProps> = ({ isRealTime, planetsData, startDate, endDate, fetchData }) => {
    useEffect(() => {
        console.log('planets data CHANGE');
    }, [startDate, endDate]);

    return (
        <div id='my-canvas'>
            <SceneComponent
                antialias
                planetsData={planetsData}
                startDate={startDate}
                endDate={endDate}
                isRealTime={isRealTime}
                fetchData={fetchData}
                id='my-canvas'
            />
        </div>
    );
};

export default CreateScene;
