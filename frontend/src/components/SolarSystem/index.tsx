import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlanetData } from '../../types/planetInterfaces';
import rescaleData from '../../utils/rescaleData';
import { VisualisationOptions } from '../../types/period';
import UserOptions from '../../types/userOptions';
import Spinner from '../LandingPage/Spinner';
import ErrorMessage from '../LandingPage/ErrorMessage';
import SceneComponent from './SceneComponent';
import { planets } from '../../utils/consts';
import { defineStartingPeriod, findFetchParameters } from '../../utils/findFetchPeriod';

export const InitSceneData = () => {
    const [isError, openError] = useState<boolean>(false);
    const [isLoading, openSpinner] = useState<boolean>(false);
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const [visualisationOptions, setVisualisationOptions] = useState<VisualisationOptions>();
    const options: UserOptions = useSelector((state: RootStateOrAny) => state.userOptions);

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
            objects: { planets: planets },
        };
        setVisualisationOptions(visualisation);
    };

    async function getPlanetOrbit() {
        try {
            const response = await fetch(
                `http://localhost:5000/getPlanetsJPLData?name=${planets}&start=${start}&end=${end}&step=${fetchData.step}`,
            );
            const data = await response.json();
            console.log('fetch', data);
            const readyData = [];
            for (const key in data) {
                const newPlanetData: PlanetData = { planet: key, position: rescaleData(data[key], key, false) };
                readyData.push(newPlanetData);
            }

            // await getAsteroidsOrbit(readyData);
            setPlanetsData([...readyData]);
        } catch (e: any) {
            console.log(e);
            openError(true);
        } finally {
            openSpinner(false);
        }
    }

    async function getAsteroidsOrbit(readyData: PlanetData[]) {
        try {
            console.log("ASTEROIDS")
            const response = await fetch(
                `http://localhost:5000/getAsteroidsJPLData?start=${start}&end=${end}&step=${fetchData.step}`,
            );
            const data = await response.json();
            console.log('fetch', data);
            for (const key in data) {
                const newPlanetData: PlanetData = { planet: key, position: rescaleData(data[key], key, false) };
                readyData.push(newPlanetData);
            }
            console.log(" data", readyData)
            // setPlanetsData([...readyData]);
        } catch (e: any) {
            console.log(e)
            console.log("unable to fetch ateroids")
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
                planetsData.length > 1 &&
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
