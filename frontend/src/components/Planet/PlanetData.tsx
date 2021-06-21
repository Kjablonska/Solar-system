import {useEffect, useState} from "react";
import {PlanetData} from "../../utils/planetInterfaces"

interface PlanetDataProps {
    planets: string[]
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetPlanetData: React.FC<PlanetDataProps> = ({planets}):any => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);

    useEffect(() => {
        async function getPlanetOrbite(planetName: string) {
            const response = await fetch(`http://localhost:5000/getObjectJPLData?name=${planetName}`)
            const orbite = await response.json()
            console.log(planetName, orbite)
            const newPlanetData = {planet: planetName, position: orbite}
            setPlanetsData([...planetsData, newPlanetData])
        }
        
        for (const planetName of planets)
            getPlanetOrbite(planetName)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (planetsData !== undefined && planetsData.length !== 0)
        return planetsData;
}