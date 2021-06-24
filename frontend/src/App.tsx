import {CreateScene} from './components/Scene/SceneData'
import  {PlanetData} from './utils/planetInterfaces'
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
    // Change this
    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const planets = ["Venus", "Earth", "Mars", "Jupiter"]

    useEffect(() => {
        async function getPlanetOrbite(planetName: string) {
            const response = await fetch(`http://localhost:5000/getObjectJPLData?name=${planetName}`)
            const orbite = await response.json()
            console.log(planetName, orbite)
            const newPlanetData = {planet: planetName, position: orbite}
            setPlanetsData(data => [...data, newPlanetData])
        }
        
        for (const planetName of planets) {
            console.log(planetName)
            getPlanetOrbite(planetName)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() =>{
        console.log("app", planetsData)
    }, [planetsData])

    console.log(planetsData.length === planets.length)
    return (
        <>
        {
            planetsData !== undefined && planetsData.length === planets.length ?
            <CreateScene planetsData={planetsData}/>
            :
            <></>
        }
        </>
    )

}

export default App;