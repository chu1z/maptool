import { CallBack } from "../utils/Callback";
import { MapGlobal } from "./MapGloabl";
import MapManager from "../manager/MapManager";

const { ccclass, property } = cc._decorator;

@ccclass
export class Camera extends cc.Component {

    private _focus: cc.Node;

    @property
    public speed: number = 5;

    /**
     * 跟随目标 
     * @param focus 目标对象
     */
    setFoucs(focus: cc.Node) {
        this._focus = focus;
    }

    /**
     * 盯着某一位置(传入世界坐标)
     * @param v3 位置信息
     */
    lookTo(v3: cc.Vec3) {
        this._focus = null;
        this.node.position = this.node.parent.convertToNodeSpaceAR(v3);

        //TODO 他这会lookat 效果好像不行
        // this.node.lookAt(v3);
    }

    /**
     * 平滑移动到某个位置
     * @param v3 位置信息
     * @param callback 
     */
    flyTo(v3: cc.Vec3, callback: CallBack = null): void {
        this._focus = null;
        //TODO 平滑飞过去

        // if (_timer != null) {
        //     throw new Error("Camera is moving,can not do this operation.");
        //     return;
        // }
        // _moveCallBack = callback;
        // _focus = _scene.Map.fllower;
        // _moveStart = new Point(_scene.Map.Center.x, _scene.Map.Center.y);
        // _scene.Map.fllow(null);
        // _moveEnd = new Point(x, y);
        // _timer = new Timer(50);
        // _timer.addEventListener(TimerEvent.TIMER, moveCamera);
        // _timer.start();
    }

    update(deltaTime: number): void {

        if (this._focus) {

            let wVec2 = this._focus.convertToWorldSpaceAR<cc.Vec3>(cc.v3(0, 0, 0));
            let lVec2 = this.node.parent.convertToNodeSpaceAR<cc.Vec3>(wVec2);

            if (lVec2.x < 0 || (lVec2.x + MapGlobal.screenSize.width > MapManager.ins.mapWidth)) {
                lVec2.x = this.node.position.x;
            }

            //向下是负数
            if (lVec2.y > 0 || (lVec2.y - MapGlobal.screenSize.height < -MapManager.ins.mapHeight)) {
                lVec2.y = this.node.position.y;
            }

            //插值计算
            cc.Vec3.lerp(lVec2, this.node.position, lVec2, deltaTime * this.speed);

            //移动节点
            this.node.setPosition(lVec2);

        }
    }

}