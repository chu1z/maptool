const { ccclass, property } = cc._decorator;


@ccclass
export class MovieClip extends cc.Component {

    @property(cc.String)
    resName: string = "";

    @property(cc.Integer)
    totalFrame: number = 3;

    @property(cc.Integer)
    frameRate: number = 24;

    @property(cc.SpriteAtlas)
    spriteAtlas: cc.SpriteAtlas = null;

    private _curTimes: number = 0;
    private _curFrame: number = 0;
    private playTimes: number = 0;
    private beginFrame: number = 0;
    private endFrame: number = 0;
    private _playing: boolean = false;

    private frameIntervalTime: number = 0;

    private _bitmap: cc.Sprite;

    onLoad(): void {
        this.frameIntervalTime = Math.floor(60 / this.totalFrame);
        this._bitmap = this.node.getComponent(cc.Sprite);

        this.play();
    }

    /**
     * 
     * @param playTimes 播放次数 -1为一直播放
     * @param beginFrame  从第几帧开始播放
     * @param endFrame   播放到那一帧
     */
    play(playTimes = -1, beginFrame = 0, endFrame = Number.MAX_VALUE): void {
        this._curTimes = 0;
        this.playTimes = playTimes;
        this.beginFrame = beginFrame < this.totalFrame ? beginFrame : 0;
        this.endFrame = endFrame < this.totalFrame ? endFrame : this.totalFrame;
        this._curFrame = this.beginFrame;
        this._playing = true;

    }

    private _times: number = 0;
    update(): void {

        if (this._playing) {

            this._times++;

            if (!this.node.active) {
                return;
            }

            if (this._curTimes >= this.playTimes && this.playTimes != -1) {
                this._playing = false;
            }

            if (this._times % this.frameIntervalTime == 0) {

                if (this.spriteAtlas) {
                    this._bitmap.spriteFrame = this.spriteAtlas.getSpriteFrame(this.resName + this._curFrame);
                } else {
                    // this._bitmap.spriteFrame = th
                }

                this._curFrame++;
                if (this._curFrame > this.endFrame) {
                    this._curFrame = this.beginFrame;
                    this._curTimes++;
                }
            }
        }
    }

    // destroy(): boolean {

    //     return true;
    // }

}