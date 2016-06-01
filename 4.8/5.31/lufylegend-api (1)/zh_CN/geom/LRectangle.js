/** @language chinese
 * <p>LRectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。</p>
 * <p>LRectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。</p>
 * @class LRectangle
 * @constructor
 * @param {float} x 矩形左上角的 x 坐标。
 * @param {float} y 矩形左上角的 y 坐标。
 * @param {float} width 矩形的宽度（以像素为单位）。
 * @param {float} height 矩形的高度（以像素为单位）。
 * @since 1.4.1
 * @public
 */
var LRectangle = (function () {
	function LRectangle (x, y, w, h) {
		var s = this;
		s.x = x;
		s.y = y;
		s.width = w;
		s.height = h;
		s.setRectangle();
	}
	LRectangle.prototype = {
		setRectangle : function () {
			var s = this;
			s.bottom = s.y + s.height;
			s.right = s.x + s.width;
			s.left = s.x;
			s.top = s.y;
		},
		/** @language chinese
		 * 返回一个新的 LRectangle 对象，其 x、y、width 和 height 属性的值与原始 LRectangle 对象的对应值相同。
		 * @method clone
		 * @return {LRectangle} 新的 LRectangle 对象，其 x、y、width 和 height 属性的值与原始 LRectangle 对象的对应值相同。
		 * @since 1.4.1
		 * @public
		 */
		clone : function () {
			var s = this;
			return new LRectangle(s.x, s.y, s.width, s.height);
		},
		/** @language chinese
		 * 确定由此 LRectangle 对象定义的矩形区域内是否包含指定的点。
		 * @method contains
		 * @param {float} x 点的 x 坐标（水平位置）。
		 * @param {float} y 点的 y 坐标（垂直位置）。
		 * @return {Boolean} 如果 LRectangle 对象包含指定的点，则值为 true；否则为 false。
		 * @since 1.4.1
		 * @public
		 */
		contains : function (x, y) {
			var s = this;
			return x >= s.x && x <= s.right && y >= s.y && y <= s.bottom;
		},
		/** @language chinese
		 * 确定此 LRectangle 对象内是否包含由 rect 参数指定的 LRectangle 对象。如果一个 LRectangle 对象完全在另一个 LRectangle 的边界内，我们说第二个 LRectangle 包含第一个 LRectangle。
		 * @method containsRect
		 * @param {LRectangle} rect 所检查的 LRectangle 对象。
		 * @return {Boolean} 如果此 LRectangle 对象包含您指定的 LRectangle 对象，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		containsRect : function (rect) {
			var s = this;
			return rect.x >= s.x && rect.right <= s.right && rect.y >= s.y && rect.bottom <= s.bottom;
		},
		/** @language chinese
		 * 确定在 toCompare 参数中指定的对象是否等于此 LRectangle 对象。此方法将某个对象的 x、y、width 和 height 属性与此 LRectangle 对象所对应的相同属性进行比较。
		 * @method equals
		 * @param {LRectangle} toCompare 要与此 LRectangle 对象进行比较的矩形。
		 * @return {Boolean} 如果对象具有与此 LRectangle 对象完全相同的 x、y、width 和 height 属性值，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		equals : function (v) {
			var s = this;
			return v.x == s.x && v.width == s.width && v.y == s.y && v.height == s.height;
		},
		/** @language chinese
		 * 按指定量增加 LRectangle 对象的大小（以像素为单位）。保持 LRectangle 对象的中心点不变，使用 dx 值横向增加它的大小，使用 dy 值纵向增加它的大小。
		 * @method inflate
		 * @param {float} dx LRectangle 对象横向增加的值。
		 * @param {float} dy LRectangle 纵向增加的值。
		 * @since 1.4.1
		 * @public
		 */
		inflate : function (dx, dy) {
			var s = this;
			s.width += dx;
			s.height += dy;
			s.setRectangle();
		},
		/** @language chinese
		 * 如果在 toIntersect 参数中指定的 LRectangle 对象与此 LRectangle 对象相交，则返回交集区域作为 LRectangle 对象。如果矩形不相交，则此方法返回一个空的 LRectangle 对象，其属性设置为 0。
		 * @method intersection
		 * @param {LRectangle} toIntersect 要对照比较以查看其是否与此 LRectangle 对象相交的 LRectangle 对象。
		 * @return {Boolean} 等于交集区域的 LRectangle 对象。如果该矩形不相交，则此方法返回一个空的 LRectangle 对象；即，其 x、y、width 和 height 属性均设置为 0 的矩形。
		 * @since 1.4.1
		 * @public
		 */
		intersection : function (t) {
			var s = this;
			var ix = s.x > t.x ? s.x : t.x;
			var iy = s.y > t.y ? s.y : t.y;
			var ax = s.right > t.right ? t.right : s.right;
			var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
			if (ix <= ax && iy <= ay) {
				return new LRectangle(ix, iy, ax, ay);
			}else{
				return new LRectangle(0, 0, 0, 0);
			}
		},
		/** @language chinese
		 * 确定在 toIntersect 参数中指定的对象是否与此 LRectangle 对象相交。此方法检查指定的 LRectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 LRectangle 对象相交。
		 * @method intersects
		 * @param {LRectangle} toIntersect 要与此 LRectangle 对象比较的 LRectangle 对象。
		 * @return {Boolean} 如果指定的对象与此 LRectangle 对象相交，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		intersects : function (t) {
			var s = this;
			var ix = s.x > t.x ? s.x : t.x;
			var iy = s.y > t.y ? s.y : t.y;
			var ax = s.right > t.right ? t.right : s.right;
			var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
			return ix <= ax && iy <= ay;
		},
		/** @language chinese
		 * 确定此 LRectangle 对象是否为空。
		 * @method isEmpty
		 * @return {Boolean} 如果 LRectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
		 * @since 1.4.1
		 * @public
		 */
		isEmpty : function () {
			var s = this;
			return s.x == 0 && s.y == 0 && s.width == 0 && s.height == 0;
		},
		/** @language chinese
		 * 按指定量调整 LRectangle 对象的位置（由其左上角确定）。
		 * @method offset
		 * @param {float} dx 将 LRectangle 对象的 x 值移动此数量。
		 * @param {float} dy 将 LRectangle 对象的 y 值移动此数量。
		 * @since 1.4.1
		 * @public
		 */
		offset : function (dx, dy) {
			var s = this;
			s.x += dx;
			s.y += dy;
			s.setRectangle();
		},
		/** @language chinese
		 * 将 LRectangle 对象的所有属性设置为 0。如果 LRectangle 对象的宽度或高度小于或等于 0，则该对象为空。此方法将 x、y、width 和 height 属性设置为 0。
		 * @method setEmpty
		 * @since 1.4.1
		 * @public
		 */
		setEmpty : function () {
			var s = this;
			s.x = 0;
			s.y = 0;
			s.width = 0;
			s.height = 0;
			s.setRectangle();
		},
		/** @language chinese
		 * 将 LRectangle 的成员设置为指定值。
		 * @method setTo
		 * @param {float} xa 要将 LRectangle 设置为的值。
		 * @param {float} ya 要将 LRectangle 设置为的值。
		 * @param {float} widtha 要将 LRectangle 设置为的值。
		 * @param {float} heighta 要将 LRectangle 设置为的值。
		 * @since 1.4.1
		 * @public
		 */
		setTo : function (xa, ya, w, h) {
			var s = this;
			s.x = xa;
			s.y = ya;
			s.width = w;
			s.height = h;
			s.setRectangle();
		},
		toString : function () {
			var s = this;
			return "[object LRectangle(" + s.x + "," + s.y + "," + s.width + "," + s.height + ")]";
		},
		/** @language chinese
		 * 通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 LRectangle 对象。
		 * @method union
		 * @param {LRectangle} toUnion 要将 LRectangle 设置为的值。
		 * @return {LRectangle} 充当两个矩形的联合的新 LRectangle 对象。
		 * @since 1.4.1
		 * @public
		 */
		union : function (t) {
			var s = this;
			return new LRectangle(s.x > t.x ? t.x : s.x, s.y > t.y ? t.y : s.y, s.right > t.right ? s.right : t.right, s.bottom > t.bottom ? s.bottom : t.bottom);
		}
	};
	return LRectangle;
})();