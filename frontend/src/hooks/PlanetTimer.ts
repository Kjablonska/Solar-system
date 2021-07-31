import { Scene, AdvancedTimer } from '@babylonjs/core';

function planetTimer(scene: Scene, movePlanet: any) {
    const advancedTimer: AdvancedTimer<Scene> = new AdvancedTimer({
        timeout: 3000,
        contextObservable: scene.onBeforeRenderObservable,
    });
    advancedTimer.onEachCountObservable.add(() => {});

    advancedTimer.onTimerAbortedObservable.add(() => {
        console.log('abprted');
    });
    advancedTimer.onTimerEndedObservable.add(() => {
        console.log('timer advanced', new Date());
        movePlanet();
        advancedTimer.start(1000);
    });

    console.log(advancedTimer);
    return advancedTimer;
}

export default planetTimer;
