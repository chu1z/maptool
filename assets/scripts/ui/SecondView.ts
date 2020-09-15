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
@reg({ id: UIType.SecondView, path: "/prefabs/ui/SecondView", layer: Layer.UI_POPUP })
export default class SecondView extends UIBase {

    @property(cc.Button)
    btn_new: cc.Button = null;

    @property(cc.Button)
    btn_import: cc.Button = null;

    @property(cc.Button)
    btn_report: cc.Button = null;

    init(data: any) {

    }

    onLoad() {
        this.btn_new.node.on(cc.Node.EventType.MOUSE_DOWN, this.onNew, this);
        this.btn_import.node.on(cc.Node.EventType.MOUSE_DOWN, this.onImport, this);
        this.btn_report.node.on(cc.Node.EventType.MOUSE_DOWN, this.onReport, this);

        // 下拉框选项内容
        // this.itemArray = ['Cocos Creator', 'Cocos-2dx', 'Cocos2d-js', 'Cocos2d-Lua', 'Cocos Creator 3D', 'Cocos Service', 'Cocos社区'];
    }

    onNew() {
        console.log("new");
    }

    onImport() {
        console.log("import");
    }

    onReport() {
        console.log("report");
    }

    onDestroy() {
        super.onDestroy();
        this.btn_new.node.off(cc.Node.EventType.MOUSE_DOWN, this.onNew, this);
        this.btn_import.node.off(cc.Node.EventType.MOUSE_DOWN, this.onImport, this);
        this.btn_report.node.off(cc.Node.EventType.MOUSE_DOWN, this.onReport, this);
    }




}
