import { AdvancedDynamicTexture, StackPanel, TextBlock, Button } from '@babylonjs/gui';
import { goBackButton, closeButton } from './commonButtons';

class ErrorHandler {
    private onRetry: () => void;
    private stackPanel: StackPanel;

    constructor(onRetry: () => void) {
        this.onRetry = onRetry;
        const error = AdvancedDynamicTexture.CreateFullscreenUI('Error');
        const stackPanel = this.initStackPanel();
        error.addControl(stackPanel);
        this.stackPanel.addControl(this.initRetryButton());
        this.stackPanel.addControl(closeButton(this.closeErrorHandler));
        this.stackPanel.addControl(goBackButton());
    }

    public openErrorHandler() {
        this.stackPanel.isVisible = true;
    }

    public closeErrorHandler() {
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
        message.text = 'Something went wrong while fetching the data.';
        stackPanel.addControl(message);
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
