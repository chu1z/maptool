export default class MathUtil {
	/**
     * 弧度转角度
     *  @param	要转化的弧度值
     *  @return 角度
     */
    public static raToag(r: number): number {
        return r * 180 / Math.PI;
    }

    /**
     * 角度转弧度
     * @param	ag要转化的角度值
     * @return	弧度
     */
    public static agTora(ag: number): number {
        return ag * Math.PI / 180;
    }

    /**
     * 返回两点之间的角度值
     * @param	s	起点坐标
     * @param	d 	终点坐标
     * @return 返回两点之间的角度
     */
    public static pointToag(s: cc.Vec2, d: cc.Vec2): number {
        return MathUtil.raToag(Math.atan2((d.y - s.y), (d.x - s.x)));
    }

    /**
     *将角度转化为360度以内的角度，这样就不会有负角度存在
     * @param	ag
     * @return
     */
    public static agToag(ag: number): number {
        var temp: number = ag % 360;
        if (temp < 0) {
            if (Math.abs(temp) < 180) {
                temp = 360 + temp;
            }
            else {
                temp = Math.abs(temp) - 180;
            }
        }
        return temp;
    }

    /**
     * 二维索引转一维
     * @param	h当前行
     * @param	l当前列
     * @param	ls总共列
     * @return
     */
    public static arr2To1(h: number, l: number, ls: number): number {
        return (h * ls) + l;
    }

    /**
     * 一维索引转二维
     * @param	index一维数组的索引
     * @param	ls总共列
     * @return row行 col列
     */
    public static arr1To2(index: number, ls: number) {
        var h: number = index / ls;
        var l: number = index % ls;
        return { row: h, col: l };
    }

    /**
     * 坐标获取阵列
     * @param	x 坐标X
     * @param	y 坐标Y
     * @return  x 返回列 y返回行
     */
    public static getPoint(x: number, y: number, gwh: number) {
        return { row: parseInt((y / gwh) + ""), col: parseInt((x / gwh) + "") };
    }

    /**
     * 坐标获取阵列一唯索引
     * @param	x 坐标X
     * @param	y 坐标Y
     * @return  index 返回一唯索引
     */
    public static getIndex(x: number, y: number, gwh: number): number {
        return MathUtil.arr2To1(parseInt((y / gwh) + ""), parseInt((x / gwh) + ""), gwh);
    }

}
