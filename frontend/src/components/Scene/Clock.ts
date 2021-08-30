import { TextBlock } from '@babylonjs/gui';

const INIT_CLOCK_SPEED = 1;

export class Clock {
    private startDate: Date;
    private isRealTime: boolean;
    private endDate?: Date;
    private speed: number = INIT_CLOCK_SPEED;
    private clock: TextBlock;

    constructor(startDate: string, isRealTime: boolean, speed?: number, endDate?: string) {
        this.initClock();
        this.startDate = new Date(startDate);
        this.endDate = endDate !== undefined ? new Date(endDate) : endDate;
        this.isRealTime = isRealTime;
        this.speed = speed || INIT_CLOCK_SPEED;
        console.log('startDate', startDate, this.startDate);
    }

    public initSpeed = (speed: number) => {
        this.speed = speed;
    };

    public updateClock = (startDate: string, isRealTime: boolean, endDate?: string, speed?: number) => {
        this.startDate = new Date(startDate);
        this.endDate = endDate !== undefined ? new Date(endDate) : endDate;
        this.isRealTime = isRealTime;
        this.speed = speed !== undefined ? speed : INIT_CLOCK_SPEED;
        console.log('update', this.startDate);
    };

    public updateSpeed = (speed: number) => {
        this.speed = speed;
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

    public findNextValue = () => {
        const update = this.startDate.getSeconds() + this.speed;
        this.startDate.setSeconds(update);
    };

    public onUpdate = () => {
        this.findNextValue();
        this.clock.text = `${this.startDate.getDate()} - ${
            this.startDate.getMonth() + 1
        } - ${this.startDate.getFullYear()}   ${this.startDate.getHours()}:${this.startDate.getMinutes()}:${this.startDate.getSeconds()}`;
    };
}
