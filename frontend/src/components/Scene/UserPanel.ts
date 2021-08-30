import { AdvancedDynamicTexture, StackPanel, TextBlock, Button } from '@babylonjs/gui';
import { Scene } from '@babylonjs/core';
import { Timer } from './Timer';
import { VisualisationData } from '../../types/planetInterfaces';
import { MovePlanets } from './MovePlanets';
import { Clock } from './Clock';
import { FetchData } from '../../types/period';


export class UserPanel {
    public timer: Timer;
    public clock: Clock;

    constructor(scene: Scene, clock: Clock, planetsMovement: MovePlanets, visualisationData: VisualisationData[], fetchData: FetchData) {
        const userPanel = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const stackPanel = this.initStackPanel();
        userPanel.addControl(stackPanel);
        this.clock = clock;
        stackPanel.addControl(clock.getClock());
        stackPanel.addControl(this.initSpeedUpButton());
        stackPanel.addControl(this.initSlowDownButton());
        stackPanel.addControl(this.initResetButton());
        this.updateClock = this.updateClock.bind(this)
        this.timer = new Timer(planetsMovement, scene, visualisationData, this.clock.onUpdate, this.clock.updateSpeed, fetchData);
    }

    private initSlowDownButton = () => {
        const slowButton = Button.CreateSimpleButton('slowdown', '<<');
        slowButton.width = '110px';
        slowButton.height = '30px';
        slowButton.color = 'white';
        slowButton.cornerRadius = 20;
        slowButton.background = 'grey';
        slowButton.left = '100px';
        slowButton.onPointerUpObservable.add(() => {
            console.log('slow');
        });

        return slowButton;
    };

    private initStackPanel = () => {
        const stackPanel = new StackPanel();
        stackPanel.width = 0.83;
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '0px';
        stackPanel.verticalAlignment = 0;

        return stackPanel;
    };

    private initSpeedUpButton = () => {
        const speedButton = Button.CreateSimpleButton('speedup', '>>');
        speedButton.width = '110px';
        speedButton.height = '30px';
        speedButton.color = 'white';
        speedButton.cornerRadius = 20;
        speedButton.background = 'grey';
        speedButton.left = '0px';
        speedButton.onPointerUpObservable.add(() => {
            this.timer.speedUp();
            console.log('speed');
        });

        return speedButton;
    };

    private initResetButton = () => {
        const reset = Button.CreateSimpleButton('reset', 'reset');
        reset.width = '110px';
        reset.height = '30px';
        reset.color = 'white';
        reset.cornerRadius = 20;
        reset.background = 'grey';
        reset.left = '0px';
        reset.onPointerUpObservable.add(function () {
            console.log('res');
        });

        return reset;
    };

    updateClock(): void {
        this.clock.onUpdate();
    }

    updateClockSpeed(speed: number): void {
        this.clock.updateSpeed(speed)
    }
}
