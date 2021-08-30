import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlanetData } from '../../types/planetInterfaces';
import CreateScene from './CreateScene';
import rescaleData from '../../utils/rescaleData';
import findFetchPeriod from '../../utils/findFetchPeriod';
import { DatesPeriod, FetchData } from '../../types/period';

export const InitSceneData = () => {
    const { defineStartingPeriod, findFetchParameters } = findFetchPeriod();
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const planets = ['Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus'];
    const options = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);
    const [fetchData, setFetchDate] = useState<FetchData>(findFetchParameters(options.mode));
    const [currentPeriod, setCurrentPeriod] = useState<DatesPeriod>(defineStartingPeriod(fetchData.period, options.startDate, options.endDate));
    const isRealTime: boolean = options.isRealTime;
    const { start, end } = defineStartingPeriod(fetchData.period, options.startDate, options.endDate);

    async function getPlanetOrbite(planets: string[], step: string) {
        const response = await fetch(
            `http://localhost:5000/getObjectsJPLData?name=${planets}&start=${start}&end=${end}&step=${step}`,
        );
        const data = await response.json();
        const readyData = [];
        for (const key in data) {
            const newPlanetData: PlanetData = { planet: key, position: rescaleData(data[key]) };
            readyData.push(newPlanetData);
        }
        setPlanetsData(readyData);
    }

    useEffect(() => {
        const period = defineStartingPeriod(fetchData.period, options.startDate, options.endDate);
        setCurrentPeriod(period)
        getPlanetOrbite(planets, fetchData.step);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO: It forces another 2 renders at first reload.
    // useEffect(() => {
    //     console.log(options);
    //     getPlanetOrbite(planets, '1m');
    // }, [options])


    return (
        <>
            {planetsData !== undefined && planetsData.length === planets.length ? (
                <CreateScene
                    isRealTime={isRealTime}
                    planetsData={planetsData}
                    startDate={start}
                    endDate={end}
                    fetchData={fetchData}
                />
            ) : (
                <>
                    <div>Loading</div>
                </>
            )}
        </>
    );
};
