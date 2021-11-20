import { AdvancedDynamicTexture, StackPanel, Button, TextBlock, Control } from '@babylonjs/gui';
import { Scene, Mesh } from '@babylonjs/core';
import { VisualisationData } from '../../types/planetInterfaces';
import { FetchData, VisualisationOptions } from '../../types/period';
import Info from './InfoPanel';
import { Timer } from '../SolarSystem/Timer';
import { Clock } from './Clock';
import Label from './Label';


export class UserPanel {
    public timer: Timer;
    public clock: Clock;
    private text: TextBlock;
    private back: Button;
    private labelsButton: Button;
    private info: Info;
    private labels: Label[] = [];

    constructor(
        scene: Scene,
        visualisationData: VisualisationData[],
        visualisationOptions: VisualisationOptions,
        fetchData: FetchData,
        text: string,
        info: Info,
        planet?: Mesh
    ) {
        const userPanel = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const stackPanel = this.initStackPanel();
        const buttonsPanel = this.initButtonsStackPanel();
        const infoPanel = this.initInfoStackPanel();
        this.info = info;
        userPanel.addControl(stackPanel);
        userPanel.addControl(buttonsPanel);
        userPanel.addControl(infoPanel);
        buttonsPanel.addControl(this.goBackButton());
        buttonsPanel.addControl(this.showPlanetsLabel());
        buttonsPanel.addControl(info.info);
        buttonsPanel.addControl(this.closeInfo());
        infoPanel.addControl(info.infoText);
        stackPanel.addControl(this.visualisationText(text));
        this.clock = new Clock(visualisationOptions, fetchData.timerSpeed);
        stackPanel.addControl(this.clock.getClock());
        this.updateClock = this.updateClock.bind(this);
        this.generateLabels(visualisationData, planet);
        this.timer = new Timer(scene, visualisationData, fetchData, visualisationOptions, this.clock.onUpdate);
    }

    private visualisationText = (text: string) => {
        const infoText: TextBlock = new TextBlock();
        infoText.resizeToFit = true;
        infoText.width = '200px';
        infoText.height = '40px';
        infoText.text = text;
        infoText.name = 'mode';
        infoText.fontSize = '36px';
        infoText.color = 'white';
        infoText.paddingBottom = '30px';
        infoText.fontFamily = 'Arial';
        this.text = infoText;
        return infoText;
    }

    private initStackPanel = () => {
        const stackPanel = new StackPanel();
        stackPanel.height = '100%';
        stackPanel.width = '50%';
        stackPanel.top = '30px';

        return stackPanel;
    };

    private initInfoStackPanel = () => {
        const stackPanel = new StackPanel();
        stackPanel.height = '100%';
        stackPanel.width = '100%'
        stackPanel.top = '100px'
        stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        return stackPanel;
    }

    private initButtonsStackPanel = () => {
        const stackPanel = new StackPanel();
        stackPanel.height = '100px';
        stackPanel.paddingRight = '50px'
        stackPanel.isVertical = false;
        stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        return stackPanel;
    };

    private goBackButton = () => {
        const backButton = Button.CreateSimpleButton('back', 'Back');
        backButton.width = '130px';
        backButton.height = '40px';
        backButton.color = 'white';
        backButton.cornerRadius = 5;
        backButton.background = '#A6808C';

        backButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        backButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        backButton.paddingRight = '10px'

        backButton.onPointerUpObservable.add(() => {
            window.location.replace('http://localhost:3000/');
        });
        this.back = backButton;
        return backButton;
    };

    private showPlanetsLabel = () => {
        const labelsButton = Button.CreateSimpleButton('labels', 'Show labels');
        labelsButton.width = '130px';
        labelsButton.height = '40px';
        labelsButton.color = 'white';
        labelsButton.cornerRadius = 5;
        labelsButton.background = '#A6808C';
        labelsButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        labelsButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        labelsButton.paddingRight = '10px'
        labelsButton.onPointerUpObservable.add(() => {
            this.labels.forEach((label: Label) => {
                label.changeVisibility();
            })
        });
        this.labelsButton = labelsButton;

        return labelsButton;
    };

    private closeInfo = () => {
        const close = Button.CreateSimpleButton('close', 'x');
        close.width = '50px';
        close.height = '40px';
        close.color = 'white';
        close.cornerRadius = 5;
        close.background = '#A6808C';
        close.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        close.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        close.paddingLeft = '10px'
        close.onPointerUpObservable.add(() => {
            this.text.isVisible = !this.text.isVisible;
            this.back.isVisible = !this.back.isVisible;
            this.clock.setVisibility();
            this.info.setVisibility();
            this.labelsButton.isVisible = !this.labelsButton.isVisible;
            this.labels.forEach((label: Label) => {
                label.setVisibility(false);
            })
        });

        return close;
    }

    public generateLabels = (data: VisualisationData[], planet?: Mesh) => {
        for (const el of data) {
            const planetName = el.planet.name;
            const label = new Label(planetName, el.planet)
            this.labels.push(label);
        }

        if (planet) {
            const label = new Label(planet.name, planet)
            this.labels.push(label);
        }
    }

    updateClock(): void {
        this.clock.onUpdate();
    }
}
