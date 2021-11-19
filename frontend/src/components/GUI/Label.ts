import { Mesh } from '@babylonjs/core';
import { TextBlock, AdvancedDynamicTexture } from '@babylonjs/gui';

class Label {
    private label: TextBlock;

    constructor(labelName: string, mesh: Mesh) {
        const panel = AdvancedDynamicTexture.CreateFullscreenUI(labelName);
        this.createLabel(labelName);
        panel.addControl(this.label);
        this.label.linkWithMesh(mesh);
        this.label.isVisible = false;
    }

    private createLabel = (labelName: string) => {
        this.label = new TextBlock();
        this.label.text = labelName;
        this.label.width = '110px';
        this.label.height = '40px';
        this.label.color = 'white';
        this.label.fontSize = '22px';
        this.label.resizeToFit = true;
    }

    public changeVisibility = (): void => {
        this.label.isVisible = !this.label.isVisible;
    }

    public getVisibility = (): boolean => {
        return this.label.isVisible;
    }

    public setVisibility = (visibility: boolean) => {
        this.label.isVisible = visibility;
    }
}

export default Label;
