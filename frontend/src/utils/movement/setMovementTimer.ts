import { Scene, AdvancedTimer } from '@babylonjs/core';
import { MovePlanets } from './MovePlanets';

interface MovementTimer {
    scene: Scene;
    planetsMovement: MovePlanets;
    speed: number;
    updateClock: () => void;
}

export default function setMovementTimer({ scene, planetsMovement, speed, updateClock }: MovementTimer) {
    const advancedTimer: AdvancedTimer<Scene> = new AdvancedTimer({
        timeout: 3000,
        contextObservable: scene.onBeforeRenderObservable,
    });
    advancedTimer.onEachCountObservable.add(() => {});

    advancedTimer.onTimerAbortedObservable.add(() => {});

    advancedTimer.onTimerEndedObservable.add(() => {
        planetsMovement.movePlanet();
        updateClock();
        advancedTimer.start(speed);
    });

    return advancedTimer;
}
