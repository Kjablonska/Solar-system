import { AdvancedDynamicTexture, StackPanel, Button } from '@babylonjs/gui';
import { Scene } from '@babylonjs/core';
import { Timer } from './Timer';
import { VisualisationData } from '../../types/planetInterfaces';
import { Clock } from './Clock';
import { FetchData, VisualisationOptions } from '../../types/period';

export class UserPanel {
    public timer: Timer;
    public clock: Clock;

    constructor(
        scene: Scene,
        visualisationData: VisualisationData[],
        visualisationOptions: VisualisationOptions,
        fetchData: FetchData,
    ) {
        const userPanel = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const stackPanel = this.initStackPanel();
        userPanel.addControl(stackPanel);
        stackPanel.addControl(this.goBackButton());
        this.clock = new Clock(visualisationOptions, fetchData.timerSpeed);
        stackPanel.addControl(this.clock.getClock());
        this.updateClock = this.updateClock.bind(this);
        console.log('ui', visualisationData, fetchData, visualisationOptions);
        this.timer = new Timer(scene, visualisationData, fetchData, visualisationOptions, this.clock.onUpdate);
    }

    private initStackPanel = () => {
        const stackPanel = new StackPanel();
        stackPanel.width = 0.83;
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '0px';
        stackPanel.verticalAlignment = 0;

        return stackPanel;
    };

    private goBackButton = () => {
        const backButton = Button.CreateSimpleButton('back', 'Go back');
        backButton.width = '110px';
        backButton.height = '30px';
        backButton.color = 'white';
        backButton.cornerRadius = 20;
        backButton.background = 'grey';
        backButton.left = '0px';
        backButton.onPointerUpObservable.add(() => {
            window.location.replace('http://localhost:3000/');
        });

        return backButton;
    };

    updateClock(): void {
        this.clock.onUpdate();
    }
}
