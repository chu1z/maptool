import { MapGlobal } from "./MapGloabl";
import { CallBack } from "../utils/Callback";
import MapManager from "../manager/MapManager";

export default class MapTile {

    /**index索引*/
    private _index: number = 0;
    /**所在行 */
    private _row: number;
    /**所在列 */
    private _col: number;

    public display: cc.Node;

    public constructor(row: number, col: number, container: cc.Node) {
        this.display = new cc.Node;
        this.display.group = container.group;
        this.display.addComponent(cc.Sprite);
        container.addChild(this.display);
        this.row = row;
        this.col = col;
    }

    public get index(): number {
        return this._index;
    }

    public set index(v: number) {
        if (this._index != v) {
            if (this._index > 0) {
                this.clearTexture();
            }
            this._index = v;
            this.loadTexture(v);
        }
    }

    public clearTexture(): void {
        //TODO 销毁和放入资源池考虑
        // let sp = this.display.getComponent(cc.Sprite);
        // if (sp) {
        //     sp.spriteFrame.clearTexture();
        // }
    }

    public get row(): number {
        return this._row;
    }

    public set row(v: number) {
        this._row = v;
        if (this.display) {
            //屏幕坐标系 和 标准坐标系刚好y轴相反
            this.display.y = - v * MapGlobal.tileHeight + ((MapGlobal.screenSize.height - MapGlobal.tileHeight) >> 1);
        }
    }

    public get col(): number {
        return this._col;
    }

    public set col(v: number) {
        this._col = v;
        if (this.display) {
            this.display.x = v * MapGlobal.tileWidth - ((MapGlobal.screenSize.width - MapGlobal.tileWidth) >> 1); //改到左上角 屏幕
        }
    }

    public loadTexture(v: number): void {
        if (v > 0) {
            //TODO 考虑缓存问题
            MapManager.ins.mapLoader.load(v, new CallBack(this.loadComplete, this));
        }
    }

    public loadComplete(index: number, texture: cc.Texture2D): void {
        if (this.index == index) {
            if (this.display) {
                let sp = this.display.getComponent(cc.Sprite);
                sp.spriteFrame = new cc.SpriteFrame(texture);
            }
        }
    }

    public dispose(): void {
        if (this._index > 0) {
            this.clearTexture();
        }
        this._index = 0;
    }
}