import { AdvancedDynamicTexture, StackPanel, Button, TextBlock } from '@babylonjs/gui';

class Info {
    private planet: string;
    private infoText: TextBlock = new TextBlock();

    constructor (planet: string) {
        this.planet = planet;
        const infoPanel = AdvancedDynamicTexture.CreateFullscreenUI('infoPanel');
        const stackPanel = this.initStackPanel();
        infoPanel.addControl(stackPanel);
        stackPanel.addControl(this.infoButton());
        this.infoContainer();
        stackPanel.addControl(this.infoText)
    }

    private initStackPanel = () => {
        const stackPanel = new StackPanel();
        stackPanel.width = 0.83;
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '30px';
        stackPanel.verticalAlignment = 0;

        return stackPanel;
    };

    private infoButton = () => {
        const info = Button.CreateSimpleButton('info', 'Get more info');
        info.width = '110px';
        info.height = '30px';
        info.color = 'white';
        info.cornerRadius = 20;
        info.background = 'grey';
        info.onPointerUpObservable.add(() => {
            this.infoText.isVisible ? this.infoText.isVisible = false : this.infoText.isVisible = true;
        });

        return info;
    }

    private fetchInfoData = async () => {
        const response = await fetch(
            `http://localhost:5000/getPlanetInfo?planet=${this.planet}`,
        );
        const data = await response.json();
        console.log(data);

        return data[0];
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

}

export default Info;
