interface RealTimeDataProps {
    planet: string;
    startTime: string;
    endTime: string;
}

async function RealTimeData({ planet, startTime, endTime }: RealTimeDataProps) {
    async function getPlanetOrbiteRealTime(planetName: string) {
        const response = await fetch(
            `http://localhost:5000/getObjectJPLRealTimeData?name=${planet}&start=${startTime}&end=${endTime}`,
        );
        const orbite = await response.json();
        const newPlanetData = { planet: planetName, position: orbite };
        return newPlanetData;
    }

    return await getPlanetOrbiteRealTime(planet);
}

export default RealTimeData;
