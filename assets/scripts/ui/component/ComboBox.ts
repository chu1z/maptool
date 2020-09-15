import { ComboBoxItem } from "./ComboBoxItem";

const { ccclass, property } = cc._decorator;

@ccclass
export class ComboBox extends cc.Component {

    @property(cc.Node)
    triangle: cc.Node = null;

    @property(cc.Label)
    comboLabel: cc.Label = null;

    @property(cc.Node)
    dropDown: cc.Node = null;

    @property(cc.Node)
    vLayoutNode: cc.Node = null;   // 垂直布局

    @property(cc.Node)
    contentNode: cc.Node = null;      // 滚动视图内容

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;      // 下拉框选项

    // 是否已经下拉
    isDropDown: boolean = false;

    selIndex: number = 0;

    itemArray: ComboBoxData[] = [];

    onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchHandler, this);

        this.vLayoutNode.on(cc.Node.EventType.TOUCH_END, this.onTouchItemHandler, this, true);

        this.isDropDown = false;
    }

    onTouchItemHandler(e: cc.Event.EventTouch) {
        e.stopPropagation();
        let target: cc.Node = e.target;
        let item = target.getComponent<ComboBoxItem>(ComboBoxItem);
        this.setDefault(item.index);
        this.onTouchHandler();
    }

    onTouchHandler() {
        // 旋转小三角形(正值为逆时针，负值为顺时针)
        cc.tween(this.triangle)
            .to(0.1, { angle: !this.isDropDown ? 180 : 90 }, { easing: 'sineOutIn' })
            .start();
        // 下拉框显示与隐藏
        this.dropDown.active = !this.isDropDown;
        // 改变isDropDown值
        this.isDropDown = !this.isDropDown;
    }

    initData(data: ComboBoxData[]): void {
        this.itemArray = data;
        this.initItems();
    }

    setDefault(index: number, dispatch: boolean = true): void {
        this.selIndex = index;

        let data = this.itemArray[index];

        this.comboLabel.string = data.content;

        if (dispatch) {
            this.node.emit("ComboBoxOnClick", data);
        }
    }

    setScrollHeight(height: number): void {
        this.dropDown.height = height;
    }

    private initItems() {
        // 根据数组初始化下拉框中的各个选项内容
        let totalHeight = 0;
        for (let i = 0; i < this.itemArray.length; i++) {
            let item = cc.instantiate(this.itemPrefab);
            item.getComponent<ComboBoxItem>(ComboBoxItem).init(this.itemArray[i], i);
            this.vLayoutNode.addChild(item);
            totalHeight += item.height;
        }

        // 设置content高度
        if (totalHeight > this.contentNode.height)
            this.contentNode.height = totalHeight;
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchHandler, this);

    }

}

export type ComboBoxData = {
    id: number,
    content: string
}