import DatesPeriod from '../../types/period';
import { PlanetData, VisualisationData } from '../../types/planetInterfaces';
import { defineStartingPeriod, findNewPeriod } from '../../utils/findFetchPeriod';
import getOrbiteData from '../../utils/getOrbiteData';

//TODO: redo onDataEnd()
const INIT_MOVEMENT = 1;

export class MovePlanets {
    isRealTime: boolean;
    currentPeriod: DatesPeriod;
    visualisationData: VisualisationData[];
    speed?: number;
    startDate?: string;
    endDate?: string;

    constructor(
        visualisationData: VisualisationData[],
        isRealTime: boolean,
        speed?: number,
        startDate?: string,
        endDate?: string,
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentPeriod = defineStartingPeriod(startDate, endDate);
        this.isRealTime = isRealTime;
        this.visualisationData = visualisationData;
        this.speed = speed || INIT_MOVEMENT;
    }

    movePlanet = async () => {
        if (this.visualisationData !== undefined) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data);
                const res = data.orbit.splice(0, this.speed);
                data.iter++;
                if (data.iter > data.orbit.length / 3) {
                    data = await this.onDataEnd(data);
                }
            }
        }
    };

    changeSpeed = (speed: number) => {
        this.speed = speed;
        console.log("speed changed" ,this.speed);
    }

    setPosition = (data: VisualisationData): VisualisationData => {
        data.planet.position.x = data.orbit[0].x;
        data.planet.position.y = data.orbit[0].y;
        data.planet.position.z = data.orbit[0].z;
        return data;
    };

    onDataEnd = async (data: VisualisationData) => {
        this.currentPeriod = findNewPeriod(this.currentPeriod);

        const newData: PlanetData = await getOrbiteData({
            planet: data.planet.name,
            startDate: this.currentPeriod.start,
            endDate: this.currentPeriod.end,
        });

        data.orbit.concat(newData.position);
        data.iter = 0;
        return data;
    };
}
