import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlanetData } from '../../types/planetInterfaces';
import CreateScene from './CreateScene';
import rescaleData from '../../utils/rescaleData';
import findFetchPeriod from '../../utils/findFetchPeriod';
import { FetchData, VisualisationOptions } from '../../types/period';
import UserOptions from '../../types/userOptions';

const planets = ['Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus'];

export const InitSceneData = () => {
    const { defineStartingPeriod, findFetchParameters } = findFetchPeriod();
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const [visualisationOptions, setVisualisationOptions] = useState<VisualisationOptions>();
    const options: UserOptions = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);

    // TODO: remove it from state, fix redux.
    const [fetchData] = useState<FetchData>(findFetchParameters(options.mode));
    const { start, end } = defineStartingPeriod(fetchData.period, options.startDate);

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
        const visualisation: VisualisationOptions = {
            start: start,
            end: options.endDate,
            currentEnd: end,
            mode: options.mode
        }
        getPlanetOrbite(planets, fetchData.step);
        setVisualisationOptions(visualisation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO: It forces another 2 renders at first reload.
    // useEffect(() => {
    //     console.log(options);
    //     getPlanetOrbite(planets, '1m');
    // }, [options])

    return (
        <>
            {planetsData !== undefined && planetsData.length === planets.length && visualisationOptions !== undefined? (
                <CreateScene
                    planetsData={planetsData}
                    visualisationOptions={visualisationOptions}
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
