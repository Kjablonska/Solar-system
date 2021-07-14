async function RealTimeData(planet:string, start:string, end:string) {
    console.log("real time data", planet, start, end)
    async function getPlanetOrbiteRealTime(planetName: string) {
        const response = await fetch(`http://localhost:5000/getObjectJPLRealTimeData?name=${planet}&start=${start}&end=${end}`)
        const orbite = await response.json()
        const newPlanetData = {planet: planetName, position: orbite};
        return newPlanetData;
    }

    return await getPlanetOrbiteRealTime(planet);
}

export default RealTimeData