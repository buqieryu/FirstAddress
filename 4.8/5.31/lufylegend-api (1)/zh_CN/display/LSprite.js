/** @language chinese
 * 创建一个新的 LSprite 实例。
 * LSprite 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。
 * @class LSprite
 * @extends LDisplayObjectContainer
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var layer = new LSprite();
 * 		addChild(layer);
 * 		
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer.addChild(bm);
 * 	}
 * @examplelink <p><a href="../../../api/LSprite/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
var LSprite = (function () {
	function LSprite () {
		var s = this;
		LExtends(s, LDisplayObjectContainer, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LSprite
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LSprite";
		s.rotatex;
		s.rotatey;
		/** @language chinese
		 * [只读] 指定属于此 sprite 的 LGraphics 对象，在此 sprite 中可执行矢量绘图命令。
		 * @property graphics
		 * @type LGraphics
		 * @since 1.0.0
		 * @example
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LSprite/graphics.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.graphics = new LGraphics();
		s.graphics.parent = s;
		s.box2dBody = null;
		/** @language chinese
		 * 用于碰撞的形状列表
		 * @property shapes
		 * @type Array
		 * @since 1.9.0
		 * @example
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapdata = new LBitmapData(event.currentTarget); 
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 	
		 * 		layer = new LSprite();
		 * 		layer.addChild(bitmap);
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.addShape(LShape.VERTICES, [[180, 20], [210, 40], [210, 60], [120, 110], [35, 100]]);
		 * 		layer.addShape(LShape.VERTICES, [[120, 110], [140, 120], [140, 150], [110, 160], [35, 120], [35, 100]]);
		 * 		addChild(layer);
		 * 	
		 * 		layer.addEventListener(LEvent.ENTER_FRAME, onframe);
		 * 	}
		 * 	function onframe (e) {
		 * 		if (layer.hitTestPoint(mouseX, mouseY)) {
		 * 			layer.alpha = 0.5;
		 * 		} else {
		 * 			layer.alpha = 1;
		 * 		}
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/shapes.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.shapes = new Array();
		/** @language chinese
		 * <p>用户拖动该对象时的拖动范围。</p>
		 * <p>LRectangle对象的x，y分别是对象可以拖动的起始坐标，width，height分别表示从起始坐标开始可以拖动的范围。</p>
		 * @property dragRange
		 * @type LRectangle
		 * @since 1.9.8
		 * @public
		 */
		s.dragRange = null;
		/** @language chinese
		 * <p>表示当指针滑过sprite时是否显示的指针光标。</p>
		 * @property useCursor
		 * @type String
		 * @default null
		 * @since 1.9.10
		 * @public
		 * @example
		 * 	var layer01 = new LSprite();
		 * 	layer01.useCursor = "pointer";
		 * 	addChild(layer01);
		 * 	var bm01 = new LBitmap(new LBitmapData("#FF0000", 0, 0, 100, 100));
		 * 	layer01.addChild(bm01);
		 * @examplelink <p><a href="../../../api/LSprite/useCursor.html" target="_blank">测试链接</a></p>
		 */
		s.useCursor = null;
	}
	var p = {
		/** @language chinese
		 * 使用Box2dWeb的时候，需要用setRotate来设定角度
		 * @method setRotate
		 * @param {float} angle 角度。
		 * @since 1.4.0
		 * @public
		 */
		setRotate : function (angle) {
			var s = this;
			if (s.box2dBody) {
				s.box2dBody.SetAngle(angle);
			} else {
				s.rotate = angle;
			}
		},
		_rotateReady : function () {
			var s = this;
			if (s.box2dBody) {
				if ((typeof s.rotatex) == UNDEFINED) {
					s.getRotateXY();
				}
				s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
				s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
				s.rotate = s.box2dBody.GetAngle();
			}
		},
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show(c);
			LGlobal.show(s.childList, c);
			s._ll_debugShape(c);
		},
		/** @language chinese
		 * 允许用户拖动指定的 LSprite。LSprite 将一直保持可拖动，直到通过调用 LSprite.stopDrag() 方法来明确停止。
		 * @method startDrag
		 * @param {int} touchPointID 分配给触摸点的整数(触摸设备)。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/startDrag.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.9
		 */
		startDrag : function (touchPointID) {
			var s = this;
			if (s.ll_dragStart) {
				return;
			}
			s.ll_touchPointID = touchPointID;
			s.ll_dragGlobalPoint = s.parent.localToGlobal(new LPoint(s.x, s.y));
			s.ll_dragMX = mouseX;
			s.ll_dragMY = mouseY;
			s.ll_dragStart = true;
			LGlobal.dragList.push(s);
		},
		/** @language chinese
		 * 结束 startDrag() 方法。
		 * @method stopDrag
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	function main(){
		 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
		 * 		for(var i=0;i<3;i++){
		 * 			var child = new LSprite();
		 * 			child.x = 250*i;
		 * 			child.graphics.drawRect(2,"#ff0000",[0,0,100,100],true,"#ff0000");
		 * 			child.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
		 * 			child.addEventListener(LMouseEvent.MOUSE_UP,onup);
		 * 			addChild(child);
		 * 		}
		 * 	}
		 * 	function ondown(e){
		 * 		e.clickTarget.startDrag(e.touchPointID);
		 * 	}
		 * 	function onup(e){
		 * 		e.clickTarget.stopDrag();
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/stopDrag.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.9
		 */
		stopDrag : function () {
			var s = this, i, l;
			for (i = 0, l = LGlobal.dragList.length; i < l; i++) {
				if (s.objectIndex == LGlobal.dragList[i].objectIndex) {
					s.ll_dragStart = false;
					LGlobal.dragList.splice(i, 1);
					break;
				}
			}
		},
		getRotateXY : function (w, h) {
			var s = this;
			if (!w || !h) {
				w = s.getWidth();
				h = s.getHeight();
			}
			s.rotatex = w / 2;
			s.rotatey = h / 2;
		},
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * 	trace("width : " + layer.getWidth());
		 * @examplelink <p><a href="../../../api/LSprite/getWidth.html" target="_blank">测试链接</a></p>
		 */
		getWidth : function (maskSize) {
			var s = this, i, l, o, a, b, mx, mw,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.x;
				if (typeof o._startX == "function") {
					a=o._startX(maskSize);
				}
				b = a + o.getWidth(maskSize);
				if (a < left) {
					left = a;
				}
				if (b > right) {
					right = b;
				}
			}
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				mw = s.mask.getWidth();
				if (left < mx) {
					left = mx;
				}
				if (right > mx + mw) {
					right = mx + mw;
				}
				s.ll_left = left;
				s.ll_right = right;
			}else{
				s.ll_left = s.x + left;
				s.ll_right = s.x + right;
			}
			return (right - left) * s.scaleX;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * 	trace("height : " + layer.getHeight());
		 * @examplelink <p><a href="../../../api/LSprite/getHeight.html" target="_blank">测试链接</a></p>
		 */
		getHeight : function (maskSize) {
			var s = this, i, l, o, a, b, my, mh,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.y;
				if (typeof o._startY == "function") {
					a=o._startY(maskSize);
				}
				b = a + o.getHeight(maskSize);
				if (a < top) {
					top = a;
				}
				if (b > bottom) {
					bottom = b;
				}
			}
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				mh = s.mask.getHeight();
				if (top < my) {
					top = my;
				}
				if (bottom > my + mh) {
					bottom = my + mh;
				}
				s.ll_top = top;
				s.ll_bottom = bottom;
			}else{
				s.ll_top = s.y + top;
				s.ll_bottom = s.y + bottom;
			}
			return (bottom - top) * s.scaleY;
		},
		_startX : function (maskSize) {
			var s = this;
			s.getWidth(maskSize);
			return s.ll_left;
		},
		startX : function (maskSize) {
			var s = this;
			return s._startX(maskSize) * s.scaleX;
		},
		_startY : function (maskSize) {
			var s = this;
			s.getHeight(maskSize);
			return s.ll_top;
		},
		startY : function (maskSize) {
			var s = this;
			return s._startY(maskSize) * s.scaleY;
		},
		_ll_loopframe : function () {
			this.dispatchEvent(LEvent.ENTER_FRAME);
		},
		/** @language chinese
		 * 返回一个LSprite的克隆对象。
		 * @method clone
		 * @return {LSprite} 一个新的 LSprite 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">测试链接</a></p>
		 */
		clone : function () {
			var s = this, a = new LSprite(), c, o, i, l;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			a.childList.length = 0;
			for (i = 0, l = s.childList.length; i < l; i++) {
				c = s.childList[i];
				if (c.clone) {
					o = c.clone();
					o.parent = a;
					a.childList.push(o);
				}
			}
			return a;
		},
		_mevent : function (type) {
			var s = this, k;
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					return true;
				}
			}
			return false;
		},
		ll_dispatchMouseEvent : function (type, e, cd, ox, oy) {
			var s = this;
			if (!s.mouseEnabled) {
				return;
			}
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					e.selfX = (ox - (s.x * cd.scaleX + cd.x)) / (cd.scaleX * s.scaleX);
					e.selfY = (oy - (s.y * cd.scaleY + cd.y)) / (cd.scaleY * s.scaleY);
					e.currentTarget = e.clickTarget = s;
					if (!e.target) {
						e.target = s;
					}
					o.listener(e, s);
				}
			}
		},
		ll_mouseout : function (e, type, cd, ox, oy) {
			var s = this;
			if (type == LMouseEvent.MOUSE_MOVE && s.ll_mousein) {
				s.ll_mousein = false;
				if (s._mevent(LMouseEvent.MOUSE_OUT)) {
					s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OUT, e, cd, ox, oy);
				}
				if (s.mouseChildren) {
					for (var k = s.childList.length - 1; k >= 0; k--) {
						if (s.childList[k].mouseEvent && s.childList[k].ll_mouseout) {
							s.childList[k].ll_mouseout(e, type, cd, ox, oy);
						}
					}
				}
			}
		},
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this, i, k, ox = e.offsetX, oy = e.offsetY, on, mc;
			if (!s.visible) {
				return false;
			}
			if (cd == null) {
				cd = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			on = s.ismouseon(e, cd);
			if (on) {
				if(LGlobal.os == OS_PC && s.useCursor && type == LMouseEvent.MOUSE_MOVE){
					LGlobal.cursor = s.useCursor;
				}
				if (type == LMouseEvent.MOUSE_MOVE && !s.ll_mousein) {
					s.ll_mousein = true;
					if (s._mevent(LMouseEvent.MOUSE_OVER)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OVER, e, cd, ox, oy);
					}
				}
				if (s.mouseChildren) {
					mc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
					for (k = s.childList.length - 1; k >= 0; k--) {
						if (s.childList[k].mouseEvent) {
							i = s.childList[k].mouseEvent(e, type, mc);
							if (i) {
								e.target = s.childList[k];
								if (type != LMouseEvent.MOUSE_MOVE) {
									break;
								}
							}
						}
					}
					if (s._mevent(type)) {
						s.ll_dispatchMouseEvent(type, e, cd, ox, oy);
					}
				}
				return true;
			} else {
				s.ll_mouseout(e, type, cd, ox, oy);
			}
			return false;
		},
		/** @language chinese
		 * 计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。
		 * @method hitTestPoint
		 * @param {float} x 要测试的此对象的 x 坐标。
		 * @param {float} y 要测试的此对象的 y 坐标。
		 * @return {Boolean} 如果显示对象与指定的点重叠或相交，则为 true；否则为 false。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	var backLayer;
		 * 	var title;
		 * 	function main(){
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 		title = new LTextField();
		 * 		title.size = 18;
		 * 		title.x = 10;
		 * 		title.y = 5;
		 * 		title.text = "hitTestPoint:false";
		 * 		addChild(title);
		 * 		var layer = new LSprite();
		 * 		layer.x = 20;
		 * 		layer.y = 50;
		 * 		layer.graphics.drawRect(0,"#880088",[0,0,100,40],true,"#880088");
		 * 		layer.addShape(LShape.RECT,[0,0,100,40]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 200;
		 * 		layer.y = 100;
		 * 		layer.graphics.drawArc(0,"#880088",[0,0,30,0,2*Math.PI],true,"#880088");
		 * 		layer.addShape(LShape.ARC,[0,0,30]);
		 * 		backLayer.addChild(layer);
		 * 		layer = new LSprite();
		 * 		layer.x = 120;
		 * 		layer.y = 150;
		 * 		layer.graphics.drawVertices(0,"#880088",[[10,10],[50,100],[100,70]],true,"#880088");
		 * 		layer.addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]]);
		 * 		backLayer.addChild(layer);
		 * 	}
		 * 	function onframe(e){
		 * 		for(var i=0;i<backLayer.childList.length;i++){
		 * 			if(backLayer.childList[i].hitTestPoint(mouseX,mouseY)){
		 * 				title.text = "hitTestPoint:true";
		 * 				return;
		 * 			}
		 * 		}
		 * 		title.text = "hitTestPoint:false";
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/hitTestPoint.html" target="_blank">测试链接</a></p>
		 */
		hitTestPoint : function (x, y) {
			var s = this, shapes = s.shapes;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			return s.ismouseonShapes(shapes, x, y);
		},
		/** @language chinese
		 * 计算显示对象的边框，以确定它是否与 obj 显示对象的边框重叠或相交。
		 * @method hitTestObject
		 * @param {LDisplayObject} obj 要测试的显示对象。
		 * @return {Boolean} 如果显示对象的边框相交，则为 true；否则为 false。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = new LSprite();
		 * 	circle2.x = 120;
		 * 	circle2.graphics.drawRect(1,"#FF0000",[0,0,100,100],true,"#FF0000");
		 * 	var circle3 = new LSprite();
		 * 	circle3.x = 60;
		 * 	circle3.y = 60;
		 * 	circle3.graphics.drawRect(1,"#008800",[0,0,100,100],true,"#008800");
		 * 	container.addChild(circle1);
		 * 	container.addChild(circle2);
		 * 	container.addChild(circle3);
		 * 	trace(circle1.hitTestObject(circle2));//false
		 * 	trace(circle1.hitTestObject(circle3));//true
		 * 	trace(circle2.hitTestObject(circle3));//true
		 * @examplelink <p><a href="../../../api/LSprite/hitTestObject.html" target="_blank">测试链接</a></p>
		 */
		hitTestObject : function (obj) {
			var s = this, shapes = s.shapes, shapes1 = obj.shapes, m, m1, j, child, j1, child1, vo1, v1;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			if (!shapes1 || shapes1.length == 0) {
				obj.getWidth();
				obj.getHeight();
				shapes1 = [{"type" : LShape.RECT, "arg" : [obj.ll_left - obj.x, obj.ll_top - obj.y, obj.ll_right - obj.ll_left, obj.ll_bottom - obj.ll_top]}];
			}
			m = s.getRootMatrix();
			m1 = obj.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				v1 = s._changeShape(child.type, child.arg, m);
				for (j1 = shapes1.length - 1; j1 >= 0; j1--) {
					child1 = shapes1[j1];
					vo1 = obj._changeShape(child1.type, child1.arg, m1);
					if (child.type == LShape.VERTICES || child.type == LShape.RECT) {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygon(v1, vo1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if(LGlobal.hitTestPolygonArc(v1, vo1)) {
								return true;
							}
						}
					} else {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygonArc(vo1, v1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if (Math.sqrt((v1[0] - vo1[0]) * (v1[0] - vo1[0]) + (v1[1] - vo1[1]) * (v1[1] - vo1[1])) < v1[2] + vo1[2]) {
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		/** @language chinese
		 * <p>添加碰撞形状，指定碰撞的范围。如果没有添加碰撞形状，则会默认使用最大矩形范围来碰撞检测。</p>
		 * <p>添加矩形 : addShape(LShape.RECT,[20,140,200,100])</p>
		 * <p>添加圆形 : addShape(LShape.ARC,[110,80,60])</p>
		 * <p>添加多边形 : addShape(LShape.VERTICES,[[10,10],[50,100],[100,70]])</p>
		 * @method addShape
		 * @param {string} type 形状的类型.
		 * @param {Array} arg 形状参数.
		 * @return {Array} 被添加的形状组.
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	LInit(20,"legend",800,450,main);
		 * 	function main () {
		 * 		LGlobal.setDebug(true);
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapData = new LBitmapData(event.currentTarget);//width:240,height:240
		 * 		var bitmap01 = new LBitmap(bitmapData);
		 * 		var layer01 = new LSprite();
		 * 		addChild(layer01);
		 * 		layer01.addChild(bitmap01);
		 * 		var rect1 = new LSprite();
		 * 		rect1.x = 180;
		 * 		rect1.graphics.drawRect(2,"#FF0000",[0,0,100,100]);
		 * 		addChild(rect1);
		 * 		var bitmap02 = new LBitmap(bitmapData);
		 * 		var layer02 = new LSprite();
		 * 		layer02.x = 300;
		 * 		addChild(layer02);
		 * 		layer02.addChild(bitmap02);
		 * 		layer02.addShape(LShape.ARC,[110,80,60]);
		 * 		layer02.addShape(LShape.RECT,[20,140,200,100]);
		 * 		var rect2 = new LSprite();
		 * 		rect2.x = 480;
		 * 		rect2.graphics.drawRect(2,"#FF0000",[0,0,100,100]);
		 * 		addChild(rect2);
		 * 		var rect3 = new LSprite();
		 * 		rect3.x = 480;
		 * 		rect3.y = 120;
		 * 		rect3.graphics.drawRect(2,"#FF0000",[0,0,100,100]);
		 * 		addChild(rect3);
		 * 		trace(layer01.hitTestObject(rect1));//true
		 * 		trace(layer02.hitTestObject(rect2));//false
		 * 		trace(layer02.hitTestObject(rect3));//true
		 * 	}
		 * @examplelink <p><a href="../../../api/LSprite/addShape.html" target="_blank">测试链接</a></p>
		 */
		addShape : function (type, arg) {
			var s = this;
			if (type == LShape.VERTICES && arg.length < 3) {
				return;
			}
			s.shapes.push({"type" : type, "arg" : arg});
			return s.shapes;
		},
		/** @language chinese
		 * <p>添加碰撞形状组，指定碰撞的范围。</p>
		 * @method addShapes
		 * @param {Array} shapes 形状组.
		 * <p>例如 : [{"type" : LShape.RECT, "arg" : [20,140,200,100]},{"type" : LShape.ARC, "arg" : [110,80,60]},{"type" : LShape.VERTICES, "arg" : [[10,10],[50,100],[100,70]]}]</p>
		 * @since 1.9.8
		 * @public
		 */
		addShapes : function (shapes) {
			var s = this;
			if(s.shapes.length == 0){
				s.shapes = shapes;
			}else{
				s.shapes = s.shapes.concat(shapes);
			}
		},
		/** @language chinese
		 * <p>清空所有碰撞形状。</p>
		 * @method clearShape
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var bitmapData = new LBitmapData(event.currentTarget);//width:240,height:240
		 * 	var bitmap01 = new LBitmap(bitmapData);
		 * 	var layer01 = new LSprite();
		 * 	addChild(layer01);
		 * 	layer01.addChild(bitmap01);
		 * 	layer01.addShape(LShape.ARC,[110,80,60]);
		 * 	layer01.addShape(LShape.RECT,[20,140,200,100]);
		 * 	var rect1 = new LSprite();
		 * 	rect1.x = 180;
		 * 	rect1.graphics.drawRect(2,"#FF0000",[0,0,100,100]);
		 * 	addChild(rect1);
		 * 	trace(layer01.hitTestObject(rect1));//false
		 * 	layer01.clearShape()
		 * 	trace(layer01.hitTestObject(rect1));//true
		 * @examplelink <p><a href="../../../api/LSprite/clearShape.html" target="_blank">测试链接</a></p>
		 */
		clearShape : function () {
			this.shapes = [];
		},
		_ll_debugShape : function (c) {
			var s = this, i, l, child, arg, j, ll;
			if (!LGlobal.traceDebug || !s.shapes || s.shapes.length == 0) {
				return;
			}
			for (i = 0, l = s.shapes.length; i < l; i++) {
				child = s.shapes[i];
				c = c || LGlobal.canvas;
				arg = child.arg;
				c.beginPath();
				if (child.type == LShape.RECT) {
					c.rect(arg[0], arg[1], arg[2], arg[3]);
				}else if (child.type == LShape.ARC) {
					c.arc(arg[0], arg[1], arg[2], 0, 2*Math.PI);
				}else if (child.type == LShape.VERTICES) {
					c.moveTo(arg[0][0], arg[0][1]);
					for (j = 1, ll = arg.length; j < ll; j++) {
						c.lineTo(arg[j][0], arg[j][1]);
					};
					c.lineTo(arg[0][0], arg[0][1]);
				}
				c.closePath();
				c.strokeStyle = "#00FF00";
				c.stroke();
			}
		},
		ismouseon : function (e, cd) {
			var s = this;
			if (!s.visible || e==null) {
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
			if(s.shapes && s.shapes.length > 0){
				return s.ismouseonShapes(s.shapes, e.offsetX, e.offsetY);
			}
			var k, i = false, l = s.childList, sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			for (k = l.length - 1; k >= 0; k--) {
				if (l[k].ismouseon) {
					i = l[k].ismouseon(e, sc);
				}
				if (i) {
					e.target = s.childList[k];
					break;
				}
			}
			if (!i) {
				i = s.graphics.ismouseon(e, sc);
			}
			return i;
		},
		/** @language chinese
		 * <p>清空所有图形以及事件。</p>
		 * @method die
		 * @since 1.0.0
		 * @public
		 */
		die : function () {
			var s = this, i, c, l;
			s.graphics.clear();
			s.removeAllEventListener();
			s.stopDrag();
			if (s.box2dBody) {
				s.clearBody();
			}
			for (i = 0, c = s.childList, l = c.length; i < l; i++) {
				if (c[i].die) {
					c[i].die();
				}
			}
		}
		/** @language chinese
		 * <p>LBox2d相关。</p>
		 * <p>给物体添加鼠标关节,响应鼠标拖拽物体。</p>
		 * <p>使用lufylegend.js引擎后，鼠标拖拽变得非常简便了，只需要调用LSprite对象的setBodyMouseJoint方法即可。</p>
		 * <p>一个LSprite对象通过addBodyCircle，addBodyPolygon等方法，会将其变为一个Box2d物理世界里的一个物体，如果调用它的setBodyMouseJoint(true)函数，可以让其支持鼠标拖拽。</p>
		 * @method setBodyMouseJoint
		 * @param {Boolean} value 是否支持鼠标拖拽
		 * @since 1.4.0
		 * @public
		 */
		/** @language chinese
		 * <p>LBox2d相关。</p>
		 * <p>设定圆形body。</p>
		 * @method addBodyCircle
		 * @param {float} radius 半径
		 * @param {float} cx 圆心坐标x
		 * @param {float} cy 圆心坐标y
		 * @param {int} type 是否动态(1或0)
		 * @param {float} density 密度
		 * @param {float} friction 摩擦
		 * @param {float} restitution 弹性
		 * @return {b2Body} 返回一个被创建的box2d的body
		 * @since 1.4.0
		 * @public
		 */
		/** @language chinese
		 * <p>LBox2d相关。</p>
		 * <p>设定矩形body。</p>
		 * @method addBodyPolygon
		 * @param {float} width 矩形宽
		 * @param {float} height 矩形高
		 * @param {int} type 是否动态(1或0)
		 * @param {float} density 密度
		 * @param {float} friction 摩擦
		 * @param {float} restitution 弹性
		 * @return {b2Body} 返回一个被创建的box2d的body
		 * @since 1.4.0
		 * @public
		 */
		/** @language chinese
		 * <p>LBox2d相关。</p>
		 * <p>以定点数组形式设定任意形状的body。</p>
		 * @method addBodyVertices
		 * @param {float} vertices 顶点数组
		 * @param {float} cx 中心坐标x
		 * @param {float} cy 中心坐标y
		 * @param {int} type 是否动态(1或0)
		 * @param {float} density 密度
		 * @param {float} friction 摩擦
		 * @param {float} restitution 弹性
		 * @return {b2Body} 返回一个被创建的box2d的body
		 * @since 1.4.0
		 * @public
		 */
		/** @language chinese
		 * <p>LBox2d相关。</p>
		 * <p>移除已设定的body。</p>
		 * <p>一个LSprite对象通过addBodyCircle，addBodyPolygon等方法，会将其变为一个Box2d物理世界里的一个物体，它的运动开始遵循牛顿运动定律，当调用它的clearBody()函数后，会将其变回到普通的LSprite对象，并且被加入到该对象上的body也一起被移除。</p>
		 * @method clearBody
		 * @since 1.4.0
		 * @public
		 */
	};
	for (var k in p) {
		LSprite.prototype[k] = p[k];
	}
	return LSprite;
})();