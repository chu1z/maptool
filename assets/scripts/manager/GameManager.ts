
import { Camera } from "../map/Camera";
import { Focus } from "../map/Focus";
import { MapGlobal } from "../map/MapGloabl";
import LayerManager, { Layer } from "./LayerManager";
import { UIManager, UIType } from "./UIManager";
import ConfigManager from "./ConfigManager";
import MapManager from "./MapManager";
import { Entity } from "../entity/Entity";
import { AnimationEntity } from "../entity/AnimationEntity";

const { ccclass } = cc._decorator;

@ccclass
export class GameManager extends cc.Component {

    public onLoad() {
        cc.game.addPersistRootNode(this.node);
    }

    public async start() {
        let canvas = cc.find("Canvas");
        if (!canvas) {
            cc.error("cant find canvas");
        }
        LayerManager.ins.initContainer(canvas);

        await ConfigManager.ins.loadConfig();
        ConfigManager.ins.initCfgData();
        this.onGame();
    }

    public onGame() {
        UIManager.ins.show(UIType.SecondView);

        var focus = new cc.Node();
        focus.addComponent(Focus);

        cc.loader.loadRes("images/triangle", cc.SpriteFrame, (err, asset) => {
            focus.addComponent(cc.Sprite).spriteFrame = asset;
        });

        LayerManager.ins.addToLayer(Layer.SCENE_OBSTACLE, focus);

        MapGlobal.screenSize = cc.view.getVisibleSize();

        let camera = MapManager.ins.camera;

        if (!camera) {
            camera = MapManager.ins.camera = cc.find("Canvas/Main Camera");
        }

        camera.getComponent<Camera>(Camera).setFoucs(focus);

        MapManager.ins.initTiles(2, 2560, 2048, LayerManager.ins.getLayer(Layer.SCENE_MAP));


        var entity = new AnimationEntity();
        entity.initDisplay();
        LayerManager.ins.addToLayer(Layer.SCENE_OBSTACLE, entity.display);
    }

    public update(dt: number) {
        MapManager.ins.update(dt);
    }
}
