import { PlanetData } from '../../types/planetInterfaces';
import SceneComponent from './SceneComponent';
import React, { useEffect } from 'react';
import { FetchData, VisualisationOptions } from '../../types/period';

interface SceneProps {
    planetsData: PlanetData[];
    visualisationOptions: VisualisationOptions;
    fetchData: FetchData;
}

const CreateScene: React.FC<SceneProps> = ({ planetsData, visualisationOptions, fetchData }) => {
    // TODO: rem
    useEffect(() => {
        console.log('planets data CHANGE');
    }, [visualisationOptions]);

    return (
        <div id='my-canvas'>
            <SceneComponent
                antialias
                planetsData={planetsData}
                visualisationOptions={visualisationOptions}
                fetchData={fetchData}
                id='my-canvas'
            />
        </div>
    );
};

export default CreateScene;
