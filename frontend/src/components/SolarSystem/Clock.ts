import { TextBlock } from '@babylonjs/gui';
import { VisualisationOptions } from '../../types/period';

const INIT_TIMER_SPEED = 1000; // in ms

export class Clock {
    private startDate: Date;
    private endDate?: Date;
    private timerSpeed: number;
    private clock: TextBlock;

    constructor(visualisationOptions: VisualisationOptions, speed?: number) {
        this.initClock();
        this.startDate = new Date(visualisationOptions.start);
        this.endDate = visualisationOptions.end !== undefined ? new Date(visualisationOptions.end) : undefined;
        this.timerSpeed = speed || INIT_TIMER_SPEED;
    }

    public initSpeed = (speed: number) => {
        this.timerSpeed = speed;
    };

    public updateClock = (visualisationOptions: VisualisationOptions, speed?: number) => {
        this.startDate = new Date(visualisationOptions.start);
        this.endDate = visualisationOptions.end !== undefined ? new Date(visualisationOptions.end) : visualisationOptions.end;
        this.timerSpeed = speed !== undefined ? speed : this.timerSpeed;
    };

    private initClock = () => {
        this.clock = new TextBlock();
        this.clock.name = 'clock';
        this.clock.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.clock.fontSize = '20px';
        this.clock.color = 'white';
        this.clock.resizeToFit = true;
        this.clock.height = '96px';
        this.clock.width = '220px';
        this.clock.fontFamily = 'Viga';
    };

    public getClock = () => {
        return this.clock;
    };

    // TODO: fix for medium and fast speed modes.
    public findNextValue = () => {
        const update = this.startDate.getMilliseconds() + this.timerSpeed;
        this.startDate.setMilliseconds(update);
    };

    // TODO: stop clock on endDate reached.
    public onUpdate = () => {
        this.findNextValue();
        this.clock.text = `${this.startDate.getDate()} - ${
            this.startDate.getMonth() + 1
        } - ${this.startDate.getFullYear()}   ${this.startDate.getHours()}:${this.startDate.getMinutes()}:${this.startDate.getSeconds()}`;
    };
}
