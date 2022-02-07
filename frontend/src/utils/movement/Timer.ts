import { Scene, AdvancedTimer, Mesh } from '@babylonjs/core';
import { FetchData, VisualisationOptions } from '../../types/period';
import { VisualisationData } from '../../types/planetInterfaces';
import setMovementTimer from './setMovementTimer';
import { MovePlanets } from './MovePlanets';

export class Timer {
    private scene: Scene;
    private visualisationData: VisualisationData[];
    private fetchData: FetchData;
    public timer: AdvancedTimer;
    private planetsMovement: MovePlanets;
    private updateClock: () => void;
    private stopClock: () => void;

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
        this.setUpTimer();
        this.timer.start(this.fetchData.timerSpeed);
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
    };

    constructor(
        scene: Scene,
        visualisationData: VisualisationData[],
        fetchData: FetchData,
        visualisationOptions: VisualisationOptions,
        updateClock: () => void,
        stopClock: () => void,
        planet?: Mesh,
    ) {
        this.fetchData = fetchData;
        this.scene = scene;
        this.visualisationData = visualisationData;
        this.planetsMovement = new MovePlanets(
            visualisationData,
            visualisationOptions,
            fetchData,
            scene,
            stopClock,
            planet,
        );

        this.updateClock = updateClock;
        this.stopClock = stopClock;
        this.setUpTimer();
    }
}
