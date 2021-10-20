import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlanetData } from '../../types/planetInterfaces';
import CreateScene from './CreateScene';
import rescaleData from '../../utils/rescaleData';
import findFetchPeriod from '../../utils/findFetchPeriod';
import { FetchData, VisualisationOptions } from '../../types/period';
import UserOptions from '../../types/userOptions';
import Spinner from '../LandingPage/Spinner';
import ErrorMessage from '../LandingPage/ErrorMessage';

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

export const InitSceneData = () => {
    const { defineStartingPeriod, findFetchParameters } = findFetchPeriod();
    const [isError, openError] = useState<boolean>(false);
    const [isLoading, openSpinner] = useState<boolean>(false);
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const [visualisationOptions, setVisualisationOptions] = useState<VisualisationOptions>();
    const options: UserOptions = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);

    // TODO: remove it from state, fix redux.
    const [fetchData] = useState<FetchData>(findFetchParameters(options.mode));
    console.log('period', fetchData.period, options.startDate);
    const { start, end } = defineStartingPeriod(fetchData.period, options.startDate);

    const setupData = () => {
        if (isError)
            openError(false);
        openSpinner(true);
        getPlanetOrbite(planets, fetchData.step);
        const visualisation: VisualisationOptions = {
            start: start,
            end: options.endDate,
            currentEnd: end,
            mode: options.mode,
        };
        setVisualisationOptions(visualisation);
    };

    async function getPlanetOrbite(planets: string[], step: string) {
        try {
            const response = await fetch(
                `http://localhost:5000/getObjectsJPLData?name=${planets.join(
                    ',',
                )}&start=${start}&end=${end}&step=${step}`,
            );
            const data = await response.json();
            const readyData = [];
            for (const key in data) {
                const newPlanetData: PlanetData = { planet: key, position: rescaleData(data[key], key) };
                readyData.push(newPlanetData);
            }
            setPlanetsData(readyData);
        } catch (e: any) {
            console.log('err', e);
            openError(true);
        }
        finally {
            openSpinner(false);
        }
    }

    useEffect(() => {
        setupData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO: It forces another 2 renders at first reload.
    // useEffect(() => {
    //     console.log(options);
    //     getPlanetOrbite(planets, '1m');
    // }, [options])

    return (
        <>
            {isLoading && <Spinner />}
            {isError && <ErrorMessage onRetry={setupData} />}
            {planetsData !== undefined &&
                planetsData.length === planets.length &&
                visualisationOptions !== undefined &&
                !isError && (
                    <CreateScene
                        planetsData={planetsData}
                        visualisationOptions={visualisationOptions}
                        fetchData={fetchData}
                    />
                )}
        </>
    );
};

// const response = await axios.get(
//     `http://localhost:5000/getObjectsJPLData?name=${planets.join(',')}&start=${start}&end=${end}&step=${step}`
// );
// const data = JSON.stringify(response.data) as any;
// console.log("RESPONSE JSON", data)
