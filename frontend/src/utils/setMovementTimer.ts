import * as GUI from '@babylonjs/gui';
import { Scene, AdvancedTimer } from '@babylonjs/core';
import { PlanetData, VisualisationData } from '../types/planetInterfaces';
import { UserPanel } from '../components/Scene/UserPanel';
import { MovePlanets } from '../components/Scene/MovePlanets';

interface MovementTimer {
    scene: Scene;
    planetsMovement: MovePlanets;
    movePlanet(arg1: VisualisationData[], arg2: number): void;
    visualisationData: VisualisationData[];
    speed: number;
    movement: number;
    updateClock: any;
}

const formatData = (data: number): string => {
    const dataToString = data.toString();
    return dataToString.length === 2 ? dataToString : `0${dataToString}`;
};

const setTime = () => {
    const date = new Date();
    return `${formatData(date.getHours())}-${formatData(date.getMinutes())}-${formatData(date.getSeconds())}`;
};

export default function setMovementTimer({
    scene,
    planetsMovement,
    movePlanet,
    visualisationData,
    speed,
    movement,
    updateClock,
}: MovementTimer) {
    console.log('movement', movement, speed);
    const advancedTimer: AdvancedTimer<Scene> = new AdvancedTimer({
        timeout: 3000,
        contextObservable: scene.onBeforeRenderObservable,
    });
    advancedTimer.onEachCountObservable.add(() => {
        console.log(movePlanet);
        // movePlanet(visualisationData, movement);
        planetsMovement.movePlanet();
        // updateClock();
    });

    advancedTimer.onTimerAbortedObservable.add(() => {});

    advancedTimer.onTimerEndedObservable.add(() => {
        // movePlanet(visualisationData, movement);
        advancedTimer.start(speed);
    });

    return advancedTimer;
}
