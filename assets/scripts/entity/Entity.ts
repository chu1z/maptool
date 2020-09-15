import { EntityData } from "./EntityData";

export class Entity {

    /** 是否可用*/
    enabled: boolean = true;

    data: EntityData;

    display: cc.Node;

    /**更新 */
    update(dt: number) {

    }

    /** 初始化数据*/
    protected initData(data: EntityData): void {
        this.data = data;
    }

    /** 初始化显示对象*/
    protected initDisplay(): void {
        if (!this.display) {
            this.display = new cc.Node();
        }
    }
}


//TODO
//  数据 data
//  显示 display
//  更新 update
//  
//  
//
//