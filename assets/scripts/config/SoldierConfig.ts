export interface SoldierConfig {
	/**自增id */
	id:number;
	/**种族*/
	race:number;
	/**等级*/
	level:number;
	/**名字*/
	name:string;
	/**兵阶*/
	rank:number;
	/**移动类型*/
	moveType:number;
	/**模型*/
	model:number;
	/**攻击类型 */
	atkType:number;
	/**移动力*/
	mobility:number;
	/**战力 */
	nbValue:number;
	/**伤害下限*/
	damageMin:number;
	/**伤害上限 */
	damageMax:number;
	/**攻击 */
	atk:number;
	/**防御*/
	def:number;
	/**生命*/
	hp:number;
	/**速度 */
	speed:number;
	/**弹药数*/
	ammo:number;
	/**领导力*/
	lead:number;
	/**兵种特技*/
	skills:number;

	remarks:string;

	/**体型*/
	shape:number;

}