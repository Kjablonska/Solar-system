import { AdvancedDynamicTexture, StackPanel, TextBlock, Control, Button } from '@babylonjs/gui';

class MessageHandler {
    private stackPanel: StackPanel;
    private message: TextBlock;
    private button: Button;

    constructor(message: string, width: string) {
        const error = AdvancedDynamicTexture.CreateFullscreenUI('Message');
        const stackPanel = this.initStackPanel(width);
        error.addControl(stackPanel);
        this.messageText(message);
        this.stackPanel.addControl(this.message);
        this.closeButton();
        this.stackPanel.addControl(this.button);
    }

    public openMessageHandler() {
        this.message.isVisible = true;
        this.button.isVisible = true;
    }

    public closeMessageHandler() {
        this.message.isVisible = false;
        this.button.isVisible = false;
    }

    private initStackPanel(width: string) {
        const stackPanel = new StackPanel();
        stackPanel.height = '30%';
        stackPanel.width = width;
        stackPanel.top = '50px';
        stackPanel.isVertical = false;
        stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.stackPanel = stackPanel;
        return stackPanel;
    }

    private messageText = (messageText: string) => {
        this.message = new TextBlock();
        this.message.fontSize = '22px';
        this.message.color = 'white';
        this.message.resizeToFit = true;
        this.message.height = '96px';
        this.message.width = '220px';
        this.message.fontFamily = 'Arial';
        this.message.text = messageText;
        this.message.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.message.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.message.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    };

    private closeButton() {
        this.button = Button.CreateSimpleButton('closeButton', 'x');
        this.button.width = '35px';
        this.button.height = '25px';
        this.button.color = 'white';
        this.button.cornerRadius = 5;
        this.button.background = '#A6808C';
        this.button.paddingLeft = '10px';
        this.button.onPointerUpObservable.add(() => {
            this.button.isVisible = false;
            this.message.isVisible = false;
        });
    }
}

export default MessageHandler;
