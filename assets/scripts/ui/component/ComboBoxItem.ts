import { ComboBox, ComboBoxData } from "./ComboBox";

const { ccclass, property } = cc._decorator;

@ccclass
export class ComboBoxItem extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    index: number;

    data: ComboBoxData;

    init(data: ComboBoxData, index: number) {
        this.data = data;
        this.index = index;
        this.label.string = data.content;
    }

}