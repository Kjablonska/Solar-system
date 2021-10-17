import { Scene, AdvancedTimer } from '@babylonjs/core';
import { MovePlanets } from '../components/Scene/MovePlanets';

interface MovementTimer {
    scene: Scene;
    planetsMovement: MovePlanets;
    speed: number;
    updateClock: () => void;
}

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
    });

    advancedTimer.onTimerAbortedObservable.add(() => {});

    advancedTimer.onTimerEndedObservable.add(() => {
        // console.log(speed)
        planetsMovement.movePlanet();
        updateClock();
        advancedTimer.start(speed);
    });

    return advancedTimer;
}
