// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIType } from "../manager/UIManager";
import { Layer } from "../manager/LayerManager";
import UIBase, { reg } from "../base/UIBase";


const { ccclass, property } = cc._decorator;

@ccclass
@reg({ id: UIType.FirstView, path: "/prefabs/ui/FirstView", layer: Layer.UI_POPUP })
export default class FirstView extends UIBase {

    @property(cc.Button)
    btn_new: cc.Button = null;

    @property(cc.Button)
    btn_import: cc.Button = null;

    init(data: any) {

    }

    onLoad() {
        this.btn_new.node.on(cc.Node.EventType.MOUSE_DOWN, this.onNew, this);
        this.btn_import.node.on(cc.Node.EventType.MOUSE_DOWN, this.onImport, this);
    }

    onNew() {
        console.log("new");
    }

    onImport() {
        console.log("import");
    }

    onDestroy() {
        super.onDestroy();
        this.btn_new.node.off(cc.Node.EventType.MOUSE_DOWN, this.onNew, this);
        this.btn_import.node.off(cc.Node.EventType.MOUSE_DOWN, this.onImport, this);
    }




}
