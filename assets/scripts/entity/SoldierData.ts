import { SoldierConfig } from "../config/SoldierConfig";
import { EntityData } from "./EntityData";

export class SoldierData extends EntityData {
	/** 士兵表的id*/
	public sid: number;
	/** 朝向*/
	public dir: number;
	/** 队伍*/
	public team: number;
	/** 配置表数据*/
	public config: SoldierConfig;
	/** 数量*/
	public count: number;
	/**最大数量*/
	public maxCount: number;
	/** 尾部位置X*/
	public tailX: number;
	/** 弹药*/
	public ammo: number;
	/**buff列表*/
	public bufferDic: {};
}