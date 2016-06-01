/** @language chinese
 * 创建新的 LShape 对象。
 * LShape 类包括 graphics 属性，该属性使您可以从 LGraphics 类访问方法。
 * @class LShape
 * @extends LInteractiveObject
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var shape = new LShape();
 * 		addChild(shape);
 * 		shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
 * 	}
 * @examplelink <p><a href="../../../api/LShape/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.5
 * @public
 */
var LShape = (function () {
	function LShape () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LShape
		 * @since 1.8.5
		 * @public
		 */
		s.type = "LShape";
		/** @language chinese
		 * [只读] 指定属于此 sprite 的 LGraphics 对象，在此 sprite 中可执行矢量绘图命令。
		 * @property graphics
		 * @type LGraphics
		 * @since 1.8.5
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LShape/graphics.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.graphics = new LGraphics();
		s.graphics.parent = s;
	}
	LShape.POINT = "point";
	LShape.LINE = "line";
	LShape.ARC = "arc";
	LShape.RECT = "rect";
	LShape.VERTICES = "vertices";
	var p = {
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show(c);
		},
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.8.5
		 * @public
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * 	shape.graphics.drawRect(2, "#ff0000", [20, 10, 110, 70], true, "#888888");
		 * 	trace("width : " + shape.getWidth());
		 * @examplelink <p><a href="../../../api/LShape/getWidth.html" target="_blank">测试链接</a></p>
		 */
		getWidth : function (maskSize) {
			var s = this, mx, mw,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				mw = s.mask.getWidth();
				if (left < mx) {
					left = mx;
				}
				if (right > mx + mw) {
					right = mx + mw;
				}
			}
			s.ll_left = s.x + left;
			s.ll_right = s.x + right;
			return (right - left) * s.scaleX;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.8.5
		 * @public
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * 	shape.graphics.drawRect(2, "#ff0000", [20, 10, 110, 70], true, "#888888");
		 * 	trace("height : " + shape.getHeight());
		 * @examplelink <p><a href="../../../api/LShape/getHeight.html" target="_blank">测试链接</a></p>
		 */
		getHeight : function (maskSize) {
			var s = this, my, mh,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				mh = s.mask.getHeight();
				if (top < my) {
					top = my;
				}
				if (bottom > my + mh) {
					bottom = my + mh;
				}
			}
			s.ll_top = s.y + top;
			s.ll_bottom = s.y + bottom;
			return (bottom - top) * s.scaleY;
		},
		_startX : function () {
			var s = this;
			s.getWidth();
			return s.ll_left;
		},
		startX : function () {
			var s = this;
			return s._startX() * s.scaleX;
		},
		_startY : function () {
			var s = this;
			s.getHeight();
			return s.ll_top;
		},
		startY : function () {
			var s = this;
			return s._startY() * s.scaleY;
		},
		/** @language chinese
		 * 返回一个LShape的克隆对象。
		 * @method clone
		 * @return {LShape} 一个新的 LShape 对象，它与原始对象相同.
		 * @since 1.8.5
		 * @public
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * 	shape.graphics.drawRect(2, "#ff0000", [20, 10, 110, 70], true, "#888888");
		 * 	var shape02 = shape.clone();
		 * 	shape02.y = 150;
		 * 	addChild(shape02);
		 * @examplelink <p><a href="../../../api/LShape/clone.html" target="_blank">测试链接</a></p>
		 */
		clone : function () {
			var s = this, a = new LShape(), c, o;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			return a;
		},
		ismouseon : function (e, cd) {
			var s = this, i = false, sc;
			if (!s.visible || e == null) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			if (s.graphics) {
				i = s.graphics.ismouseon(e, sc);
			}
			return i;
		},
		/** @language chinese
		 * <p>清空所使用的内存。</p>
		 * @method die
		 * @since 1.8.5
		 * @public
		 */
		die : function () {
			var s = this;
			s.graphics.clear();
		}
	};
	for (var k in p) {
		LShape.prototype[k] = p[k];
	}
	return LShape;
})();
/** @language chinese
 * 不可用。
 * @event LEvent.ENTER_FRAME
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_DOWN
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_UP
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_MOVE
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_OUT
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_OVER
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.DOUBLE_CLICK
 */