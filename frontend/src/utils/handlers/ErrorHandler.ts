import { AdvancedDynamicTexture, StackPanel, Button, Control } from '@babylonjs/gui';
import MessageHandler from './MessageHandler';

class ErrorHandler {
    private onRetry: () => void;
    private stackPanel: StackPanel;
    private messageHandler: MessageHandler;
    private retryButton: Button;

    constructor(onRetry: () => void) {
        this.onRetry = onRetry;
        const error = AdvancedDynamicTexture.CreateFullscreenUI('Error');
        const stackPanel = this.initStackPanel();
        error.addControl(stackPanel);
        this.stackPanel.addControl(this.initRetryButton());
        this.messageHandler = new MessageHandler('Something went wrong while fetching the data', '600px');
        this.messageHandler.closeMessageHandler();
    }

    public openErrorHandler() {
        this.stackPanel.isVisible = true;
        this.messageHandler.openMessageHandler();
        this.retryButton.isVisible = true;
    }

    public closeErrorHandler() {
        this.stackPanel.isVisible = false;
        this.messageHandler.closeMessageHandler();
        this.retryButton.isVisible = false;
    }

    private initStackPanel() {
        const stackPanel = new StackPanel();
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '150px';
        stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.stackPanel = stackPanel;
        this.stackPanel.isVisible = false;
        return stackPanel;
    }

    private initRetryButton() {
        const retryButton = Button.CreateSimpleButton('retry', 'Retry');
        retryButton.isVisible = true;
        retryButton.width = '110px';
        retryButton.height = '30px';
        retryButton.color = 'white';
        retryButton.top = '50px';
        retryButton.cornerRadius = 5;
        retryButton.fontFamily = 'Arial';
        retryButton.background = '#A6808C';
        retryButton.left = '0px';
        retryButton.onPointerUpObservable.add(() => {
            this.onRetry();
        });

        this.retryButton = retryButton;

        return retryButton;
    }
}

export default ErrorHandler;
