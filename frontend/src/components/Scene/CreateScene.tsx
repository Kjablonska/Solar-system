import { PlanetData } from '../../types/planetInterfaces';
import SceneComponent from './SceneComponent';
import React, { useEffect } from 'react';

interface SceneProps {
    planetsData: PlanetData[];
    isRealTime: boolean;
    startDate: string;
    endDate: string;
}

const CreateScene: React.FC<SceneProps> = ({ isRealTime, planetsData, startDate, endDate }) => {
    useEffect(() => {
        console.log('planets data CHANGE')
    }, [startDate, endDate])

    return (
        <div id='my-canvas'>
            <SceneComponent antialias planetsData={planetsData} startDate={startDate} endDate={endDate} isRealTime={isRealTime} id='my-canvas' />
        </div>
    );
};

export default CreateScene;
