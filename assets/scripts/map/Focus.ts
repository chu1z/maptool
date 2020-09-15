

const { ccclass } = cc._decorator;

@ccclass
export class Focus extends cc.Component {

    offset: cc.Vec3 = cc.v3(0, 0, 0);

    speed: number = 2;

    start(): void {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case cc.macro.KEY.up:
                this.offset.y += 10;
                break;
            case cc.macro.KEY.down:
                this.offset.y -= 10;
                break;
            case cc.macro.KEY.left:
                this.offset.x -= 10;
                break;
            case cc.macro.KEY.right:
                this.offset.x += 10;
                break;
        }

        let p3 = this.node.position.add(this.offset);

        this.node.setPosition(p3);

        // console.log("down---->" + p3.x, p3.y)

    }

    onKeyUp(): void {
        this.offset.x = 0;
        this.offset.y = 0;
        this.offset.z = 0;
    }

    update(deltaTime) {
        // let p3: cc.Vec3 = new cc.Vec3();
        // cc.Vec3.add(p3, this.node.position, this.offset);
        //插值计算
        // cc.Vec3.lerp(p3, this.node.position, p3, deltaTime * this.speed);
        //移动节点
        // this.node.setPosition(p3);
    }

}