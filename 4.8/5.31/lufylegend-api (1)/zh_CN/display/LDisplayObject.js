/** @language chinese
 * <p>LDisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时中显示的所有对象。使用 LDisplayObjectContainer 类排列显示列表中的显示对象。LDisplayObjectContainer 对象可以有子显示对象，而其他显示对象（如 LShape 和 LTextField 对象）是“叶”节点，只有父级和同级，没有子级。</p>
 * <p>LDisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵）。</p>
 * <p>LDisplayObject 是一种抽象基类；因此，不能直接调用 LDisplayObject。</p>
 * <p>所有显示对象都继承自 LDisplayObject 类。</p>
 * @class LDisplayObject
 * @extends LEventDispatcher
 * @constructor
 * @since 1.6.0
 * @public
 */
var LDisplayObject = (function () {
	function LDisplayObject () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.name = "instance" + s.objectIndex;
		/** @language chinese
		 * 表示 LDisplayObject 实例相对于父级 LDisplayObjectContainer 本地坐标的 x 坐标。如果该对象位于具有变形的 LDisplayObjectContainer 内，则它也位于包含 LDisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 LDisplayObjectContainer，该 LDisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。对象的坐标指的是注册点的位置。
		 * @property x
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.x = 0;
		/** @language chinese
		 * 表示 LDisplayObject 实例相对于父级 LDisplayObjectContainer 本地坐标的 y 坐标。如果该对象位于具有变形的 LDisplayObjectContainer 内，则它也位于包含 LDisplayObjectContainer 的本地坐标系中。因此，对于逆时针旋转 90 度的 LDisplayObjectContainer，该 LDisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。对象的坐标指的是注册点的位置。
		 * @property y
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.y = 0;
		s.width = 0;
		s.height = 0;
		/** @language chinese
		 * 表示从注册点开始应用的对象的水平缩放比例（百分比）。默认注册点为 (0,0)。1.0 等于 100% 缩放。
		 * @property scaleX
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		s.scaleX = 1;
		/** @language chinese
		 * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。默认注册点为 (0,0)。1.0 是 100% 缩放。
		 * @property scaleY
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @public
		 */
		s.scaleY = 1;
		/** @language chinese
		 * 表示指定对象的 Alpha 透明度值。有效值为 0（完全透明）到 1（完全不透明）。默认值为 1。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
		 * @property alpha
		 * @type float
		 * @default 1
		 * @since 1.6.0
		 * @examplelink <p><a href="../../../api/LDisplayObject/alpha.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.alpha = 1;
		/** @language chinese
		 * 显示对象是否可见。不可见的显示对象已被禁用。例如，如果 LInteractiveObject 实例的 visible=false，则无法单击该对象。
		 * @property visible
		 * @type Boolean
		 * @default true
		 * @since 1.6.0
		 * @public
		 */
		s.visible = true;
		/** @language chinese
		 * 表示 LDisplayObject 实例距其原始方向的旋转程度，以度为单位。从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或减去 360 获得该范围内的值。例如，my_video.rotate = 450语句与 my_video.rotate = 90 是相同的。
		 * @property rotate
		 * @type float
		 * @default 0
		 * @since 1.6.0
		 * @public
		 */
		s.rotate = 0;
		/** @language chinese
		 * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。
		 * @property mask
		 * @type LDisplayObject
		 * @default null
		 * @since 1.6.0
		 * @public
		 * @example
		 * 	function main () {
		 * 	    var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.png", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapdata = new LBitmapData(event.target);  
		 * 		var bitmap = new LBitmap(bitmapdata);
		 * 		addChild(bitmap);
		 * 		var maskObj = new LSprite();
		 * 		maskObj.graphics.drawRect(0, "#ff0000", [10, 10, 150, 100]);
		 * 		bitmap.mask = maskObj;
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObject/mask.html" target="_blank">测试链接</a></p>
		 */
		s.mask = null;
		/** @language chinese
		 * LBlendMode 类中的一个值，用于指定要使用的混合模式。 内部绘制位图的方法有两种。 如果启用了混合模式或外部剪辑遮罩，则将通过向矢量渲染器添加有位图填充的正方形来绘制位图。 如果尝试将此属性设置为无效值，运行时会将此值设置为 LBlendMode.NORMAL。
		 * @property blendMode
		 * @type String
		 * @default null
		 * @since 1.8.0
		 * @public
		 */
		s.blendMode = null;
		/** @language chinese
		 * 包含当前与显示对象关联的每个滤镜对象的索引数组。
		 * @property filters
		 * @type Array
		 * @default null
		 * @since 1.6.0
		 * @public
		 */
		s.filters = null;
		/** @language chinese
		 * <p>一个对象，具有与显示对象的矩阵有关的属性。在 LTransform 类的条目中对特定属性 matrix 进行了说明。</p>
		 * <p>transform 对象的每个属性本身都是一个对象。此概念很重要，因为设置 matrix 对象的新值的唯一方法是，创建新对象并将该对象复制到 transform.matrix 属性。</p>
		 * @property transform
		 * @type LTransform
		 * @since 1.9.8
		 * @public
		 * @example
		 * 	function main () {
		 * 	    var square = new LSprite();
		 * 		square.graphics.drawRect(1, "#ff0000", [0, 0, 150, 100],true);
		 * 		addChild(square);
		 * 		square.addEventListener(LMouseEvent.MOUSE_UP, transformer);
		 * 	}
		 * 	function transformer(event) {
		 * 		var square = event.currentTarget;
		 * 		var tempMatrix = new LMatrix();
		 * 		tempMatrix.skew(0.3, 0).translate(30,50);
		 * 		square.transform.matrix = tempMatrix;
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObject/transform_matrix.html" target="_blank">测试链接</a></p>
		 */
		s.transform = new LTransform();
		/** @language chinese
		 * <p>[只读] 表示包含此显示对象的 DisplayObjectContainer 对象。</p>
		 * <p>使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。</p>
		 * <p>可以使用 parent 在显示列表中上移多个级别，如下所示：</p>
		 * <p>this.parent.parent.x = 20;</p>
		 * @property parent
		 * @type LDisplayObjectContainer
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	var sprite3 = new LSprite();
		 * 	sprite3.name = "sprite3";
		 * 	sprite1.addChild(sprite2);
		 * 	sprite2.addChild(sprite3);
		 * 	trace(sprite2.parent.name); // sprite1
		 * 	trace(sprite3.parent.name); // sprite2
		 * 	trace(sprite3.parent.parent.name); // sprite1
		 */
		s.parent = null;
	}
	var p = {
		_createCanvas:function(){
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		ll_show : function (c) {
			var s = this;
			c = c || LGlobal.canvas;
			if (!s._canShow()) {
				return;
			}
			s._ll_trans = false;
			if (!LGlobal.box2d && typeof s._ll_loopframe == "function") {
				s._ll_loopframe();
			}
			c.save();
			s._showReady(c);
			if (s.blendMode) {
				c.globalCompositeOperation = s.blendMode;
			}
			if (s.filters) {
				s._ll_setFilters(c);
			}
			s._rotateReady();
			if (s.mask != null && s.mask.ll_show && !s._ll_cacheAsBitmap) {
				s.mask.ll_show(c);
				c.clip();
			}
			s._transformRotate(c);
			s._transformScale(c);
			s._coordinate(c);
			if (s.transform.matrix) {
				s.transform.matrix.transform(c);
			}
			if (s.alpha < 1) {
				s._ll_trans = true;
				c.globalAlpha *= s.alpha;
			}
			if (LGlobal.fpsStatus) {
				LGlobal.fpsStatus.display++;
				if (s._ll_trans) {
					LGlobal.fpsStatus.transform++;
				}
			}
			if(s._ll_cacheAsBitmap){
				s._ll_cacheAsBitmap._ll_show(c);
			}else{
				s._ll_show(c);
			}
			c.restore();
			if (LGlobal.box2d != null && typeof s._ll_loopframe == "function") {
				s._ll_loopframe();
			}
		},
		_canShow : function () {
			return this.visible;
		},
		_coordinate : function (c) {
			var s = this;
			if (s.x != 0 || s.y != 0) {
				s._ll_trans = true;
				c.transform(1, 0, 0, 1, s.x, s.y);
			}
		},
		_rotateReady : function () {},
		_showReady : function (c) {},
		_ll_show : function (c) {},
		_ll_setFilters : function (c) {
			var s = this, f = s.filters, i, l;
			if (!f) {
				return;
			}
			for (i = 0, l = f.length; i < l; i++) {
				f[i].ll_show(s, c);
			}
		},
		startX : function(){return 0;},
		startY : function(){return 0;},
		getWidth : function(maskSize){return 1;},
		getHeight : function(maskSize){return 1;},
		_transformRotate : function (c) {
			var s = this;
			c = c || LGlobal.canvas;
			if (s.rotate == 0) {
				return;
			}
			s._ll_trans = true;
			rotateFlag = Math.PI / 180, rotateObj = new LMatrix();
			if ((typeof s.rotatex) == UNDEFINED) {
				s.rotatex = 0;
				s.rotatey = 0;
			}
			if (s.box2dBody) {
				rotateFlag = 1;
			}
			rotateObj.a = Math.cos(s.rotate * rotateFlag);
			rotateObj.b = Math.sin(s.rotate * rotateFlag);
			rotateObj.c = -rotateObj.b;
			rotateObj.d = rotateObj.a;
			rotateObj.tx = s.x + s.rotatex;
			rotateObj.ty = s.y + s.rotatey;
			rotateObj.transform(c).setTo(1, 0, 0, 1, -rotateObj.tx, -rotateObj.ty).transform(c);
		},
		_transformScale : function (c) {
			var s = this, scaleObj;
			c = c || LGlobal.canvas;
			if (s.scaleX == 1 && s.scaleY == 1) {
				return;
			}
			s._ll_trans = true;
			scaleObj = new LMatrix();
			if (s.scaleX != 1) {
				scaleObj.tx = s.x;
			}
			if (s.scaleY != 1) {
				scaleObj.ty = s.y;
			}
			scaleObj.a = s.scaleX;
			scaleObj.d = s.scaleY;
			scaleObj.transform(c).setTo(1, 0, 0, 1, -scaleObj.tx, -scaleObj.ty).transform(c);
		},
		getAbsoluteScale : function () {
			var s = this, sX, sY, p;
			sX = s.scaleX;
			sY = s.scaleY;
			p = s.parent;
			while (p && p != "root") {
				sX *= p.scaleX;
				sY *= p.scaleY;
				p = p.parent;
			}
			return {scaleX : sX, scaleY : sY};
		},
		/** @language chinese
		 * 得到一个可显示对象相对于canvas标签左上点的坐标。
		 * @method getRootCoordinate
		 * @return {LPoint} 一个LPoint对象。
		 * @since 1.7.7
		 * @public
		 */
		getRootCoordinate : function () {
			return this.localToGlobal(new LPoint(0,0));
		},
		/** @language chinese
		 * <p>将 point 对象从显示对象的（本地）坐标转换为舞台（全局）坐标。</p>
		 * <p>此方法允许您将任何给定的 x 和 y 坐标从相对于特定显示对象原点 (0,0) 的值（本地坐标）转换为相对于舞台原点的值（全局坐标）。</p>
		 * <p>要使用此方法，请先创建 Point 类的一个实例。您分配的 x 和 y 的值表示本地坐标，因为它们是相对于显示对象原点的值。</p>
		 * <p>然后，您可以将创建的 Point 实例作为参数传递给 localToGlobal() 方法。该方法会返回一个新的 Point 对象，该对象具有相对于舞台原点（而不是显示对象原点）的 x 和 y 值。</p>
		 * @method localToGlobal
		 * @param {LPoint} point 使用 Point 类创建的点的名称或标识符，指定 x 和 y 坐标作为属性。
		 * @return {LPoint} 具有相对于舞台的坐标的 Point 对象。
		 * @since 1.9.11
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var square;
		 * 	function main () {
		 * 		LGlobal.setDebug(true);
		 * 		square = new LSprite();
		 * 		square.graphics.drawRect(1,"#000000",[0, 0, 100, 100]);
		 * 		square.x = 100;
		 * 		square.y = 200;
		 * 		addChild(square);
		 * 		square.addEventListener(LMouseEvent.MOUSE_DOWN, traceCoordinates);
		 * 	}
		 * 	function traceCoordinates(event) {
		 * 		var clickPoint = new LPoint(mouseX, mouseY);
		 * 		trace("display object coordinates:", clickPoint);
		 * 		trace("stage coordinates:", square.localToGlobal(clickPoint));
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObject/localToGlobal.html" target="_blank">测试链接</a></p>
		 */
		localToGlobal : function (point) {
			var s = this, x, y, p;
			m = s.getRootMatrix();
			p = m.toArray([point.x, point.y, 1]);
			return new LPoint(p[0], p[1]);
		},
		/** @language chinese
		 * <p>将 point 对象从舞台（全局）坐标转换为显示对象的（本地）坐标。</p>
		 * <p>要使用此方法，请先创建 LPoint 类的一个实例。您分配的 x 和 y 值表示全局坐标，因为它们是相对于主显示区域的原点 (0,0) 的。然后将 LPoint 实例作为参数传递给 globalToLocal() 方法。该方法会返回一个新的 LPoint 对象，该对象具有相对于显示对象原点（而不是舞台原点）的 x 和 y 值。</p>
		 * @method globalToLocal
		 * @param {LPoint} point 用 LPoint 类创建的对象。 该 LPoint 对象指定 x 和 y 坐标作为属性。
		 * @return {LPoint} 具有相对于显示对象的坐标的 LPoint 对象。
		 * @since 1.9.11
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		LGlobal.setDebug(true);
		 * 		var circle = new LSprite();
		 * 		circle.x = 10;
		 * 		addChild(circle);
		 * 		var point1 = new LPoint(0, 0);
		 * 		trace(circle.globalToLocal(point1)); // [x=-10, y=0]
		 * 		var point2 = new LPoint(10, 1);
		 * 		trace(circle.globalToLocal(point2)); // [x=0, y=1]
		 * 		var point3 = new LPoint(30, 20);
		 * 		trace(circle.globalToLocal(point3)); // [x=20, y=20]
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObject/globalToLocal.html" target="_blank">测试链接</a></p>
		 */
		globalToLocal : function (point) {
			var s = this, x, y, p;
			m = s.getLocalMatrix();
			p = m.toArray([point.x, point.y, 1]);
			return new LPoint(p[0], p[1]);
		},
		/** @language chinese
		 * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
		 * @method getBounds
		 * @param {LDisplayObject} targetCoordinateSpace 定义要使用的坐标系的显示对象。
		 * @return {LRectangle} 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
		 * @since 1.7.7
		 * @public
		 * @examplelink <p><a href="../../../api/LDisplayObject/getBounds.html" target="_blank">测试链接</a></p>
		 */
		getBounds : function (d) {
			if (typeof d == UNDEFINED) {
				return new LRectangle(0, 0, 0, 0);
			}
			var s = this, x = 0, y = 0, w = 0, h = 0, sp, dp;
			if (s.objectIndex != d.objectIndex) {
				sp = s.getRootCoordinate();
				dp = d.getRootCoordinate();
				x = sp.x - dp.x;
				y = sp.y - dp.y;
			}
			w = s.getWidth(true);
			h = s.getHeight(true);
			return new LRectangle(x, y, w, h);
		},
		/** @language chinese
		 * <p>如果设置为 true，则运行时将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。速度可能会大大加快，具体取决于矢量内容的复杂性。</p>
		 * <p>*动态改变的对象无法使用cacheAsBitmap</p>
		 * @method cacheAsBitmap
		 * @param {bool} value 分配给触摸点的整数(触摸设备)。
		 * @example
		 * 	var layer = new LSprite();
		 * 	layer.x = layer.y = 100;
		 * 	addChild(layer);
		 * 	var bitmapdata = new LBitmapData(event.target);
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	layer.addChild(bitmap);
		 * 	bitmap = new LBitmap(bitmapdata);
		 * 	bitmap.x = bitmap.y = 50;
		 * 	layer.addChild(bitmap);
		 * 	var sprite = new LSprite();
		 * 	sprite.graphics.drawRect(3, "#000000", [0, 0, 190, 100],true,"#00FF00");
		 * 	sprite.x = -100;
		 * 	layer.addChild(sprite);
		 * 	layer.cacheAsBitmap(true);
		 * @examplelink <p><a href="../../../api/LDisplayObject/cacheAsBitmap.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.9.11
		 */
		cacheAsBitmap : function (value) {
			var s = this;
			if(!value){
				s._ll_cacheAsBitmap = null;
				return;
			}
			var sx = s.x - s.startX(true), sy = s.y - s.startY(true);
			var data = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
			var b = new LBitmapData(data, 0, 0, null, null, LBitmapData.DATA_CANVAS);
			var cache = new LBitmap(b);
			cache.x = -sx;
			cache.y = -sy;
			s._ll_cacheAsBitmap = cache;
		},
		getDataCanvas : function (x,y,w,h) {
			var s = this, _o, o, _c, c, _x, _y;
			s._createCanvas();
			_x = s.x;
			_y = s.y;
			s.x = x || 0;
			s.y = y || 0;
			s.width = w || s.getWidth();
			s.height = h || s.getHeight();
			s._canvas.width = s.width;
			s._canvas.height = s.height;
			var mx, my;
			if(s.mask){
				mx = s.mask.x;
				my = s.mask.y;
				s.mask.x += (s.x - _x);
				s.mask.y += (s.y - _y);
			}
			s.ll_show(s._context);
			s.x = _x;
			s.y = _y;
			if(s.mask){
				s.mask.x = mx;
				s.mask.y = my;
			}
			return s._canvas;
		},
		/** @language chinese
		 * 将该对象转换成base64编码的image字符串。
		 * @method getDataURL
		 * @param {String} type 参数type在image/png，image/jpeg,image/svg+xml等 MIME类型中选择（可以不填，默认是image/png）。
		 * @param {float} ratio 如果是type = “image/jpeg”，可以有第二个参数，如果第二个参数ratio的值在0-1之间，则表示JPEG的质量等级，否则使用浏览器内置默认质量等级。
		 * @return {Base64 Image} base64编码的image字符串。
		 * @since 1.7.7
		 * @public
		 */
		getDataURL : function () {
			var s = this;
			var sx = s.x - s.startX(true), sy = s.y - s.startY(true);
			var r = s.getDataCanvas(sx, sy, s.getWidth(true), s.getHeight(true));
			return r.toDataURL.apply(r, arguments);
		},
		/** @language chinese
		 * 通过构造函数向上查找对象。
		 * @method getParentByConstructor
		 * @param {constructor} constructor 某个构造函数
		 * @return {object} 查找到的对象。
		 * @since 1.10.1
		 * @example
		 *	function MyClass1(){
		 *	    base(self,LSprite,[]);
		 *	}
		 *	function MyClass2(){
		 *	    base(self,LSprite,[]);
		 *	}
		 *	var obj1 = new MyClass1();
		 *	var obj2 = new MyClass2();
		 *	var obj3 = new LSprite();
		 *	addChild(obj1);
		 *	obj1.addChild(obj2);
		 *	obj2.addChild(obj3);
		 *	trace(obj1.objectIndex == obj3.getParentByConstructor(MyClass1).objectIndex);//out: true
		 *	trace(obj2.objectIndex == obj3.getParentByConstructor(MyClass2).objectIndex);//out: true
		 * @public
		 */
		getParentByConstructor : function (value) {
			var parent = this.parent;
			while(typeof parent == "object"){
				if(parent instanceof value){
					return parent;
				}
				parent = parent.parent;
			}
			return null;
		},
		ismouseonShapes : function (shapes, mx, my) {
			var s = this, parent = s, m, child, j, v, arg;
			if (typeof shapes == UNDEFINED) {
				shapes = s.shapes;
			}
			m = s.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				arg = child.arg;
				v = s._changeShape(child.type, arg, m);
				if (child.type == LShape.VERTICES) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.RECT) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.ARC) {
					if ((v[0] - mx) * (v[0] - mx) + (v[1] - my) * (v[1] - my) < v[3]) {
						return true;
					}
				}
			}
			return false;
		},
		_changeShape : function (type, arg, m) {
			var v, arg = arg, r2, i, l, v1, v2;
			if (type == LShape.VERTICES) {
				v = [];
				for (i = 0, l = arg.length; i < l; i++) {
					v[i] = m.toArray([arg[i][0], arg[i][1], 1]);
				}
			} else if (type == LShape.RECT) {
				v = [[arg[0], arg[1]], [arg[0] + arg[2], arg[1]], [arg[0] + arg[2], arg[1] + arg[3]], [arg[0], arg[1] + arg[3]]];
				for (i = 0, l = v.length; i < l; i++) {
					v[i] = m.toArray([v[i][0], v[i][1],1]);
				}
			} else if (type == LShape.ARC) {
				v1 = m.toArray([arg[0], arg[1], 1]);
				v2 = m.toArray([arg[0] + arg[2], arg[1], 1]);
				r2 = (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
				v = [v1[0], v1[1], Math.sqrt(r2), r2];
			}
			return v;
		},
		getRootMatrix : function () {
			var parent = this, m = new LMatrix();
			while (parent && parent != "root") {
				if (parent.scaleX != 1 || parent.scaleY != 1) {
					m.scale(parent.scaleX, parent.scaleY);
				}
				if (parent.rotate != 0) {
					m.rotate(parent.rotate);
				}
				if (parent.x != 0 || parent.y != 0) {
					m.translate(parent.x, parent.y);
				}
				parent = parent.parent;
			}
			return m;
		},
		getLocalMatrix : function () {
			var parent = this, m = new LMatrix(), list = [];
			while (parent && parent != "root") {
				list.push(parent);
				parent = parent.parent;
			}
			for (var i = list.length - 1; i >= 0; i--) {
				parent = list[i];
				if (parent.x != 0 || parent.y != 0) {
					m.translate(-parent.x, -parent.y);
				}
				if (parent.rotate != 0) {
					m.rotate(-parent.rotate);
				}
				if (parent.scaleX != 1 || parent.scaleY != 1) {
					m.scale(1/parent.scaleX, 1/parent.scaleY);
				}
			}
			return m;
		},
		/** @language chinese
		 * 将对象自己从父容器中移除。
		 * @method remove
		 * @since 1.7.7
		 * @public
		 */
		remove : function () {
			var s = this, p = s.parent;
			if (!p || p == "root") {
				return;
			}
			p.removeChild(s);
			s._ll_removeFromSelf = true;
		}
	};
	for (var k in p) {
		LDisplayObject.prototype[k] = p[k];
	}
	return LDisplayObject;
})();
/** @language chinese
 * [播放事件] 播放头进入新帧时调度。
 * <p><a href="LEvent.html#property_ENTER_FRAME">LEvent.ENTER_FRAME</a></p>
 * @event LEvent.ENTER_FRAME
 */