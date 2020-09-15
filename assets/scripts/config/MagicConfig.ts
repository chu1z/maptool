export interface MagicConfig {
	/**自增id */
	id:number;
	/**魔法id*/
	mid:number;
	/**等级*/
	level:number;
	/**蓝耗*/
	mp:number;
	/**基础倍率*/
	rate:number;
	/**固定值 */
	fix:number;
	/**参数 */
	param:number;
	/**附加效果*/
	buff:number;
	/**是否为群体 */
	aoe:number;
	/**魔法名称 */
	name:string;
}