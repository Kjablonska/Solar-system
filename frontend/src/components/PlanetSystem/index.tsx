import { useState, useEffect } from 'react';
import { Vector3 } from '@babylonjs/core';
import { SpeedModes } from '../../speedModes';
import { PlanetData, PositionData } from '../../types/planetInterfaces';
import findFetchPeriod from '../../utils/findFetchPeriod';
import rescaleData from '../../utils/rescaleData';
import ErrorMessage from '../LandingPage/ErrorMessage';
import Spinner from '../LandingPage/Spinner';
import PlanetSystemComponent from './PlanetSystemComponent';

interface PlanetSystemSceneInterface {
    planet: string;
}

const startDate = '2021-9-24';
const endDate = '2021-11-26';
const step = '1h';

export const PlanetSystemScene: React.FC<PlanetSystemSceneInterface> = ({ planet }) => {
    planet = 'Earth';

    const [isError, openError] = useState<boolean>(false);
    const { defineStartingPeriod, findFetchParameters } = findFetchPeriod();
    const [isLoading, openSpinner] = useState<boolean>(false);
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const fetchData = findFetchParameters(SpeedModes.Satellite);
    console.log(fetchData)
    const { start, end } = defineStartingPeriod(fetchData.period, startDate);

    const visualisationOptions = {
        start: startDate,
        end: endDate,
        currentEnd: end,
        mode: SpeedModes.Satellite,
    };

    async function getSatellitesData() {
        try {
            const response = await fetch(
                `http://localhost:5000/getSatellites?planet=${planet}&start=${start}&end=${end}&step=${step}`,
            );
            const data = await response.json();
            console.log(data);
            const readyData = [];
            for (const key in data) {
                const newPlanetData: PlanetData = { planet: key, position: mapToArray(data[key]) };
                readyData.push(newPlanetData);
            }
            setPlanetsData(readyData);
        } catch (e: any) {
            openError(true);
        } finally {
            openSpinner(false);
        }
    }

    const mapToArray = (position: PositionData) => {
        console.log("pos", position)
        const points: Vector3[] = [];
        for (let i = 0; i < position.x.length; i++) {
            points.push(
                new Vector3(
                    position.x[i] / 100000,
                    position.y[i]/ 100000,
                    position.z[i] / 100000,
                ),
            );
        }
        console.log(points)
        return points;
    };

    useEffect(() => {
        getSatellitesData();
    }, []);

    return (
        <>
            {isLoading && <Spinner />}
            {isError && <ErrorMessage onRetry={getSatellitesData} />}
            {planetsData !== undefined && planetsData.length === 1 && visualisationOptions !== undefined && !isError && (
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
