import { Scene, AdvancedTimer } from '@babylonjs/core';
import { PlanetData, VisualisationData } from "../types/planetInterfaces";

interface MovementTimer {
    scene: Scene;
    movePlanet(arg1: VisualisationData[], arg2: PlanetData[]): void;
    visualisationData: VisualisationData[];
    planetsData: PlanetData[];
    speed: number
}

export default function setMovementTimer({scene, movePlanet, visualisationData, planetsData, speed}: MovementTimer) {
    console.log("speed", speed);
    const advancedTimer: AdvancedTimer<Scene> = new AdvancedTimer({
        timeout: 3000,
        contextObservable: scene.onBeforeRenderObservable,
    });
    advancedTimer.onEachCountObservable.add(() => {});

    advancedTimer.onTimerAbortedObservable.add(() => {});

    advancedTimer.onTimerEndedObservable.add(() => {
        console.log('timer advanced', new Date());
        movePlanet(visualisationData, planetsData);
        advancedTimer.start(speed);
    });

    return advancedTimer;
}
