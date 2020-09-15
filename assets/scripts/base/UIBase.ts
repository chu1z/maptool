

import { IObserver } from "../ob/Observer";
import { DataBase } from "./DataBase";

import { UIType, UIManager } from "../manager/UIManager";
import { Layer } from "../manager/LayerManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIBase extends cc.Component implements IObserver {

    private _subjects: DataBase[];

    type: UIType;

    start() {

    }

    init(obj: any) {

    }

    updateMsg(cmd: number, data: any) {

    }

    update() {

    }

    onDestroy() {
        this.UnbindSubject();
        UIManager.ins.hide(this.type);
    }

    bindSubject(...subjects: DataBase[]) {
        for (let subject of subjects) {
            if (subject instanceof DataBase) {
                subject.addObserver(this);
            }
        }
        if (!this._subjects)
            this._subjects = subjects;
        else
            this._subjects = this._subjects.concat(subjects);
    }

    private UnbindSubject(): void {
        if (this._subjects) {
            this._subjects.map((subject) => {
                subject.removeObserver(this);
            })
            this._subjects = null;
        }
    }

}



export function reg(path: uiPath) {
    return function (target) {
        target.prototype.type = path.id;
        UIManager.ins.binds[path.id] = path;
    }
}


export interface uiPath {
    id: UIType; //索引id
    path: string; //预制体位置
    layer: Layer;//预制体放置层级
}