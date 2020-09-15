import MapLoader from "../map/MapLoader";
import MapTile from "../map/MapTile";
import { MapGlobal } from "../map/MapGloabl";
import MathUtil from "../utils/MathUtil";
import { Singleton } from "../utils/Singleton";

export default class MapManager extends Singleton<MapManager>() {

    /**摄像机位置 */
    camera: cc.Node;

    /**父容器 */
    private _container: cc.Node;

    /**总行数 */
    public totalRow: number;
    /**总列数 */
    public totalColumn: number;

    /**显示的行数 */
    public showRow: number;
    /**显示的列数 */
    public showCol: number;

    /** 移动到的x */
    public scrollX: number = 0;

    /** 移动到的y */
    public scrollY: number = 0;

    /** 上次x的位置 */
    private lastX: number = 0;

    /** 上个y的位置 */
    private lastY: number = 0;

    /** 地图总宽度 */
    public mapWidth: number;

    /** 地图总高度 */
    public mapHeight: number;

    public tileInView: MapTile[][] = [];

    public mapLoader: MapLoader = new MapLoader();

    /**
     * 
     * 初始化地图显示块对象
     * 根据屏幕初始化固定块数的地图，正常移动时，只需移动周围一圈的地图块到另一边，并修改纹理即可
     * @param mapId 地图id
     * @param mapWdith  地图宽高
     * @param mapHeight 
     * @param container  地图父容器
     */
    public initTiles(mapId: number, mapWdith: number, mapHeight: number, container: cc.Node): void {

        this.mapLoader.setMapId(mapId);

        this._container = container;

        this.mapWidth = mapWdith;
        this.mapHeight = mapHeight;

        this.totalRow = Math.ceil(mapHeight / MapGlobal.tileHeight);
        this.totalColumn = Math.ceil(mapWdith / MapGlobal.tileWidth);

        //要显示的行列
        this.showCol = Math.ceil(MapGlobal.screenSize.width / MapGlobal.tileWidth);
        this.showRow = Math.ceil(MapGlobal.screenSize.height / MapGlobal.tileHeight);

        this.scrollX = 0;
        this.scrollY = 0;

        if (!this.camera) {
            this.camera = cc.find("Canvas/Main Camera");
        }

        /**
         * 由于地图是从左上角按块切出来的，因此为了方便，游戏中的y轴取反来取值
         */
        let offsetX = this.lastX = Math.floor((this.camera.x) / MapGlobal.tileWidth);
        let offsetY = this.lastY = Math.floor((-this.camera.y) / MapGlobal.tileHeight);

        let maxRow = Math.max(this.tileInView.length, this.showRow);
        let maxCol = 0;
        let tiles: MapTile[];
        let tile: MapTile;

        for (let i = 0; i <= maxRow; i++) { //只用比显示的多一个就行了，所以用<=
            tiles = this.tileInView[i];
            if (tiles) {
                if (i >= this.showRow) {
                    for (tile of tiles) {
                        tile.dispose();
                    }
                    continue;
                }
            } else {
                tiles = this.tileInView[i] = [];
            }

            maxCol = Math.max(tiles.length, this.showCol);

            for (let j = 0; j <= maxCol; j++) {
                tile = tiles[j];
                if (tile) {
                    if (j >= this.showCol) {
                        tile.dispose();
                        continue;
                    }
                    tile.col = j + offsetX;
                    tile.row = i + offsetY;
                } else {
                    tiles[j] = tile = this.addTile(i + offsetY, j + offsetX);
                }
                this.checkIndex(tile);
            }
        }
    }

    /**
     * 增加切片，不加载资源
     */
    public addTile(row: number, col: number): MapTile {
        return new MapTile(row, col, this._container);
    }

    public checkIndex(tile: MapTile) {
        let t = this;
        if (tile.col >= 0 && tile.row >= 0 && tile.col < this.totalColumn && tile.row < this.totalRow) {
            tile.index = MathUtil.arr2To1(tile.row, tile.col, this.totalColumn) + 1;
        } else {
            tile.index = 0;
        }
    }

    public update(dt: number): void {

        if (!this.camera) {
            this.camera = cc.find("Canvas/Main Camera");
        }

        let offsetX = Math.floor((this.camera.x) / MapGlobal.tileWidth);
        let offsetY = Math.floor((-this.camera.y) / MapGlobal.tileHeight);

        //和上一次比较移动了多少格子
        let movedx: number = offsetX - this.lastX;//移动了多少格
        let movedy: number = offsetY - this.lastY;//移动了多少格

        let mx: number = Math.abs(movedx);
        let my: number = Math.abs(movedy);

        if (mx > 0 || my > 0) {
            if (mx > 0) {
                this.checkMoveX(movedx);
            }
            if (my > 0) {
                this.checkMoveY(movedy);
            }

            this.scrollX += movedx;
            this.scrollY += movedy;

            this.lastX = offsetX;
            this.lastY = offsetY;

        }
    }

    public checkMoveX(movedx: number) {
        let tiles: Array<Array<MapTile>> = this.tileInView;
        let tile: MapTile;
        let tempCol: number;
        for (let j = 0; j <= this.showRow; j++) {
            tempCol = (this.scrollX + (movedx > 0 ? 0 : -1)) % (this.showCol + 1);
            tile = tiles[j][tempCol];
            if (tile) {
                tile.col += movedx * (this.showCol + 1);
                this.checkIndex(tile);
            } else {
                console.error(`未发现${j}_${tempCol}的格子`)
            }
        }
    }

    public checkMoveY(movedy: number) {
        let tiles: Array<Array<MapTile>> = this.tileInView;
        let tile: MapTile;
        let tempRow: number;
        tempRow = (this.scrollY + (movedy > 0 ? 0 : -1)) % (this.showRow + 1);
        if (tiles[tempRow]) {
            for (let j = 0; j <= this.showCol; j++) {
                tile = tiles[tempRow][j];
                if (tile) {
                    tile.row += movedy * (this.showRow + 1);
                    this.checkIndex(tile);
                } else {
                    console.error(`未发现${tempRow}_${j}的格子`)
                }
            }
        }
    }
}

