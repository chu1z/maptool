import { Singleton } from "../utils/Singleton";
import UIBase, { uiPath } from "../base/UIBase";
import LayerManager from "./LayerManager";

export class UIManager extends Singleton<UIManager>() {

    binds: { [key: number]: uiPath } = {};

    private _views: { [key: number]: cc.Node } = {};

    public async show(id: UIType, data?: any) {
        let bind = this.binds[id];

        if (!bind) return;

        if (!this._views[id]) {
            let view = await this.loadUI(id);
            if (!view) {
                return;
            }
            this._views[id] = cc.instantiate(view);
        }

        LayerManager.ins.addToLayer(bind.layer, this._views[id]);

        this._views[id].getComponent(UIBase).init(data);
    }

    public getUI(id: UIType): cc.Node {
        return this._views[id];
    }

    public hide(id: UIType) {
        if (this._views[id]) {
            this._views[id].destroy();
            delete this._views[id];
        }
    }

    private async loadUI(id: UIType): Promise<cc.Prefab> {
        if (!this.binds[id]) {
            console.warn(`[资源加载] 没有id[${id}]的面板`);
            return;
        }

        return new Promise((resolve, reject) => {
            cc.resources.load(this.binds[id].path, cc.Prefab, (err, asset) => {
                if (err) {
                    cc.warn(`[资源加载] 错误 ${err}`);
                    return;
                }
                let temp: any = cc.instantiate(asset);
                asset = null;
                resolve(temp);
            });
        });
    }
}


export enum UIType {
    FirstView = 1,
    SecondView = 2,
}



