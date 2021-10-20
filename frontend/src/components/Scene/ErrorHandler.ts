import { AdvancedDynamicTexture, StackPanel, TextBlock, Button } from '@babylonjs/gui';

class ErrorHandler {
    private onRetry: () => void;
    private stackPanel: StackPanel;

    constructor(onRetry: () => void) {
        this.onRetry = onRetry;
        const error = AdvancedDynamicTexture.CreateFullscreenUI('Error');
        const stackPanel = this.initStackPanel();
        error.addControl(stackPanel);
        this.stackPanel.addControl(this.initRetryButton());
        this.stackPanel.addControl(this.initCloseButton());
        this.stackPanel.addControl(this.initGoBack());
    }

    public openErrorHandler() {
        this.stackPanel.isVisible = true;
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

    private initGoBack() {
        const backButton = Button.CreateSimpleButton('back', 'Back to data selection');
        backButton.width = '200px';
        backButton.height = '50px';
        backButton.color = 'white';
        backButton.cornerRadius = 20;
        backButton.background = 'grey';
        backButton.left = '0px';
        backButton.onPointerUpObservable.add(() => {
            // TODO; change redirection
            window.location.replace("http://localhost:3000/");
            console.log('back');
        });

        return backButton;
    }

    private initCloseButton() {
        const closeButton = Button.CreateSimpleButton('close', 'X');
        closeButton.width = '110px';
        closeButton.height = '30px';
        closeButton.color = 'white';
        closeButton.cornerRadius = 20;
        closeButton.background = 'grey';
        closeButton.left = '0px';
        closeButton.onPointerUpObservable.add(() => {
            this.stackPanel.isVisible = false;
            console.log('close');
        });

        return closeButton;
    }
}

export default ErrorHandler;
