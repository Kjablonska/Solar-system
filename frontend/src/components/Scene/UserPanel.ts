import { AdvancedDynamicTexture, StackPanel, TextBlock, Button } from '@babylonjs/gui';
import { Scene } from '@babylonjs/core';
import { Timer } from './Timer';
import { VisualisationData } from '../../types/planetInterfaces';
import { MovePlanets } from './MovePlanets';

const formatData = (data: number): string => {
    // const dataToString = data.toString();
    // return dataToString.length === 2 ? dataToString : `0${dataToString}`;
    return data.toString();
};

// `${formatData(date.getDay())}-${formatData(date.getMonth())}-${formatData(date.getFullYear())}  ${formatData(date.getHours())}:${formatData(date.getMinutes())}:${formatData(date.getSeconds())}`;

const getTime = (): string => {
    const date = new Date();
    return `${formatData(date.getDay())}-${formatData(date.getMonth())}-${formatData(date.getFullYear())}  ${formatData(
        date.getHours(),
    )}:${formatData(date.getMinutes())}:${formatData(date.getSeconds())}`;
};

export class UserPanel {
    private clock: TextBlock;
    private startDate: string;
    public timer: Timer;

    constructor(scene: Scene, date: string, planetsMovement: MovePlanets, visualisationData: VisualisationData[]) {
        const userPanel = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const stackPanel = this.initStackPanel();
        userPanel.addControl(stackPanel);
        const clockTime = this.initClock();
        this.clock = clockTime;
        stackPanel.addControl(clockTime);
        stackPanel.addControl(this.initSpeedUpButton());
        stackPanel.addControl(this.initSlowDownButton());
        stackPanel.addControl(this.initResetButton());
        this.updateClock = this.updateClock.bind(this)
        this.timer = new Timer(planetsMovement, scene, visualisationData, this.updateClock);
        this.startDate = date;
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

    private initClock = () => {
        const clockTime = new TextBlock();
        clockTime.name = 'clock';
        clockTime.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        clockTime.fontSize = '20px';
        clockTime.color = 'white';
        clockTime.resizeToFit = true;
        clockTime.height = '96px';
        clockTime.width = '220px';
        clockTime.fontFamily = 'Viga';

        return clockTime;
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
        this.clock.text = 'xx';
    }
}
