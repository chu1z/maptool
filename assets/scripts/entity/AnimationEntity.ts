import { Entity } from "./Entity";
import FrameAnim from "./FrameAnim";


export class AnimationEntity extends Entity {

    fram: FrameAnim;

    /** 初始化显示对象*/
    public initDisplay(): void {
        super.initDisplay();

        if (!this.fram) {
            this.fram = this.display.addComponent<FrameAnim>(FrameAnim);
        }

        this.display.scale = 3;
        cc.resources.load("/model/ck01", cc.SpriteAtlas, (err, res: cc.SpriteAtlas) => {
            this.fram.spriteFrames = res.getSpriteFrames();
            this.fram.duration = 0.2;
            this.fram.playLoop();
        })
    }


}