import { useEffect, useState} from "react";
import {PlanetData} from '../../utils/planetInterfaces'
import RealTimeData from "./RealTimeData"
import CreateScene from './SceneData'

const fetchPeriod = 10;  // in days.

export const InitSceneData = () => {
    const getStartDate = () => {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    const getEndDate = () => {
        const newEnd = new Date(start);
        newEnd.setDate(newEnd.getDate() + fetchPeriod);
        return `${newEnd.getFullYear()}-${newEnd.getMonth() + 1}-${newEnd.getDate()}`;
    }

    const [planetsData, setPlanetsData] = useState<PlanetData[]>([]);
    const planets = ["Venus", "Earth"]
    let start:string = getStartDate();
    let end:string = getEndDate();
    let realTime:boolean = true;


    async function getPlanetOrbite(planets: string[], step: string) {
        const response = await fetch(`http://localhost:5000/getObjectsJPLData?name=${planets}&start=${start}&end=${end}&step=${step}`)
        const data = await response.json()

        for (const key in data) {
            const newPlanetData = {planet: key, position: data[key]}
            setPlanetsData(data => [...data, newPlanetData])
        }
       
    }


    useEffect(() => {
        if (!realTime)
            getPlanetOrbite(planets, "1MO")
        else
            getPlanetOrbite(planets, "1m")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    console.log(planetsData.length === planets.length)
    return (
        <>
        {
            planetsData !== undefined && planetsData.length === planets.length ?
            <CreateScene realTimeData={RealTimeData} realTime={realTime} planetsData={planetsData} startDate={start} endDate={end}/>
            :
            <>
                <div>
                    Loading c:
                </div>
            </>
        }
        </>
    )
}