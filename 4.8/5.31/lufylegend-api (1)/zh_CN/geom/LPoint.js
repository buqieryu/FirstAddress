/** @language chinese
 * 创建一个新点。LPoint 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
 * @class LPoint
 * @constructor
 * @param {float} x 水平坐标。
 * @param {float} y 垂直坐标。
 * @example
 * 	var myPoint = new LPoint(100,100);
 * @since 1.7.7
 * @public
 */
var LPoint = (function () {
	function LPoint (x, y) {
		var s = this;
		/** @language chinese
		 * 该点的水平坐标。
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		s.x = x;
		/** @language chinese
		 * 该点的垂直坐标。
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.7.7
		 * @public
		 */
		s.y = y;
	}
	/** @language chinese
	 * [静态]返回 p1 和 p2 之间的距离。
	 * @method distance
	 * @static
	 * @param {LPoint} p1 第一个点
	 * @param {LPoint} p2 第二个点。
	 * @return {float} 第一个点和第二个点之间的距离。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.distance = function (p1, p2) {
		return LPoint.distance2(p1.x, p1.y, p2.x, p2.y);
	};
	/** @language chinese
	 * [静态]返回 p1 和 p2 之间的距离。
	 * @method distance2
	 * @static
	 * @param {LPoint} x1 第一个点的水平坐标。
	 * @param {LPoint} y1 第一个点的垂直坐标。
	 * @param {LPoint} x2 第二个点的水平坐标。
	 * @param {LPoint} y2 第二个点的垂直坐标。
	 * @return {float} 第一个点和第二个点之间的距离。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.distance2 = function (x1, y1, x2, y2) {
		var x = x1 - x2, y = y1 - y2;
		return Math.sqrt(x * x + y * y);
	};
	/** @language chinese
	 * [静态]确定两个指定点之间的点。参数 f 确定新的内插点相对于参数 p1 和 p2 指定的两个端点所处的位置。参数 f 的值越接近 1.0，则内插点就越接近第一个点（参数 p1）。参数 f 的值越接近 0，则内插点就越接近第二个点（参数 p2）。
	 * @method interpolate
	 * @static
	 * @param {LPoint} p1 第一个点
	 * @param {LPoint} p2 第二个点。
	 * @param {float} f 两个点之间的内插级别。表示新点将位于 p1 和 p2 连成的直线上的什么位置。如果 f=1，则返回 p1；如果 f=0，则返回 p2。
	 * @return {LPoint} 新的内插点。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.interpolate = function (p1, p2, f) {
		return new LPoint(p1.x + (p2.x - p1.x) * (1 - f), p1.y + (p2.y - p1.y) * (1 - f));
	};
	/** @language chinese
	 * [静态]将一对极坐标转换为笛卡尔点坐标。
	 * @method polar
	 * @static
	 * @param {float} len 极坐标对的长度。
	 * @param {float} angle 极坐标对的角度（以弧度表示）。
	 * @return {LPoint} 笛卡尔点。
	 * @since 1.8.5
	 * @public
	 */
	LPoint.polar = function (l, a) {
		return new LPoint(l * Math.cos(a), l * Math.sin(a));
	};
	LPoint.prototype = {
		toString : function () {
			return '[object LPoint(' + this.x + ',' + this.y + ')]';
		},
		/** @language chinese
		 * 返回从 (0,0) 到此点的线段长度。
		 * @method length
		 * @return {float} 从 (0,0) 到此点的线段长度。
		 * @since 1.8.5
		 * @public
		 */
		length : function () {
			return LPoint.distance2(this.x, this.y, 0, 0);
		},
		/** @language chinese
		 * 将另一个点的坐标添加到此点的坐标以创建一个新点。
		 * @method add
		 * @param {LPoint} v 要添加的点。
		 * @return {LPoint} 新点。
		 * @since 1.8.5
		 * @public
		 */
		add : function (v) {
			return new LPoint(this.x + v.x, this.y + v.y);
		},
		/** @language chinese
		 * 创建此 LPoint 对象的副本。
		 * @method clone
		 * @return {LPoint} 新的 LPoint 对象。
		 * @since 1.8.5
		 * @public
		 */
		clone : function () {
			return new LPoint(this.x, this.y);
		},
		/** @language chinese
		 * 将 LPoint 的成员设置为指定值。
		 * @method setTo
		 * @param {float} x 要将 LPoint 设置为的x坐标值。
		 * @param {float} y 要将 LPoint 设置为的y坐标值。
		 * @since 1.8.5
		 * @public
		 */
		setTo : function (x, y) {
			this.x = x, this.y = y;
		},
		/** @language chinese
		 * 将源 LPoint 对象中的所有点数据复制到调用方 LPoint 对象中。
		 * @method copyFrom
		 * @param {LPoint} sourcePoint 要从中复制数据的 Point 对象。
		 * @since 1.8.5
		 * @public
		 */
		copyFrom : function (s) {
			this.setTo(s.x, s.y);
		},
		/** @language chinese
		 * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
		 * @method equals
		 * @param {LPoint} toCompare 要比较的点。
		 * @return {Boolean} 如果该对象与此 LPoint 对象相同，则为 true 值，如果不相同，则为 false。
		 * @since 1.8.5
		 * @public
		 */
		equals : function (t) {
			return this.x == t.x && this.y == t.y;
		},
		/** @language chinese
		 * 将 (0,0) 和当前点之间的线段缩放为设定的长度。
		 * @method normalize
		 * @param {float} thickness 缩放值。例如，如果当前点为 (0,5) 并且您将它规范化为 1，则返回的点位于 (0,1) 处。
		 * @since 1.8.5
		 * @public
		 */
		normalize : function (t) {
			var s = this, scale = t / s.length();
			s.x *= scale, s.y *= scale;
		},
		/** @language chinese
		 * 按指定量偏移 LPoint 对象。dx 的值将添加到 x 的原始值中以创建新的 x 值。dy 的值将添加到 y 的原始值中以创建新的 y 值。
		 * @method offset
		 * @param {float} dx 水平坐标 x 的偏移量。
		 * @param {float} dy 垂直坐标 y 的偏移量。
		 * @since 1.8.5
		 * @public
		 */
		offset : function (dx, dy) {
			this.x += dx;
			this.y += dy;
		},
		/** @language chinese
		 * 从此点的坐标中减去另一个点的坐标以创建一个新点。
		 * @method subtract
		 * @param {LPoint} v 要减去的点。
		 * @return {LPoint} 新点。
		 * @since 1.8.5
		 * @public
		 */
		subtract : function (v) {
			return new LPoint(this.x  - v.x, this.y - v.y);
		}
	};
	return LPoint;
})();