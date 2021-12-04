import { TextBlock } from '@babylonjs/gui';
import { VisualisationOptions } from '../../types/period';
import { TimeSelection } from '../../types/userOptions';
import MessageHandler from '../../utils/handlers/MessageHandler';
import { SpeedModes } from '../../utils/speedModes';

export class Clock {
    private startDate: Date;
    private endDate?: Date;
    private clock: TextBlock;
    public onUpdate: () => void;
    public onEndDateReached: () => void;
    private upadeValue: number;
    private stop: boolean = false;

    constructor(visualisationOptions: VisualisationOptions, speedMode: SpeedModes, time?: TimeSelection) {
        this.initClock();
        const constructInitValue =
            time === undefined
                ? `${visualisationOptions.start} 00:00:00`
                : `${visualisationOptions.start} ${time!.hours}:${time!.minutes}:00`;
        console.log('TIME', constructInitValue);
        this.startDate = new Date(constructInitValue);
        this.endDate = visualisationOptions.end !== undefined ? new Date(visualisationOptions.end) : undefined;
        this.findUpdateParameters(speedMode);
    }

    private findUpdateParameters = (speedMode: SpeedModes) => {
        switch (speedMode) {
            case 'RealTime':
                this.onUpdate = this.findNextValueRealTime;
                break;
            case 'Medium':
                this.onUpdate = this.findNextValue;
                this.upadeValue = 24;
                break;
            case 'Fast':
                this.onUpdate = this.findNextValue;
                this.upadeValue = 4.8;
                break;
            default:
                this.onUpdate = this.findNextValueRealTime;
                break;
        }
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
        this.clock.top = '0px';
        this.clock.fontFamily = 'Arial';
    };

    public getClock = () => {
        return this.clock;
    };

    public stopClock = () => {
        console.log('stop clock');
        this.stop = true;
    };

    public startClock = () => {
        this.stop = false;
    };

    public findNextValueRealTime = () => {
        if (this.stop) return;

        const update = this.startDate.getSeconds() + 1000;
        this.startDate.setMilliseconds(update);

        if (this.checkIfEndDateReached()) return;

        this.clock.text = `${this.startDate.getDate()} - ${
            this.startDate.getMonth() + 1
        } - ${this.startDate.getFullYear()}   ${this.startDate.getHours()}:${this.startDate.getMinutes()}:${this.startDate.getSeconds()}`;
    };

    public findNextValue = () => {
        if (this.stop) return;

        // const update = this.startDate.getHours() + this.upadeValue;
        this.startDate.setTime(this.startDate.getTime() + (this.upadeValue*60*60*1000));
        // this.startDate.setUTCHours(update);

        if (this.checkIfEndDateReached()) {
            console.log('end clock');
            return;
        }

        this.clock.text = `${this.startDate.getDate()} - ${
            this.startDate.getMonth() + 1
        } - ${this.startDate.getFullYear()}`;

    };

    private checkIfEndDateReached = () => {
        if (this.endDate === undefined) return false;

        if (this.startDate.getTime() > this.endDate.getTime()) {
            this.onEndDateReached();
            new MessageHandler('End date reached.', '220px');
            return true;
        }
    };

    public setVisibility = () => {
        this.clock.isVisible = !this.clock.isVisible;
    };
}
