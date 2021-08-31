import { Scene, AdvancedTimer } from '@babylonjs/core';
import { FetchData, VisualisationOptions } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import setMovementTimer from '../../utils/setMovementTimer';
import { MovePlanets } from './MovePlanets';

const INIT_SPEED = 1000;
const INIT_MOVEMENT = 1;

export class Timer {
    private scene: Scene;
    private visualisationData: VisualisationData[];
    private fetchData: FetchData;

    public timer: AdvancedTimer;
    private planetsMovement: MovePlanets;
    private visualisationSpeed = INIT_MOVEMENT;
    private updateClock: () => void;
    private updateClockSpeed: (arg: number) => void;

    speedUp = () => {
        this.timer.stop();
        this.visualisationSpeed *= 2;
        this.planetsMovement.changeSpeed(this.visualisationSpeed);
        this.updateClockSpeed(this.visualisationSpeed);
        this.setUpTimer();
        this.timer.start(this.fetchData.timerSpeed);
    };

    start = () => {
        this.timer.start(this.fetchData.timerSpeed);
    };

    stop = () => {
        this.timer.stop();
        this.timer.dispose();
        this.updateTimer(this.visualisationData);
    };

    updateTimer = (data: VisualisationData[], fetchData?: FetchData) => {
        this.timer.stop();
        this.timer.dispose();
        this.visualisationData = data;
        if (fetchData !== undefined) {
            this.fetchData = fetchData;
        }
        this.visualisationSpeed = INIT_MOVEMENT;
        this.setUpTimer();
        this.timer.start(INIT_SPEED);
    };

    setUpTimer = () => {
        this.timer = setMovementTimer({
            scene: this.scene,
            planetsMovement: this.planetsMovement,
            speed: this.fetchData.timerSpeed,
            updateClock: this.updateClock,
        });
    };

    onEndDateReached = () => {
        this.timer.stop();
        this.timer.dispose();
    }

    constructor(
        scene: Scene,
        visualisationData: VisualisationData[],
        fetchData: FetchData,
        visualisationOptions: VisualisationOptions,
        updateClock: () => void,
        updateClockSpeed: (arg: number) => void,
    ) {
        this.fetchData = fetchData;
        this.scene = scene;
        this.visualisationData = visualisationData;
        this.planetsMovement = new MovePlanets(visualisationData, visualisationOptions, fetchData, this.visualisationSpeed);
        this.planetsMovement.onEndDateReached = this.onEndDateReached;
        this.updateClock = updateClock;
        this.updateClockSpeed = updateClockSpeed;
        this.setUpTimer();
    }
}
