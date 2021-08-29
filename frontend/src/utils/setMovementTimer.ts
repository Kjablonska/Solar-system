import { Scene, AdvancedTimer } from '@babylonjs/core';
import { MovePlanets } from '../components/Scene/MovePlanets';

interface MovementTimer {
    scene: Scene;
    planetsMovement: MovePlanets;
    speed: number;
    updateClock: () => void;
}

const formatData = (data: number): string => {
    const dataToString = data.toString();
    return dataToString.length === 2 ? dataToString : `0${dataToString}`;
};

// const setTime = () => {
//     return `${formatData(date.getHours())}-${formatData(date.getMinutes())}-${formatData(date.getSeconds())}`;
// };

// TODO: update clock.

export default function setMovementTimer({
    scene,
    planetsMovement,
    speed,
    updateClock,
}: MovementTimer) {
    const advancedTimer: AdvancedTimer<Scene> = new AdvancedTimer({
        timeout: 3000,
        contextObservable: scene.onBeforeRenderObservable,
    });
    advancedTimer.onEachCountObservable.add(() => {
        planetsMovement.movePlanet();
        updateClock();
    });

    advancedTimer.onTimerAbortedObservable.add(() => {});

    advancedTimer.onTimerEndedObservable.add(() => {
        advancedTimer.start(speed);
    });

    return advancedTimer;
}
