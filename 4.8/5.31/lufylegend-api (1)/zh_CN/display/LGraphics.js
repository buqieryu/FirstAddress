/** @language chinese
 * LGraphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 LSprite 和 LShape 对象。这些类中的每一个类都包括 graphics 属性，该属性是一个 LGraphics 对象。
 * 以下是为便于使用而提供的一些辅助函数：drawRect()、drawRoundRect()、drawArc() 和 drawEllipse()。
 * @class LGraphics
 * @extends LObject
 * @constructor
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		var shape = new LShape();
 * 		addChild(shape);
 * 		shape.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088");
 * 	}
 * @examplelink <p><a href="../../../api/LGraphics/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
var LGraphics = (function () {
	function LGraphics(){
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LGraphics";
		s.color = "#000000";
		s.alpha = 1;
		s.bitmap = null;
		s.setList = new Array();
		s.showList = new Array();
	}
	var p = {
		ll_show : function (ctx) {
			var s = this, k, l = s.setList.length;
			if (l == 0) {
				return;
			}
			for (k = 0; k < l; k++) {
				s.setList[k](ctx);
				if (LGlobal.fpsStatus) {
					LGlobal.fpsStatus.graphics++;
				}
			}
		},
		clone : function () {
			var s = this, a = new LGraphics(), i, l, c;
			a.color = s.color;
			a.alpha = s.alpha;
			a.bitmap = s.bitmap;
			for (i = 0, l = s.setList.length; i < l; i++) {
				c = s.setList[i];
				a.setList.push(c);
			}
			for (i = 0, l = s.showList.length; i < l; i++) {
				c = s.showList[i];
				a.showList.push(c);
			}
			return a;
		},
		/** @language chinese
		 * 定线段如何结束。只有绘制较宽线段时，它才有效。
		 * @method lineCap
		 * @param {String} value 可以使用下面三个值butt, round, square。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineCap("butt");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,20);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("round");
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineCap("square");
		 * 	shape.graphics.moveTo(20,60);
		 * 	shape.graphics.lineTo(200,60);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineCap.html" target="_blank">测试链接</a></p>
		 * @since 1.8.8
		 * @public
		 */
		lineCap : function (t) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineCap = t;
			});
		},
		/** @language chinese
		 * 当一个路径包含了线段或曲线相交的交点的时候，lineJoin 属性说明如何绘制这些交点。只有当绘制具有宽度的线条的时候，这一属性的效果才能表现出来。
		 * @method lineJoin
		 * @param {String} value 可以使用下面三个值bevel, round, miter。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(100,50);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineJoin.html" target="_blank">测试链接</a></p>
		 * @since 1.8.8
		 * @public
		 */
		lineJoin : function (t) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineJoin = t;
			});
		},
		/** @language chinese
		 * 指定线条的宽度。
		 * @method lineWidth
		 * @param {float} value 线条的宽度。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(2);
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(200,50);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(10);
		 * 	shape.graphics.moveTo(20,40);
		 * 	shape.graphics.lineTo(200,40);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineWidth.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		lineWidth : function (t) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineWidth = t;
			});
		},
		/** @language chinese
		 * 指定了用于画笔（绘制）路径的颜色、模式和渐变。这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。
		 * @method strokeStyle
		 * @param {String} value 可以使用下面三个值color|gradient|pattern。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		strokeStyle : function (co) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.strokeStyle = co;
			});
		},
		/** @language chinese
		 * 沿着当前路径绘制或画一条直线。
		 * @method stroke
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.lineJoin("round");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/stroke_strokeStyle.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		stroke : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.stroke();
			});
		},
		/** @language chinese
		 * 开始一个画布中的一条新路径（或者子路径的一个集合）。
		 * @method beginPath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.lineWidth(5);
		 * 	shape.graphics.strokeStyle("#FF0000");
		 * 	shape.graphics.moveTo(0,75);
		 * 	shape.graphics.lineTo(250,75);
		 * 	shape.graphics.stroke();
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.strokeStyle("#00FF00");
		 * 	shape.graphics.moveTo(50,0);
		 * 	shape.graphics.lineTo(150,130);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/beginPath.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		beginPath : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.beginPath();
			});
		},
		/** @language chinese
		 * 如果画布的子路径是打开的，closePath() 通过添加一条线条连接当前点和子路径起始点来关闭它。如果子路径已经闭合了，这个方法不做任何事情。
		 * @method closePath
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(20,100);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.closePath();
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/closePath.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		closePath : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.closePath();
			});
		},
		/** @language chinese
		 * 设置当前位置并开始一条新的子路径。
		 * @method moveTo
		 * @param {float} x 新的当前点的坐标x。
		 * @param {float} y 新的当前点的坐标y。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		moveTo : function (x, y) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.moveTo(x, y);
			});
			s.showList.push({type : LShape.POINT, arg : [x, y]});
		},
		/** @language chinese
		 * 为当前的子路径添加一条直线线段。
		 * @method lineTo
		 * @param {float} x 直线的终点的坐标x。
		 * @param {float} y 直线的终点的坐标y。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.beginPath();
		 * 	shape.graphics.moveTo(20,20);
		 * 	shape.graphics.lineTo(70,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/moveTo_lineTo.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		lineTo : function (x, y) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.lineTo(x, y);
			});
			s.showList.push({type : LShape.POINT, arg : [x, y]});
		},
		/** @language chinese
		 * 为当前路径添加一条矩形子路径。
		 * @method rect
		 * @param {float} x 矩形的左上角的坐标x。
		 * @param {float} y 矩形的左上角的坐标y。
		 * @param {float} width 矩形的宽。
		 * @param {float} height 矩形的高。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/rect.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		rect : function (x, y, w, h) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.rect(x, y, w, h);
			});
			s.showList.push({type : LShape.RECT, arg : [x, y, w, h]});
		},
		/** @language chinese
		 * 用来填充路径的当前的颜色、模式或渐变。
		 * @method fillStyle
		 * @param {String} style 这个属性可以设置为一个字符串或者一个 CanvasGradient 对象 或 CanvasPattern 对象。当设置为一个字符串时，它被解析为一个 CSS 颜色值并且用来进行实心填充。当设置为一个 CanvasGradient 或 CanvasPattern 对象，通过使用指定的渐变或模式来完成填充。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		fillStyle : function (co) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.fillStyle = co;
			});
		},
		/** @language chinese
		 * 使用指定颜色、渐变或模式来绘制或填充当前路径的内部。
		 * @method fill
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.fillStyle("#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.fill();
		 * @examplelink <p><a href="../../../api/LGraphics/fillStyle_fill.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		fill : function () {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.fill();
			});
		},
		/** @language chinese
		 * 用一个中心点和半径，为一个画布的当前子路径添加一条弧线。
		 * @method arc
		 * @param {float} x 描述弧的圆形的圆心的坐标x。
		 * @param {float} y 描述弧的圆形的圆心的坐标y。
		 * @param {float} radius 描述弧的圆形的半径。
		 * @param {float} startAngle 沿着圆指定弧的开始点点的一个角度。这个角度用弧度来衡量。
		 * @param {float} endAngle 沿着圆指定弧的结束点的一个角度。这个角度用弧度来衡量。
		 * @param {Boolean} counterclockwise 弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/arc.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		arc : function (x, y, r, sa, ea, aw) {
			var s = this;
			s.setList.push(function (ctx) {
				ctx.arc(x, y, r, sa, ea, aw);
			});
			s.showList.push({type : LShape.ARC, arg : sa});
		},
		/** @language chinese
		 * 设置线条属性。
		 * @method lineStyle
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.lineStyle(5,"#FF0000");
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/lineStyle.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		lineStyle : function (tn, co) {
			var s = this, c;
			if (co == null) {
				co = s.color;
			}
			s.color = co;
			s.setList.push(function (c) {
				c.lineWidth = tn;
				c.strokeStyle = co;
			});
		},
		/** @language chinese
		 * 删除所有矢量形状。
		 * @method clear
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.rect(20,20,150,100);
		 * 	shape.graphics.clear();
		 * 	shape.graphics.arc(100,75,50,0,2*Math.PI);
		 * 	shape.graphics.stroke();
		 * @examplelink <p><a href="../../../api/LGraphics/clear.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		clear : function () {
			var s = this;
			s.bitmap = null;
			s.setList.length = 0;
			s.showList.length = 0;
		},
		/** @language chinese
		 * 用位图图像填充绘图区。
		 * @method beginBitmapFill
		 * @param {LBitmapData} bitmap 包含要显示的位的透明或不透明位图图像。
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var loader = new LLoader();
		 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
		 * 		loader.load("face.jpg", "bitmapData");
		 * 	}
		 * 	function loadBitmapdata (event) {
		 * 		var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 		var backLayer;
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawArc(1,"#000000",[150,50,50,0,Math.PI*2]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawRect(1,"#000000",[10,100,70,100]);
		 * 		backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 		backLayer.graphics.drawVertices(1,"#000000",[[120,100],[100,200],[200,150]]);
		 * 	}
		 * @examplelink <p><a href="../../../api/LGraphics/beginBitmapFill.html" target="_blank">测试链接</a></p>
		 * @since 1.5.0
		 * @public
		 */
		beginBitmapFill : function (b) {
			var s = this;
			s.setList.push(function () {
				s.bitmap = b;
			});
		},
		/** @language chinese
		 * 绘制一个椭圆。
		 * @method drawEllipse
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,width,height]:[椭圆边框左上角相对于父显示对象注册点的 x 位置（以像素为单位）,椭圆边框左上角相对于父显示对象注册点的 y 位置（以像素为单位）,椭圆的宽度（以像素为单位）,椭圆的高度（以像素为单位）]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawEllipse(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawEllipse(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawEllipse.html" target="_blank">测试链接</a></p>
		 * @since 1.8.8
		 * @public
		 */
		drawEllipse : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				var x, y, w, h, k, ox, oy, xe, ye, xm, ym;
				c.beginPath();
				k = 0.5522848;
				x = pa[0];
				y = pa[1];
				w = pa[2];
				h = pa[3];
				ox = (w / 2) * k;
				oy = (h / 2) * k;
				xe = x + w;
				ye = y + h;
				xm = x + w / 2;
				ym = y + h / 2;
				c.moveTo(x, ym);
				c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
				c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
				c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
				c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		/** @language chinese
		 * 绘制一个圆或者扇形。
		 * @method drawArc
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param <p>[x,y,r,sAngle,eAngle,counterclockwise,isSector]:[描述弧的圆形的圆心的坐标x,描述弧的圆形的圆心的坐标y,描述弧的圆形的半径,沿着圆指定弧的开始点点的一个角度,沿着圆指定弧的结束点的一个角度,弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历,是否绘制成扇形]。</p>
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawArc(2, "#ff0000", [50, 50, 40, 0, 2*Math.PI]);
		 * 	shape.graphics.drawArc(1, "#000000", [50, 150, 40, 0, 2*Math.PI], true, "#880088");
		 * 	shape.graphics.drawArc(2, "#ff0000", [150, 50, 40, 0, 50*Math.PI/180,false,true]);
		 * 	shape.graphics.drawArc(1, "#000000", [150, 150, 40, 0, 230*Math.PI/180,false,true], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawArc.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		drawArc : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				if (pa.length > 6 && pa[6]) {
					c.moveTo(pa[0], pa[1]);
				}
				c.arc(pa[0], pa[1], pa[2], pa[3], pa[4], pa[5]);
				if (pa.length > 6 && pa[6]) {
					c.lineTo(pa[0], pa[1]);
				}
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.ARC, arg : pa});
		},
		/** @language chinese
		 * 绘制一个矩形。
		 * @method drawRect
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,width,height]:[矩形左上角的 x 位置,矩形左上角的 y 位置,矩形的宽度,矩形的高度]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRect(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawRect(1, "#000000", [10, 100, 50, 100], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRect.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		drawRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				c.rect(pa[0], pa[1], pa[2], pa[3]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		/** @language chinese
		 * 绘制一个圆角矩形。
		 * @method drawRoundRect
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [x,y,width,height,radius]:[矩形左上角的 x 位置,矩形左上角的 y 位置,矩形的宽度,矩形的高度,圆角的大小]。
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawRoundRect(2, "#ff0000", [10, 10, 100, 50, 10]);
		 * 	shape.graphics.drawRoundRect(1, "#000000", [10, 100, 50, 100, 10], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawRoundRect.html" target="_blank">测试链接</a></p>
		 * @since 1.7.1
		 * @public
		 */
		drawRoundRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				c.moveTo(pa[0] + pa[4], pa[1]);
				c.lineTo(pa[0] + pa[2] - pa[4], pa[1]);
				c.arcTo(pa[0] + pa[2], pa[1], pa[0] + pa[2], pa[1] + pa[4], pa[4]);
				c.lineTo(pa[0] + pa[2], pa[1] + pa[3] - pa[4]);
				c.arcTo(pa[0] + pa[2], pa[1] + pa[3], pa[0] + pa[2] - pa[4], pa[1] + pa[3], pa[4]);
				c.lineTo(pa[0] + pa[4], pa[1] + pa[3]);
				c.arcTo(pa[0], pa[1] + pa[3], pa[0], pa[1] + pa[3] - pa[4], pa[4]);
				c.lineTo(pa[0], pa[1] + pa[4]);
				c.arcTo(pa[0], pa[1], pa[0] + pa[4], pa[1], pa[4]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							0, 0,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		/** @language chinese
		 * 使用顶点数组绘制一个多边形。
		 * @method drawVertices
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [[x1,y1],[x2,y2],[x3,y3],......]
		 * @param {Boolean} isFill 是否填充图形
		 * @param {String} fillColor 填充图形的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 10], [60, 100], [100, 50]]);
		 * 	shape.graphics.drawVertices(2, "#ff0000", [[10, 160], [60, 250], [100, 200]], true, "#880088");
		 * @examplelink <p><a href="../../../api/LGraphics/drawVertices.html" target="_blank">测试链接</a></p>
		 * @since 1.4.1
		 * @public
		 */
		drawVertices : function (tn, lco, v, isf, co) {
			var s = this;
			if (v.length < 3) {
				return;
			}
			s.setList.push(function (c) {
				c.beginPath();
				c.moveTo(v[0][0], v[0][1]);
				var i, l = v.length, pa;
				for (i = 1; i < l; i++) {
					pa = v[i];
					c.lineTo(pa[0], pa[1]);
				}
				c.lineTo(v[0][0], v[0][1]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.closePath();
					c.stroke();
				}
			});
			s.showList.push({type : LShape.VERTICES, arg : v});
		},
		/** @language chinese
		 * 呈现一组三角形（通常用于扭曲位图），并为其指定三维外观。drawTriangles() 方法使用一组 (u,v) 坐标将当前填充或位图填充映射到三角形面。
		 * @method drawTriangles
		 * @param {Array} vertices 由数字构成的矢量，其中的每一对数字将被视为一个坐标位置（一个 x, y 对）。vertices 参数是必需的。
		 * @param {Array} indices 一个由整数或索引构成的矢量，其中每三个索引定义一个三角形。如果 indexes 参数为 null，则每三个顶点（vertices 矢量中的 6 对 x,y）定义一个三角形。否则，每个索引将引用一个顶点，即 vertices 矢量中的一对数字。例如，indexes[1] 引用 (vertices[2], vertices[3])。indexes 参数是可选的，但 indexes 通常会减少提交的数据量和计算的数据量。
		 * @param {Array} uvtData 由用于应用纹理映射的标准坐标构成的矢量。每个坐标引用用于填充的位图上的一个点。每个顶点必须具有一个 UV 或一个 UVT 坐标。对于 UV 坐标，(0,0) 是位图的左上角，(1,1) 是位图的右下角。
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细,默认为0；
		 * @param {String} color 线的颜色
		 * @example
		 * 	var bitmapdata = new LBitmapData(event.currentTarget);  
		 * 	var backLayer = new LSprite();
		 * 	addChild(backLayer);
		 * 	var vertices = new Array();
		 * 	vertices.push(0, 0);
		 * 	vertices.push(-40, 90);
		 * 	vertices.push(0, 200);
		 * 	vertices.push(80, 0);
		 * 	vertices.push(90, 30);
		 * 	vertices.push(70,200);
		 * 	vertices.push(130, 10);
		 * 	vertices.push(140, 40);
		 * 	vertices.push(120,220);
		 * 	var indices = new Array();
		 * 	indices.push(0, 3, 1);
		 * 	indices.push(3, 1, 4);
		 * 	indices.push(1, 4, 2);
		 * 	indices.push(4, 2, 5);
		 * 	indices.push(3, 6, 4);
		 * 	indices.push(6, 4, 7);
		 * 	indices.push(4, 7, 5);
		 * 	indices.push(7, 5, 8);
		 * 	var uvtData = new Array();
		 * 	uvtData.push(0, 0);
		 * 	uvtData.push(0, 0.5);
		 * 	uvtData.push(0, 1);
		 * 	uvtData.push(0.5, 0);
		 * 	uvtData.push(0.5, 0.5);
		 * 	uvtData.push(0.5, 1);
		 * 	uvtData.push(1, 0);
		 * 	uvtData.push(1, 0.5);
		 * 	uvtData.push(1, 1);
		 * 	backLayer.graphics.beginBitmapFill(bitmapdata);
		 * 	backLayer.graphics.drawTriangles(vertices, indices, uvtData);
		 * @examplelink <p><a href="../../../api/LGraphics/drawTriangles.html" target="_blank">测试链接</a></p>
		 * @since 1.5.0
		 * @public
		 */
		drawTriangles : function (ve, ind, u, tn, lco) {
			var s = this;
			var i, j, l = ind.length, c;
			s.setList.push(function (c) {
				var v = ve, a, k, sw;
				for (i = 0, j = 0; i < l; i += 3) {
					a = 0;
					c.save();
					c.beginPath();
					c.moveTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.lineTo(v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
					c.lineTo(v[ind[i + 2] * 2], v[ind[i + 2] * 2 + 1]);
					c.lineTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.closePath();
					if (tn) {
						c.lineWidth = tn;
						c.strokeStyle = lco;
						c.stroke();
					}
					c.clip();
					if (i % 6 == 0) {
						sw = -1;
						var w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						}
						if (i + j >= l) {
							w = (u[ind[i + j - l] * 2] - u[ind[i + 1] * 2]) * s.bitmap.width;
							sw = u[ind[i] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 1] * 2] - v[ind[i] * 2]) / w;
						var t2 = (v[ind[i + 1] * 2 + 1] - v[ind[i] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i] * 2], v[ind[i] * 2 + 1]);
						c.drawImage(s.bitmap.image,
									s.bitmap.x + sw,
									s.bitmap.y + sh,
									w, h,
									0, 0,
									w, h);
					} else {
						var w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						}
						if (i + 1 + j >= l) {
							w = (u[ind[i + 1 + j - l] * 2] - u[ind[i + 2] * 2]) * s.bitmap.width;
							sw = u[ind[i + 1] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i + 1] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + 1 + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 2] * 2] - v[ind[i + 1] * 2]) / w;
						var t2 = (v[ind[i + 2] * 2 + 1] - v[ind[i + 1] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
						c.drawImage(s.bitmap.image,
								s.bitmap.x + sw,
								s.bitmap.y + sh,
								w, h,
								0, -h,
								w, h);
					}
					c.restore();
				}
			});
		},
		/** @language chinese
		 * 绘制一条线段。
		 * @method drawLine
		 * @param {int} thickness 一个整数，以点为单位表示线条的粗细；
		 * @param {String} color 线的颜色，这个属性可能是一个字符串，或者一个 CanvasGradient 对象 或 CanvasPattern 对象。如果是一个字符串，它被解析为一个 CSS 颜色值，并且画笔用所得的实色来绘制。如果这个属性的值是一个 CanvasGradient 对象或 CanvasPattern 对象，画笔使用这个渐变或模式来实现。
		 * @param {Array} param [startX,startY,endX,endY]:[开始的 x 位置,开始的 y 位置,结束的 x 位置,结束的 y 位置]。
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.drawLine(2, "#ff0000", [10, 10, 100, 50]);
		 * 	shape.graphics.drawLine(1, "#000000", [10, 100, 50, 100]);
		 * @examplelink <p><a href="../../../api/LGraphics/drawLine.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		drawLine : function (tn, lco, pa) {
			var s = this;
			s.setList.push(function (c) {
				c.beginPath();
				c.moveTo(pa[0], pa[1]);
				c.lineTo(pa[2], pa[3]);
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			});
			s.showList.push({type : LShape.LINE, arg : pa});
		},
		/** @language chinese
		 * 使用原生的canvas函数进行绘图。
		 * @method add
		 * @param {Function} func 一个函数
		 * @example
		 * 	var shape = new LShape();
		 * 	addChild(shape);
		 * 	shape.graphics.add(function(ctx){
		 * 		ctx.beginPath();
		 * 		ctx.strokeStyle = "#FF0000";
		 * 		ctx.lineWidth = 2;
		 * 		ctx.moveTo(10,10);
		 * 		ctx.lineTo(130,30);
		 * 		ctx.stroke();
		 * 	});
		 * @examplelink <p><a href="../../../api/LGraphics/add.html" target="_blank">测试链接</a></p>
		 * @since 1.0.0
		 * @public
		 */
		add : function (f) {
			this.setList.push(f);
		},
		ismouseon : function (e, co) {
			var s = this;
			if (e == null || e == UNDEFINED || s.showList.length == 0 || !s.parent) {
				return false;
			}
			return s.parent.ismouseonShapes(s.showList, e.offsetX, e.offsetY);
		},
		getWidth : function () {
			var s = this, k, k1, min, max, v, l, l1;
			for (k = 0, l = s.showList.length; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[0] - s.showList[k].arg[2] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[0] || typeof min == UNDEFINED) {
							min = v[0];
						}
						if (max < v[0] || typeof max == UNDEFINED) {
							max = v[0];
						}
					}
				} else if (s.showList[k].type == LShape.LINE) {
					if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0];
					}
					if (min > s.showList[k].arg[2] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[0] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.POINT) {
					if (min > s.showList[k].arg[0] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[0] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[0];
					}
				}
			}
			if (typeof min == UNDEFINED) {
				min = max = 0;
			}
			s.left = min;
			if (l > 0 && max == min) {
				max = min + 1;
			}
			return max - min;
		},
		getHeight : function () {
			var s = this, k = null, k1 = null, l, l1, min, max, v;
			for (k = 0, l = s.showList.length; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[3] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1] + s.showList[k].arg[3];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[1] - s.showList[k].arg[2] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[2] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[1] || typeof min == UNDEFINED) {
							min = v[1];
						}
						if (max < v[1] || typeof max == UNDEFINED) {
							max = v[1];
						}
					}
				} else if (s.showList[k].type == LShape.LINE) {
					if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1];
					}
					if (min > s.showList[k].arg[3] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[3];
					}
					if (max < s.showList[k].arg[1] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[3] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[3];
					}
				} else if (s.showList[k].type == LShape.POINT) {
					if (min > s.showList[k].arg[1] || typeof min == UNDEFINED) {
						min = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[1] || typeof max == UNDEFINED) {
						max = s.showList[k].arg[1];
					}
				}
			}
			if (typeof min == UNDEFINED) {
				min = max = 0;
			}
			s.top = min;
			if (l > 0 && max == min) {
				max = min + 1;
			}
			return max - min;
		},
		startX : function () {
			var s = this;
			s.getWidth();
			return s.left;
		},
		startY : function () {
			var s = this;
			s.getHeight();
			return s.top;
		}
	};
	for (var k in p) {
		LGraphics.prototype[k] = p[k];
	}
	return LGraphics;
})();