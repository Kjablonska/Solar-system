import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { PlanetData } from '../../types/planetInterfaces';
import CreateScene from './CreateScene';
import rescaleData from "../../utils/rescaleData";
import findFetchPeriod from "../../utils/findFetchPeriod";

export const InitSceneData = () => {
    const { defineStartingPeriod } = findFetchPeriod();
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const planets = ['Venus', 'Earth'];
    const options = useSelector((state: RootStateOrAny) => state.selectedOptions.userOptions);
    console.log("scene", options.startDate);
    const isRealTime: boolean = options.isRealTime;
    const visualisationSpeed = options.delay;
    const {start, end} = defineStartingPeriod(options.startDate, options.endDate);

    async function getPlanetOrbite(planets: string[], step: string) {
        const response = await fetch(
            `http://localhost:5000/getObjectsJPLData?name=${planets}&start=${start}&end=${end}&step=${step}`,
        );
        const data = await response.json();
        console.log(data);
        for (const key in data) {
            const newPlanetData: PlanetData = { planet: key, position: rescaleData(data[key]) };
            console.log(newPlanetData);
            setPlanetsData((data) => [...data, newPlanetData]);
        }
    }

    useEffect(() => {
        getPlanetOrbite(planets, '1m');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('index', planetsData);
    console.log(planetsData.length === planets.length);
    return (
        <>
            {planetsData !== undefined && planetsData.length === planets.length ? (
                <CreateScene isRealTime={isRealTime} planetsData={planetsData} startDate={start} endDate={end} speed={visualisationSpeed}/>
            ) : (
                <>
                    <div>Loading</div>
                </>
            )}
        </>
    );
};
