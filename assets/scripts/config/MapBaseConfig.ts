export interface MapBaseConfig {
	id: number;//地图ID
	img: number;//资源目录
	data: number;//阻挡配置（可共用）
	width: number;//地图宽度
	height: number;//地图高度
    canCross: number;//是否可以无条件穿人
}