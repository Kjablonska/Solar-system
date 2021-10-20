import { DatesPeriod, FetchData, VisualisationOptions } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import { findNewPeriod } from '../../utils/findFetchPeriod';
import getOrbiteData from '../../utils/getOrbiteData';
import ErrorHandler from './ErrorHandler';

const INIT_MOVEMENT = 1; // defines number of points to jump over.

export class MovePlanets {
    visualisationData: VisualisationData[];
    visualisationSpeed: number;
    visualisationOptions: VisualisationOptions;
    fetchAll: boolean = false;
    fetchData: FetchData;
    currentPeriod: DatesPeriod;
    onEndDateReached: () => void;
    stop: boolean = false;
    stopFetch: boolean = false;
    errorHandler: ErrorHandler;

    constructor(
        visualisationData: VisualisationData[],
        visualisationOptions: VisualisationOptions,
        fetchData: FetchData,
        speed: number,
    ) {
        this.visualisationOptions = visualisationOptions;
        this.currentPeriod = { start: visualisationOptions.start, end: visualisationOptions.currentEnd };
        this.visualisationData = visualisationData;
        this.visualisationSpeed = speed || INIT_MOVEMENT;
        this.fetchData = fetchData;
        this.errorHandler = new ErrorHandler(this.onDataEnd);
    }

    movePlanet = async () => {
        if (this.visualisationData !== undefined && !this.stop) {
            for (let data of this.visualisationData) {
                data = this.setPosition(data);
                data.orbit.splice(0, this.visualisationSpeed);
                data.iter += this.visualisationSpeed;

                if (!this.stopFetch && !this.fetchAll && data.iter > data.length / 4) {
                    // TODO: refill all data instead.
                    console.log('DATA ENDED');
                    this.fetchAll = true;
                    await this.onDataEnd().then(() => {
                        this.fetchAll = false;
                    });
                }
            }
        }
    };

    changeSpeed = (speed: number) => {
        this.visualisationSpeed = speed;
    };

    stopVisualisation = () => {
        console.log('visualisation stopped');
        this.stop = true;
    };

    startVisualisation = () => {
        this.stop = false;
    };

    setPosition = (data: VisualisationData): VisualisationData => {
        if (data.orbit.length < 1) this.stopVisualisation();
        else {
            data.planet.position.x = data.orbit[0]._x;
            data.planet.position.y = data.orbit[0]._y;
            data.planet.position.z = data.orbit[0]._z;
        }
        return data;
    };

    onDataEnd = async () => {
        try {
            console.log('DATA ENDED');
            this.currentPeriod = findNewPeriod(this.currentPeriod, this.fetchData.period);
            // TODO: end date
            // if (this.endDate !== undefined && new Date(this.currentPeriod.end) >= new Date(this.endDate)) {
            //     this.onEndDateReached();
            //     return;
            // }

            const newData = await getOrbiteData({
                planet: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                startDate: this.currentPeriod.start,
                endDate: this.currentPeriod.end,
                fill: this.fetchData.refill,
                step: this.fetchData.step,
            });

            for (const el of this.visualisationData) {
                const toModify = newData.get(el.planet.name);
                el.length = el.orbit.length + toModify!.length;
                el.orbit.push(...toModify!);
                el.iter = 0;
            }
            this.startVisualisation();
            this.stopFetch = false;
        } catch (e: any) {
            // this.stopVisualisation();
            console.log('ERROR', e);
            this.stopFetch = true;
            this.errorHandler.openErrorHandler();
        }
    };
}
