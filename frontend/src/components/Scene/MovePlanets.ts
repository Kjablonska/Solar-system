import { DatesPeriod, FetchData } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import { defineStartingPeriod, findNewPeriod } from '../../utils/findFetchPeriod';
import getOrbiteData from '../../utils/getOrbiteData';

//TODO: redo onDataEnd()
const INIT_MOVEMENT = 1;

export class MovePlanets {
    isRealTime: boolean;
    currentPeriod: DatesPeriod;
    visualisationData: VisualisationData[];
    speed: number = 1;
    startDate?: string;
    endDate?: string;
    fetchAll: boolean = false;
    fetchData: FetchData;
    onEndDateReached: () => void;

    constructor(
        visualisationData: VisualisationData[],
        isRealTime: boolean,
        fetchData: FetchData,
        startDate: string,
        endDate: string,
        speed: number = INIT_MOVEMENT,
    ) {
        this.fetchData = fetchData;
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentPeriod = {start: startDate, end: endDate};
        this.isRealTime = isRealTime;
        this.visualisationData = visualisationData;
        this.speed = speed || INIT_MOVEMENT;
    }

    movePlanet = async () => {
        if (this.visualisationData !== undefined) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data);
                data.orbit.splice(0, this.speed);
                data.iter += this.speed;

                if (this.fetchAll === false && data.iter > data.length / 4) {
                    // TODO: refill all data instead.
                    console.log('DATA ENDED');
                    this.fetchAll = true;
                    await this.onDataEnd()
                    .then(() => {
                        this.fetchAll = true;
                    });
                }
            }
        }
    };

    changeSpeed = (speed: number) => {
        this.speed = speed;
    };

    setPosition = (data: VisualisationData): VisualisationData => {
        data.planet.position.x = data.orbit[0].x;
        data.planet.position.y = data.orbit[0].y;
        data.planet.position.z = data.orbit[0].z;
        return data;
    };

    onDataEnd = async () => {
        console.log('DATA ENDED');
        this.currentPeriod = findNewPeriod(this.currentPeriod, this.fetchData.period);

        // if (this.endDate !== undefined && new Date(this.currentPeriod.end) >= new Date(this.endDate)) {
        //     this.onEndDateReached();
        //     return;
        // }

        const newData = await getOrbiteData({
            planet: ['Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus'],
            startDate: this.currentPeriod.start,
            endDate: this.currentPeriod.end,
            fill: this.fetchData.refill,
            step: this.fetchData.step,
        });

        for (const el of this.visualisationData) {
            const toModify = newData.get(el.planet.name);
            el.orbit = toModify!;
            el.length = el.length + toModify!.length;
            el.iter = 0;
        }
    };
}
