import { Singleton } from "../utils/Singleton";

export default class LayerManager extends Singleton<LayerManager>() {

    layers: { [key: number]: cc.Node } = {};

    public initContainer(container: cc.Node): void {
        this.createLayer(Layer.SCENE_MAP, "battle", container);
        this.createLayer(Layer.SCENE_AUXILIARY, "battle", container);
        this.createLayer(Layer.SCENE_OBSTACLE, "battle", container);
        this.createLayer(Layer.UI_POPUP, "ui", container);
    }

    public addToLayer(layer: Layer, target: cc.Node) {
        if (target.isChildOf(this.layers[layer]) == false) {
            target.group = this.layers[layer].group;
            this.layers[layer].addChild(target);
        }
    }

    public getLayer(layer: Layer) {
        return this.layers[layer];
    }

    private createLayer(layer: Layer, group: string, container: cc.Node) {
        this.layers[layer] = new cc.Node();
        this.layers[layer].group = group;
        container.addChild(this.layers[layer]);
    }
}

export enum Layer {

    /*------------场景---------*/
    /** 场景地图层*/
    SCENE_MAP,
    /** 场景辅助线层*/
    SCENE_AUXILIARY,
    /** 场景障碍物层*/
    SCENE_OBSTACLE,


    /*------------UI-----------*/
    /** 面板弹窗层*/
    UI_POPUP,
}
