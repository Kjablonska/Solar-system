import { Button } from '@babylonjs/gui';

export function goBackButton() {
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

export function closeButton(onClose: () => void) {
    const closeButton = Button.CreateSimpleButton('close', 'X');
    closeButton.width = '110px';
    closeButton.height = '30px';
    closeButton.color = 'white';
    closeButton.cornerRadius = 20;
    closeButton.background = 'grey';
    closeButton.left = '0px';
    closeButton.onPointerUpObservable.add(() => {
        // this.stackPanel.isVisible = false;
        onClose();
        console.log('close');
    });

    return closeButton;
}