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
    private movePlanet: (arg1: VisualisationData[], arg2: number) => void;
    private visualisationData: VisualisationData[];
    private scene: Scene;
    private updateClock: any;

    speedUp = () => {
        this.timer.stop();
        this.timer.dispose();
        this.speed /= 2;
        this.movement *= 2;
        console.log(this.movePlanet);
        this.planetsMovement.changeSpeed(this.movement);
        this.timer = setMovementTimer({
            scene: this.scene,
            planetsMovement: this.planetsMovement,
            movePlanet: this.movePlanet,
            visualisationData: this.visualisationData,
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
            movePlanet: this.movePlanet,
            planetsMovement: this.planetsMovement,
            visualisationData: this.visualisationData,
            speed: this.speed,
            movement: this.movement,
            updateClock: this.updateClock,
        });
        this.timer.start(INIT_SPEED)
    }

    constructor(
        planetsMovement: MovePlanets,
        scene: Scene,
        movePlanet: (arg1: VisualisationData[], arg2: number) => void,
        visualisationData: VisualisationData[],
        updateClock: any,
    ) {
        this.speed = INIT_SPEED;
        this.movement = INIT_MOVEMENT;
        this.scene = scene;
        this.visualisationData = visualisationData;
        this.movePlanet = movePlanet;
        this.timer = setMovementTimer({
            scene: scene,
            movePlanet: movePlanet,
            visualisationData: visualisationData,
            planetsMovement: planetsMovement,
            speed: this.speed,
            movement: this.movement,
            updateClock,
        });
        this.planetsMovement = planetsMovement;
    }
}
