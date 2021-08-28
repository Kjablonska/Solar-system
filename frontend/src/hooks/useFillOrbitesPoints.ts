import { useState } from 'react';
import getOrbiteData from '../utils/getOrbiteData';
import { PlanetData, VisualisationData } from '../types/planetInterfaces';
import findFetchPeriod from '../utils/findFetchPeriod';

// TODO: isRealTime.

interface OrbitesDataProps {
    isRealTime: boolean;
    startDate?: string;
    endDate?: string;
}

export default function useFillOrbitesData({ isRealTime, startDate, endDate }: OrbitesDataProps) {
    const { findNewPeriod, defineStartingPeriod } = findFetchPeriod();
    const [currentPeriod, setCurrentPeriod] = useState<{ start: string; end: string }>(
        defineStartingPeriod(startDate, endDate),
    );

    const movePlanet = async (visualisationData: VisualisationData[], speed: number) => {
        if (visualisationData !== undefined) {
            for (let data of visualisationData) {
                data = setPosition(data);
                const res = data.orbit.splice(0, speed);
                console.log(res.length, data.orbit.length);
                data.iter++;
                if (data.iter > data.orbit.length / 3) {
                    data = await onDataEnd(data);
                }
            }
        }
    };

    const setPosition = (data: VisualisationData): VisualisationData => {
        data.planet.position.x = data.orbit[0].x;
        data.planet.position.y = data.orbit[0].y;
        data.planet.position.z = data.orbit[0].z;
        return data;
    };

    const onDataEnd = async (data: VisualisationData) => {
        setCurrentPeriod(findNewPeriod(currentPeriod));
        console.log(startDate);
        console.log(endDate);

        const newData: PlanetData = await getOrbiteData({
            planet: data.planet.name,
            startDate: currentPeriod.start,
            endDate: currentPeriod.end,
        });

        data.orbit.concat(newData.position);
        data.iter = 0;
        return data;
    };

    return { movePlanet } as const;
}
