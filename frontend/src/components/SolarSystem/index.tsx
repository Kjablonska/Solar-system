import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlanetData } from '../../types/planetInterfaces';
import rescaleData from '../../utils/rescaleData';
import findFetchPeriod from '../../utils/findFetchPeriod';
import { VisualisationOptions } from '../../types/period';
import UserOptions from '../../types/userOptions';
import Spinner from '../LandingPage/Spinner';
import ErrorMessage from '../LandingPage/ErrorMessage';
import SceneComponent from './SceneComponent';

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

export const InitSceneData = () => {
    const { defineStartingPeriod, findFetchParameters } = findFetchPeriod();
    const [isError, openError] = useState<boolean>(false);
    const [isLoading, openSpinner] = useState<boolean>(false);
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const [visualisationOptions, setVisualisationOptions] = useState<VisualisationOptions>();
    const options: UserOptions = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);

    const fetchData = findFetchParameters(options.mode);
    const { start, end } = defineStartingPeriod(fetchData.period, options.startDate);

    const setupData = () => {
        if (isError) openError(false);
        openSpinner(true);
        getPlanetOrbit();
        const visualisation: VisualisationOptions = {
            start: start,
            end: options.endDate,
            currentEnd: end,
            mode: options.mode,
            objects: {planets: planets}
        };
        setVisualisationOptions(visualisation);
    };

    async function getPlanetOrbit() {
        try {
            const response = await fetch(
                `http://localhost:5000/getPlanetsJPLData?name=${planets}&start=${start}&end=${end}&step=${fetchData.step}`,
            );
            const data = await response.json();
            console.log(data);
            const readyData = [];
            for (const key in data) {
                const newPlanetData: PlanetData = { planet: key, position: rescaleData(data[key], key) };
                readyData.push(newPlanetData);
            }
            setPlanetsData([...readyData]);
        } catch (e: any) {
            openError(true);
        } finally {
            openSpinner(false);
        }
    }

    useEffect(() => {
        setupData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Spinner />}
            {isError && <ErrorMessage onRetry={setupData} />}
            {planetsData !== undefined &&
                planetsData.length === 8 &&
                visualisationOptions !== undefined &&
                !isError && (
                    <div id='my-canvas'>
                        <SceneComponent
                            antialias
                            planetsData={planetsData}
                            visualisationOptions={visualisationOptions}
                            fetchData={fetchData}
                            id='my-canvas'
                        />
                    </div>
                )}
        </>
    );
};
