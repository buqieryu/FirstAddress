/** @language chinese
 * 初始化 LBitmap 对象以引用指定的 LBitmapData 对象。
 * LBitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 LLoader 类加载的图像，也可以是使用 LBitmap() 构造函数创建的图像。
 * 利用 LBitmap() 构造函数，可以创建包含对 LBitmapData 对象的引用的 LBitmap 对象。创建了 LBitmap 对象后，使用父实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
 * 一个 LBitmap 对象可在若干 LBitmap 对象之中共享其 LBitmapData 引用，与转换属性或旋转属性无关。由于能够创建引用相同 LBitmapData 对象的多个 LBitmap 对象，因此，多个显示对象可以使用相同的复杂 LBitmapData 对象，而不会因为每个显示对象实例使用一个 LBitmapData 对象而产生内存开销。
 * LBitmap 对象可通过以下两种方式之一将 LBitmapData 对象绘制到屏幕上：使用矢量渲染器作为填充位图形状，或使用更快的像素复制例程。像素复制例程的速度比矢量渲染器要快很多。
 * 注意：LBitmap 类不是 InteractiveObject 类的子类，因此它无法调度鼠标事件。但是，可以使用包含 LBitmap 对象的显示对象容器的 addEventListener() 方法。
 * @class LBitmap
 * @extends LDisplayObject
 * @constructor
 * @param {LBitmapData} bitmapData 被引用的 LBitmapData 对象。
 * @example
 * 	Linit(50, "mylegend", 800, 480, main);
 * 	function main () {
 * 	    var loader = new LLoader();
 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
 * 		loader.load("lufylegend.js.png", "bitmapData");
 * 	}
 * 	function loadBitmapdata (event) {
 * 		var bitmapdata = new LBitmapData(event.target);  
 * 		var bitmap = new LBitmap(bitmapdata);
 * 		addChild(bitmap);
 * 	}
 * @examplelink <p><a href="../../../api/LBitmap/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
var LBitmap = (function () {
	function LBitmap (bitmapdata) {
		var s = this;
		LExtends(s, LDisplayObject, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LBitmap
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LBitmap";
		/** @language chinese
		 * LBitmap对象的旋转中心设置为对象的中心，此属性默认值为true，如果对象发生旋转时，会导致该对象相关的鼠标点击以及碰撞失效。如果需要使该对象旋转后依然保持鼠标事件有效的话，需要将它的值设置为false。
		 * @property rotateCenter
		 * @type Boolean
		 * @default true
		 * @since 1.8.0
		 * @public
		 */
		s.rotateCenter = true;
		/** @language chinese
		 * 被引用的 LBitmapData 对象
		 * @property bitmapData
		 * @type LBitmapData
		 * @default true
		 * @since 1.0.0
		 * @public
		 */
		s.bitmapData = bitmapdata; 
		if (s.bitmapData) {
			s.width = s.bitmapData.width;
			s.height = s.bitmapData.height;
		}
	}
	var p = {
		_canShow : function () {
			return (this.visible && this.bitmapData);
		},
		_rotateReady : function () {
			var s = this;
			if (s.rotate != 0 && s.rotateCenter) {
				s.rotatex = s.getWidth() * 0.5;
				s.rotatey = s.getHeight() * 0.5;
			} else {
				s.rotatex = s.rotatey = 0;
			}
		},
		_coordinate : function (c) {},
		_ll_show : function (c) {
			this.ll_draw(c);
		},
		ll_draw : function (c) {
			var s = this;
			if (LGlobal.fpsStatus) {
				LGlobal.fpsStatus.bitmapData++;
			}
			c.drawImage(s.bitmapData.image,
				s.bitmapData.x,
				s.bitmapData.y,
				s.bitmapData.width,
				s.bitmapData.height,
				s.x,
				s.y,
				s.bitmapData.width,
				s.bitmapData.height
			);
		},
		/** @language chinese
		 * 返回一个LBitmap的克隆对象。
		 * @method clone
		 * @return {LBitmap} 一个新的 LBitmap 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
		 * 	var bm1 = new LBitmap(bmd);
		 * 	addChild(bm1);
		 * 	
		 * 	var bm2 = bm1.clone();
		 * 	bm2.x = 120;
		 * 	addChild(bm2);
		 * @examplelink <p><a href="../../../api/LBitmap/clone.html" target="_blank">测试链接</a></p>
		 */
		clone : function () {
			var s = this, a = new LBitmap(s.bitmapData.clone());
			a.copyProperty(s);
			a.rotateCenter = s.rotateCenter;
			return a;
		},
		ismouseon : function (e, cood) {
			var s = this;
			if (!e) {
				return false;
			}
			if (!s.visible || !s.bitmapData) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cood)) {
					return false;
				}
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s.bitmapData.width, s.bitmapData.height]}], e.offsetX, e.offsetY);
		},
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.target);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 * 	trace("width : " + bitmap.getWidth());
		 * @examplelink <p><a href="../../../api/LBitmap/getWidth.html" target="_blank">测试链接</a></p>
		 */
		getWidth : function (maskSize) {
			var s = this, w, mx, mw;
			w = s.bitmapData != null ? s.bitmapData.width * (s.scaleX > 0 ? s.scaleX : -s.scaleX) : 0;
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				if (mx > w) {
					return 0;
				}
				mw = s.mask.getWidth();
				if (mx + mw > w) {
					return w - mx;
				}else{
					return mw;
				}
			}
			return w;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.target);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	addChild(bitmap);
		 * 	trace("height : " + bitmap.getHeight());
		 * @examplelink <p><a href="../../../api/LBitmap/getHeight.html" target="_blank">测试链接</a></p>
		 */
		getHeight : function (maskSize) {
			var s = this, h, my, mh;
			h = s.bitmapData != null ? s.bitmapData.height * (s.scaleY > 0 ? s.scaleY : -s.scaleY) : 0;
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				if (my > h) {
					return 0;
				}
				mh = s.mask.getHeight();
				if (my + mh > h) {
					return h - my;
				}else{
					return mh;
				}
			}
			return h;
		},
		startX : function () {
			return this.x;
		},
		startY : function () {
			return this.y;
		},
		die : function () {}
	};
	for (var k in p) {
		LBitmap.prototype[k] = p[k];
	}
	return LBitmap;
})();
/** @language chinese
 * 不可用。
 * @event LEvent.ENTER_FRAME
 */