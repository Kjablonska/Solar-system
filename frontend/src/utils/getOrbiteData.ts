import { PlanetData } from '../types/planetInterfaces';
import rescaleData from "./rescaleData";

interface OribtDataProps {
    planet: string;
    startDate: string;
    endDate: string;
}


export default async function getData({ planet, startDate, endDate }: OribtDataProps): Promise<PlanetData> {
    async function getPlanetOrbiteData(planetName: string) {
        const response = await fetch(
            `http://localhost:5000/getObjectJPLData?name=${planet}&start=${startDate}&end=${endDate}`,
        );
        const orbite = await response.json().then(res => rescaleData(res));
        const newPlanetData = { planet: planetName, position: orbite};
        return newPlanetData;
    }

    return getPlanetOrbiteData(planet);
}
