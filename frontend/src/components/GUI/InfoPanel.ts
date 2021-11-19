import { AdvancedDynamicTexture, StackPanel, Button, TextBlock } from '@babylonjs/gui';

class Info {
    private planet: string;
    public infoText: TextBlock = new TextBlock();
    public info: Button;

    constructor (planet: string) {
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
            this.infoText.isVisible ? this.infoText.isVisible = false : this.infoText.isVisible = true;
        });
        this.info = info;
        return info;
    }

    private fetchInfoData = async () => {
        const response = await fetch(
            `http://localhost:5000/getPlanetInfo?planet=${this.planet}`,
        );
        const data = await response.json();
        console.log(data);

        // TODO: map info object to text.
        return JSON.stringify(data);
    }

    private infoContainer = async () => {
        this.infoText.isVisible = false;
        this.infoText.name = 'clock';
        this.infoText.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        this.infoText.fontSize = '18px';
        this.infoText.color = 'white';
        this.infoText.resizeToFit = true;
        this.infoText.height = '400px';
        this.infoText.width = '400px';
        const text = await this.fetchInfoData();
        this.infoText.text = JSON.stringify(text);

        return this.infoText;
    }

    public setVisibility = () => {
        this.info.isVisible = !this.info.isVisible;

        if (this.infoText.isVisible)
            this.infoText.isVisible = false;
    }

}

export default Info;
