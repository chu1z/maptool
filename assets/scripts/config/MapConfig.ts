export interface MapConfig {
	id: number;
	/**1障碍物 2地形 */
	type: number;
	name: string;
	model: number;
	ground: number;
	size: number;
	/**障碍物位置信息 */
	position: string;
	/**障碍物偏移量 */
	shifting: string;
}