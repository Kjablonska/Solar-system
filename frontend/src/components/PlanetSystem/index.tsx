import { useState, useEffect } from 'react';
import { Vector3 } from '@babylonjs/core';
import { SpeedModes } from '../../speedModes';
import { PlanetData, PositionData } from '../../types/planetInterfaces';
import findFetchPeriod from '../../utils/findFetchPeriod';
import ErrorMessage from '../LandingPage/ErrorMessage';
import Spinner from '../LandingPage/Spinner';
import PlanetSystemComponent from './PlanetSystemComponent';
import { VisualisationOptions } from '../../types/period';
import UserOptions from '../../types/userOptions';
import { RootStateOrAny, useSelector } from 'react-redux';

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
    const { defineStartingPeriod, findFetchParameters } = findFetchPeriod();
    const [isLoading, openSpinner] = useState<boolean>(false);
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const fetchData = findFetchParameters(SpeedModes.Satellite);
    const options: UserOptions = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);
    const { start, end } = defineStartingPeriod(fetchData.period, options.startDate);

    const satellitesNumber = satellitesMap.get(options.planet!);

    const visualisationOptions: VisualisationOptions = {
        start: options.startDate,
        end: options.endDate,
        currentEnd: end,
        mode: SpeedModes.Satellite,
        objects: { planets: [options.planet!], satellites: true },
        time: options.time,
    };

    async function getSatellitesData() {
        openError(false);
        try {
            openSpinner(true);
            const response = await fetch(
                `http://localhost:5000/getSatellitesJPLData?planet=${options.planet}&start=${start}&end=${end}&step=${fetchData.step}`,
            );
            const data = await response.json();
            console.log('data', data);
            const readyData = [];
            for (const key in data) {
                const newPlanetData: PlanetData = { planet: key, position: mapToArray(data[key]) };
                readyData.push(newPlanetData);
            }
            setPlanetsData(readyData);
            console.log('ready data', readyData);
        } catch (e: any) {
            console.log(e);
            openError(true);
        } finally {
            openSpinner(false);
        }
    }

    // TODO: calculate rescaling for each planet.
    const mapToArray = (position: PositionData) => {
        const points: Vector3[] = [];

        const start = visualisationOptions.time !== undefined ? visualisationOptions.time.hours : 0;

        for (let i = start; i < position.x.length; i++) {
            points.push(new Vector3(position.x[i] / 10000, position.y[i] / 10000, position.z[i] / 10000));
        }
        return points;
    };

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
