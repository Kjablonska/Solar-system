import {CreateScene} from './components/Scene/SceneData'
import { GetPlanetData } from "./components/Planet/PlanetData";
import "./App.css";
import { useEffect, useState } from "react";

interface PlanetDataProps {
    planets: string[]
}

interface PositionProps {
    x: number[],
    y: number[],
    z: number[]
}

interface PlanetData {
    planet: string,
    position: PositionProps
}

const App = () => {
    // Change this
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);

    useEffect(() => {
        const planets = ["Earth"]
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


    useEffect(() =>{
    }, [planetsData])

    return (
        <>
        {
            planetsData !== undefined && planetsData.length !== 0 ?
            <CreateScene/>
            :
            <></>
        }
        </>
    )

}

export default App;