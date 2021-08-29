import { Scene, AdvancedTimer } from '@babylonjs/core';
import { VisualisationData } from '../../types/planetInterfaces';
import setMovementTimer from '../../utils/setMovementTimer';
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

    speedUp = () => {
        this.timer.stop();
        this.timer.dispose();
        this.speed /= 2;
        this.movement *= 2;
        this.planetsMovement.changeSpeed(this.movement);
        this.timer = setMovementTimer({
            scene: this.scene,
            planetsMovement: this.planetsMovement,
            speed: this.speed,
            movement: this.movement,
            updateClock: this.updateClock,
        });
        this.timer.start(this.speed);
    }

    start = () => {
        this.timer.start(INIT_SPEED);
    }

    stop = () => {
        this.timer.stop();
        this.timer.dispose();
        this.updateTimer(this.visualisationData);
    }

    updateTimer = (data: VisualisationData[]) => {
        this.timer.stop();
        this.timer.dispose();
        this.visualisationData = data;
        this.timer = setMovementTimer({
            scene: this.scene,
            planetsMovement: this.planetsMovement,
            speed: this.speed,
            movement: this.movement,
            updateClock: this.updateClock,
        });
        this.timer.start(INIT_SPEED)
    }

    constructor(
        planetsMovement: MovePlanets,
        scene: Scene,
        visualisationData: VisualisationData[],
        updateClock: () => void,
    ) {
        this.speed = INIT_SPEED;
        this.movement = INIT_MOVEMENT;
        this.scene = scene;
        this.visualisationData = visualisationData;
        this.timer = setMovementTimer({
            scene: scene,
            planetsMovement: planetsMovement,
            speed: this.speed,
            movement: this.movement,
            updateClock: updateClock,
        });
        this.planetsMovement = planetsMovement;
        this.updateClock = updateClock;
    }
}
