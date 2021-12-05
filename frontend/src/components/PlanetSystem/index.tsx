import { useState, useEffect } from 'react';
import { Vector3 } from '@babylonjs/core';
import { PlanetData, PositionData } from '../../types/planetInterfaces';
import { defineStartingPeriod, findFetchParameters } from '../../utils/findFetchPeriod';
import ErrorMessage from '../LandingPage/ErrorMessage';
import Spinner from '../LandingPage/Spinner';
import PlanetSystemComponent from './PlanetSystemComponent';
import { VisualisationOptions } from '../../types/period';
import UserOptions from '../../types/userOptions';
import { RootStateOrAny, useSelector } from 'react-redux';
import rescaleData from '../../utils/rescaleData';

const satellitesMap = new Map<string, number>([
    ['Mercury', 0],
    ['Venus', 0],
    ['Earth', 1],
    ['Mars', 2],
    ['Jupiter', 4],
    ['Saturn', 8],
    ['Uranus', 5],
    ['Neptune', 8],
]);

export const PlanetSystemScene = () => {
    const [isError, openError] = useState<boolean>(false);
    const [isLoading, openSpinner] = useState<boolean>(false);
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const fetchData = findFetchParameters('Satellite');
    const options: UserOptions = useSelector((state: RootStateOrAny) => state.userOptions);
    console.log('STATE', options);
    const { start, end } = defineStartingPeriod(fetchData.period, options.startDate);

    const satellitesNumber = satellitesMap.get(options.planet!);

    const visualisationOptions: VisualisationOptions = {
        start: options.startDate,
        end: options.endDate,
        currentEnd: end,
        mode: 'Satellite',
        objects: { planets: [options.planet!], satellites: true },
        time: options.time,
    };

    async function getSatellitesData() {
        let resCode = 200;
        openError(false);
        try {
            openSpinner(true);
            const response = await fetch(
                `http://localhost:5000/getSatellitesJPLData?planet=${options.planet}&start=${start}&end=${end}&step=${fetchData.step}`,
            );
            resCode = response.status;
            console.log(resCode)
            const data = await response.json();
            const readyData = [];
            for (const key in data) {
                const newPlanetData: PlanetData = {
                    planet: key,
                    position: rescaleData(data[key], options.planet!, true),
                };
                readyData.push(newPlanetData);
            }
            setPlanetsData(readyData);
        } catch (e: any) {
            console.log(e);
            openError(true);
        } finally {
            openSpinner(false);
            return resCode;
        }
    }

    useEffect(() => {
        getSatellitesData();
    }, []);

    return (
        <>
            {isLoading && <Spinner />}
            {isError && <ErrorMessage onRetry={getSatellitesData} />}
            {planetsData !== undefined &&
                planetsData.length === satellitesNumber &&
                visualisationOptions !== undefined &&
                !isError && (
                    <div id='my-canvas'>
                        <PlanetSystemComponent
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
