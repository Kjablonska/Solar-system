import { AdvancedDynamicTexture, StackPanel, Button } from '@babylonjs/gui';
import MessageHandler from './MessageHandler';

class ErrorHandler {
    private onRetry: () => void;
    private stackPanel: StackPanel;
    private messageHandler: MessageHandler;

    constructor(onRetry: () => void) {
        this.onRetry = onRetry;
        const error = AdvancedDynamicTexture.CreateFullscreenUI('Error');
        const stackPanel = this.initStackPanel();
        error.addControl(stackPanel);
        this.stackPanel.addControl(this.initRetryButton());
        this.messageHandler = new MessageHandler('Something went wrong while fetching the data', '600px')
        this.messageHandler.closeMessageHandler()
    }

    public openErrorHandler() {
        this.messageHandler.openMessageHandler()
        this.stackPanel.isVisible = true;
    }

    public closeErrorHandler() {
        this.stackPanel.isVisible = false;
        this.messageHandler.closeMessageHandler()
    }

    private initStackPanel() {
        const stackPanel = new StackPanel();
        stackPanel.height = '100%';
        stackPanel.width = '100%';
        stackPanel.top = '50px';
        stackPanel.verticalAlignment = 0;
        this.stackPanel = stackPanel;
        this.stackPanel.isVisible = false;
        return stackPanel;
    }

    private initRetryButton() {
        const retryButton = Button.CreateSimpleButton('retry', 'Retry');
        retryButton.width = '110px';
        retryButton.height = '30px';
        retryButton.color = 'white';
        retryButton.cornerRadius = 20;
        retryButton.background = 'grey';
        retryButton.left = '0px';
        retryButton.onPointerUpObservable.add(() => {
            this.onRetry();
            console.log('retry');
        });

        return retryButton;
    }
}

export default ErrorHandler;
