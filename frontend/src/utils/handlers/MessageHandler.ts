import { AdvancedDynamicTexture, StackPanel, TextBlock, Button } from '@babylonjs/gui';
import { goBackButton, closeButton } from './commonButtons';

class MessageHandler {
    private stackPanel: StackPanel;
    private message: string;

    constructor(message: string) {
        const error = AdvancedDynamicTexture.CreateFullscreenUI('Message');
        this.message = message;
        const stackPanel = this.initStackPanel();
        error.addControl(stackPanel);
        this.stackPanel.addControl(closeButton(this.closeMessageHandler));
        this.stackPanel.addControl(goBackButton());
    }

    public openMessageHandler() {
        this.stackPanel.isVisible = true;
    }

    public closeMessageHandler() {
        this.stackPanel.isVisible = false;
    }

    private initStackPanel() {
        const stackPanel = new StackPanel();
        stackPanel.width = 0.83;
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '50px';
        stackPanel.verticalAlignment = 0;
        this.stackPanel = stackPanel;
        this.stackPanel.isVisible = false;
        stackPanel.color = 'red';

        const message = new TextBlock();
        message.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        message.fontSize = '20px';
        message.color = 'white';
        message.resizeToFit = true;
        message.height = '96px';
        message.width = '220px';
        message.fontFamily = 'Viga';
        message.text = this.message;
        stackPanel.addControl(message);
        return stackPanel;
    }
}

export default MessageHandler;
