
import { CallBack } from "../utils/Callback";
import { resUrl } from "../const/Const";
import ConfigManager from "../manager/ConfigManager";

export default class MapLoader {

    private _resDic: string;
    private _mapId: number;

    private loading: { [key: number]: MapLoaderInfo } = {};
    private _queue: Array<MapLoaderInfo> = [];

    public setMapId(mapid: number) {
        this._mapId = mapid;
        let mapCfg = ConfigManager.ins.map[mapid];
        this._resDic = mapCfg.model + "";
    }

    public load(index: number, call: CallBack): void {

        if (this.loading[index]) {
            this.loading[index].call = call;
            return;
        }

        let loaderInfo: MapLoaderInfo;
        loaderInfo = this.loading[index] = new MapLoaderInfo();
        loaderInfo.index = index;
        loaderInfo.call = call;
        this._queue.push(loaderInfo);

        this.loadNext();
    }

    async loadNext() {
        let t = this;
        if (t._queue.length > 0) {
            let loaderInfo: MapLoaderInfo = t._queue.pop();
            delete t.loading[loaderInfo.index];
            await loaderInfo.doLoad(t._resDic);
            this.loadNext();
        }
    }


}

class MapLoaderInfo {
    index: number;
    call: CallBack;

    async doLoad(dic: string) {
        //TODO 资源整理
        return new Promise((resolve, reject) => {
            cc.assetManager.loadRemote(resUrl + "map512/" + dic + "/" + this.index + ".jpg", (err, res) => {
                if (err) {
                    cc.log(err);
                    return;
                }
                this.call.exec(this.index, res);

                resolve();
            });
        });
    }
}