import { Scene, AdvancedTimer } from '@babylonjs/core';
import { FetchData } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import setMovementTimer from '../../utils/setMovementTimer';
import { Clock } from './Clock';
import { MovePlanets } from './MovePlanets';

const INIT_SPEED = 1000;
const INIT_MOVEMENT = 1;

export class Timer {
    public timer: AdvancedTimer;
    private planetsMovement: MovePlanets;
    private speed: number;
    private movement: number;
    private visualisationData: VisualisationData[];
    private scene: Scene;
    private updateClock: () => void;
    private fetchData: FetchData;
    private updateClockSpeed: (arg: number) => void;

    speedUp = () => {
        this.timer.stop();
        // this.timer.dispose();
        // this.speed /= 2;
        this.movement *= 2;
        this.planetsMovement.changeSpeed(this.movement);
        this.updateClockSpeed(this.movement);
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

    updateTimer = (data: VisualisationData[]) => {
        this.timer.stop();
        this.timer.dispose();
        this.visualisationData = data;
        this.speed = INIT_SPEED;
        this.movement = INIT_MOVEMENT;
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
        planetsMovement: MovePlanets,
        scene: Scene,
        visualisationData: VisualisationData[],
        updateClock: () => void,
        updateClockSpeed: (arg: number) => void,
        fetchData: FetchData,
    ) {
        this.speed = INIT_SPEED;
        this.movement = INIT_MOVEMENT;
        this.fetchData = fetchData;
        this.scene = scene;
        this.visualisationData = visualisationData;
        this.planetsMovement = planetsMovement;
        this.planetsMovement.onEndDateReached = this.onEndDateReached;
        this.updateClock = updateClock;
        this.updateClockSpeed = updateClockSpeed;
        this.setUpTimer();
    }
}
