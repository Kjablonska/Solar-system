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
    private planetsMovement: MovePlanets;

    // TODO
    public updateClock(): void {
        this.clock.text = this.startDate;
    }

    constructor(
        scene: Scene,
        date: string,
        planetsMovement: MovePlanets,
        movePlanet: (arg1: VisualisationData[], arg2: number) => void,
        visualisationData: VisualisationData[],
    ) {
        this.startDate = date;
        this.planetsMovement = planetsMovement;
        const stackPanel = new StackPanel();
        stackPanel.width = 0.83;
        const userPanel = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '0px';
        stackPanel.verticalAlignment = 0;
        userPanel.addControl(stackPanel);

        const clockTime = new TextBlock();
        clockTime.name = 'clock';
        clockTime.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        clockTime.fontSize = '20px';
        clockTime.color = 'white';
        clockTime.resizeToFit = true;
        clockTime.height = '96px';
        clockTime.width = '220px';
        clockTime.fontFamily = 'Viga';
        stackPanel.addControl(clockTime);
        this.clock = clockTime;

        this.timer = new Timer(planetsMovement, scene, movePlanet, visualisationData, () => (this.clock.text = date));
        const speedButton = Button.CreateSimpleButton('speedup', '>>');
        const slowButton = Button.CreateSimpleButton('slowdown', '<<');
        const reset = Button.CreateSimpleButton('reset', 'reset');
        stackPanel.addControl(speedButton);
        stackPanel.addControl(slowButton);
        stackPanel.addControl(reset);

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

        slowButton.width = '110px';
        slowButton.height = '30px';
        slowButton.color = 'white';
        slowButton.cornerRadius = 20;
        slowButton.background = 'grey';
        speedButton.left = '100px';
        slowButton.onPointerUpObservable.add(() => {
            console.log('slow');
        });

        reset.width = '110px';
        reset.height = '30px';
        reset.color = 'white';
        reset.cornerRadius = 20;
        reset.background = 'grey';
        reset.left = '0px';
        reset.onPointerUpObservable.add(function () {
            console.log('res');
        });
    }
}
