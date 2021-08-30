import { Curve3 } from '@babylonjs/core';
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
    speed: number = 1;
    startDate?: string;
    endDate?: string;
    fetchMarker: Map<string, boolean> = new Map();
    fetchAll: boolean = false;

    constructor(
        visualisationData: VisualisationData[],
        isRealTime: boolean,
        startDate?: string,
        endDate?: string,
        speed: number = INIT_MOVEMENT,
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.currentPeriod = defineStartingPeriod(startDate, endDate);
        this.isRealTime = isRealTime;
        this.visualisationData = visualisationData;
        this.speed = speed || INIT_MOVEMENT;

        visualisationData.forEach((data) => {
            this.fetchMarker.set(data.planet.name, false);
        });
    }

    movePlanet = async () => {
        if (this.visualisationData !== undefined) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data);
                data.orbit.splice(0, this.speed);
                data.iter += this.speed;
                console.log('len', this.speed, data.iter, data.length, data.iter > data.length / 4, this.fetchMarker.get(data.planet.name) === false);

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
        this.currentPeriod = findNewPeriod(this.currentPeriod);

        const newData = await getOrbiteData({
            planet: ['Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus'],
            startDate: this.currentPeriod.start,
            endDate: this.currentPeriod.end,
            speed: this.speed,
        });

        for (const el of this.visualisationData) {
            const toModify = newData.get(el.planet.name);
            el.orbit = toModify!;
            el.length = el.length + toModify!.length;
            el.iter = 0
        }
    };
}
