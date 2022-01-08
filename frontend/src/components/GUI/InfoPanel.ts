import { Button, TextBlock, TextWrapping, Control } from '@babylonjs/gui';

class Info {
    private planet: string;
    public infoText: TextBlock = new TextBlock();
    public info: Button;

    constructor(planet: string) {
        this.planet = planet;
        this.infoButton();
        this.infoContainer();
    }

    public infoButton = () => {
        const info = Button.CreateSimpleButton('info', 'More info');
        info.width = '110px';
        info.height = '40px';
        info.color = 'white';
        info.cornerRadius = 5;
        info.background = '#A6808C';
        info.top = '0px';
        info.left = '800px';
        info.onPointerUpObservable.add(() => {
            this.infoText.isVisible = this.infoText.isVisible ? false : true;
        });
        this.info = info;

        return info;
    };

    private fetchInfoData = async () => {
        const response = await fetch(`http://localhost:5000/getPlanetInfo?planet=${this.planet}`);
        const data = await response.json();

        const name = this.planet === 'SolarSystem' ? 'Solar System' : this.planet;
        let formatted = `${name} data:\n\n`;
        for (const [key, val] of Object.entries(data)) {
            formatted += `${key}:\t${val}\n`;
        }

        return formatted;
    };

    private infoContainer = async () => {
        this.infoText.isVisible = false;
        this.infoText.name = 'info';
        this.infoText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.infoText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.infoText.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
        this.infoText.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_TOP;
        this.infoText.fontSize = '20px';
        this.infoText.fontFamily = 'Arial';
        this.infoText.color = 'white';
        this.infoText.resizeToFit = true;
        this.infoText.height = '100%';
        this.infoText.width = '100%';
        this.infoText.lineSpacing = '5px';
        this.infoText.textWrapping = TextWrapping.WordWrap;
        const text = await this.fetchInfoData();
        this.infoText.text = text;

        return this.infoText;
    };

    public setVisibility = () => {
        this.info.isVisible = !this.info.isVisible;

        if (this.infoText.isVisible) this.infoText.isVisible = false;
    };
}

export default Info;
