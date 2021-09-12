import { DatesPeriod, FetchData, VisualisationOptions } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import { findNewPeriod } from '../../utils/findFetchPeriod';
import getOrbiteData from '../../utils/getOrbiteData';

const INIT_MOVEMENT = 1; // defines number of points to jump over.

export class MovePlanets {
    visualisationData: VisualisationData[];
    visualisationSpeed: number = INIT_MOVEMENT;
    visualisationOptions: VisualisationOptions;
    fetchAll: boolean = false;
    fetchData: FetchData;
    currentPeriod: DatesPeriod;
    onEndDateReached: () => void;

    constructor(
        visualisationData: VisualisationData[],
        visualisationOptions: VisualisationOptions,
        fetchData: FetchData,
        speed: number = INIT_MOVEMENT,
    ) {
        this.visualisationOptions = visualisationOptions;
        this.currentPeriod = {start: visualisationOptions.start, end: visualisationOptions.currentEnd};
        this.visualisationData = visualisationData;
        this.visualisationSpeed = speed || INIT_MOVEMENT;
        this.fetchData = fetchData;
    }

    movePlanet = async () => {
        if (this.visualisationData !== undefined) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data);
                data.orbit.splice(0, this.visualisationSpeed);
                data.iter += this.visualisationSpeed;

                if (this.fetchAll === false && data.iter > data.length / 4) {
                    // TODO: refill all data instead.
                    console.log('DATA ENDED');
                    this.fetchAll = true;
                    await this.onDataEnd()
                    .then(() => {
                        this.fetchAll = false;
                    });
                }
            }
        }
    };

    changeSpeed = (speed: number) => {
        this.visualisationSpeed = speed;
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
            el.length = el.orbit.length + toModify!.length;
            el.orbit = toModify!;
            el.iter = 0;
        }
    };
}
