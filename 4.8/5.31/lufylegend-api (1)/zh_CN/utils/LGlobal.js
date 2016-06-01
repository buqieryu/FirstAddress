/** @language chinese
 * <p>全局类。</p>
 * @class LGlobal
 * @since 1.0.0
 * @public
 */
var LGlobal = ( function () {
	function LGlobal () {
		throw "LGlobal cannot be instantiated";
	}
	/** @language chinese
	 * <p>[静态] 定义全屏的属性值。</p>
	 * <p>用法请参照LGlobal.screen函数</p>
	 * @property FULL_SCREEN
	 * @type String
	 * @static
	 * @since 1.6.0
	 * @public
	 */
	LGlobal.FULL_SCREEN = "full_screen";
	LGlobal.traceDebug = false;
	LGlobal.displayState = NONE;
	/** @language chinese
	 * <p>将舞台设置成使用指定长宽比的方向。可以设置为下列值</p>
	 * <p>LANDSCAPE、PORTRAIT。</p>
	 * @property LGlobal.aspectRatio
	 * @type String
	 * @static
	 * @since 1.8.1
	 * @public
	 */
	LGlobal.aspectRatio = NONE;
	/** @language chinese
	 * <p>canvas 标签。</p>
	 * @property LGlobal.canvasObj
	 * @type HTML elements
	 * @static
	 * @since 1.8.1
	 * @public
	 */
	LGlobal.canvasObj = null;
	/** @language chinese
	 * <p>context 对象。</p>
	 * @property LGlobal.canvas
	 * @type CanvasRenderingContext2D
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.canvas = null;
	/** @language chinese
	 * <p>当设备支持Web Audio Api的时候，是否使用Web Audio Api来播放音频。</p>
	 * @property LGlobal.webAudio
	 * @type Boolean
	 * @static
	 * @default true
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.webAudio = true;
	LGlobal.objectIndex = 1;
	/** @language chinese
	 * <p>一个LSprite对象，所有的DisplayObject对象的最底层。</p>
	 * <p>除非做功能扩展，否则不推荐直接将对象加载到LGlobal.stage上。</p>
	 * @property LGlobal.stage
	 * @type LSprite
	 * @static
	 * @since 1.3.1
	 * @public
	 */
	LGlobal.stage = null;
	/** @language chinese
	 * <p>游戏初始化时设定的画面的宽，即canvas的宽。</p>
	 * @property LGlobal.width
	 * @type int
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.width = 0;
	/** @language chinese
	 * <p>游戏初始化时设定的画面的高，即canvas的高。</p>
	 * @property LGlobal.height
	 * @type int
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.height = 0;
	LGlobal.box2d = null;
	LGlobal.speed = 50;
	LGlobal.IS_MOUSE_DOWN = false;
	/** @language chinese
	 * <p>该方法将停止事件的传播，阻止它被分派到其他 Document 节点。</p>
	 * @property LGlobal.stopPropagation
	 * @type Boolean
	 * @static
	 * @since 1.9.8
	 * @public
	 * @default false
	 */
	LGlobal.stopPropagation = false;
	/** @language chinese
	 * <p>如果事件对象的cancelable属性为true,则该方法可以取消事件的默认动作.但并不取消事件的冒泡行为。移动网页中用来禁止滚屏，默认为true(禁止)，如果需要使用滚屏功能，则需要将其设置为fasle。</p>
	 * @property LGlobal.preventDefault
	 * @type Boolean
	 * @static
	 * @since 1.3.1
	 * @public
	 * @default true
	 */
	LGlobal.preventDefault = true;
	LGlobal.childList = new Array();
	LGlobal.dragList = new Array();
	LGlobal.excludingContainer = new Array();
	LGlobal.fpsStatus = null;
	/** @language chinese
	 * <p>一个 LStageScaleMode 类中指定要使用哪种缩放模式的值。</p>
	 * @property LGlobal.stageScale
	 * @type String
	 * @static
	 * @example
	 * 	LInit(50, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
	 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	 * 		LSystem.screen(LStage.FULL_SCREEN);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/stageScale_align.html" target="_blank">测试链接</a></p>
	 * @since 1.4.0
	 * @public
	 */
	LGlobal.stageScale = "noScale";
	/** @language chinese
	 * <p>一个 LStageAlign 类中指定舞台在浏览器中的对齐方式的值。</p>
	 * @property LGlobal.align
	 * @type String
	 * @static
	 * @example
	 * 	LInit(50, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
	 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	 * 		LSystem.screen(LStage.FULL_SCREEN);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/stageScale_align.html" target="_blank">测试链接</a></p>
	 * @since 1.8.6
	 * @public
	 */
	LGlobal.align = "M";
	/** @language chinese
	 * <p>当前浏览器是否是移动浏览器。等同于 LGlobal.canTouch。</p>
	 * @property LGlobal.mobile
	 * @type Boolean
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	LGlobal.mobile = false;
	/** @language chinese
	 * <p>等同于 LGlobal.mobile。</p>
	 * @property LGlobal.canTouch
	 * @type Boolean
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.canTouch = false;
	/** @language chinese
	 * <p>当前浏览器环境。可以是下面中的一个</p>
	 * <p>OS_IPHONE，OS_IPOD，OS_IPAD，OS_ANDROID，OS_PC。</p>
	 * @property LGlobal.os
	 * @type String
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.os = OS_PC;
	/** @language chinese
	 * <p>当前浏览器是否为IOS。</p>
	 * @property LGlobal.ios
	 * @type Boolean
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.ios = false;
	/** @language chinese
	 * <p>当前浏览器是否为Android。</p>
	 * @property LGlobal.android
	 * @type Boolean
	 * @static
	 * @since 1.0.0
	 * @public
	 */
	LGlobal.android = false;
	LGlobal.android_new = false;
	/** @language chinese
	 * <p>游戏画面的背景颜色。</p>
	 * @property LGlobal.backgroundColor
	 * @type String
	 * @static
	 * @since 1.7.7
	 * @public
	 */
	LGlobal.backgroundColor = null;
	/** @language chinese
	 * <p>LDisplayObject对象从舞台上被移除的时候，是否将这个对象整个清空。</p>
	 * @property LGlobal.destroy
	 * @type Boolean
	 * @default true
	 * @static
	 * @since 1.7.7
	 * @public
	 */
	LGlobal.destroy = true;
	/** @language chinese
	 * <p>强制将画面彻底刷新，如果游戏中没有背景，有些手机上清空画面时偶尔会留下残影，如果遇到情况，可以在清空画面时将此属性设置为true来强制刷新画面一次。</p>
	 * @property LGlobal.forceRefresh
	 * @type Boolean
	 * @default false
	 * @static
	 * @since 1.9.1
	 * @public
	 */
	LGlobal.forceRefresh = false;
	LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
	LGlobal.startTimer = 0;
	/** @language chinese
	 * <p>LDisplayObject对象从舞台上被移除的时候，是否将这个对象整个清空。</p>
	 * <p>如果游戏不是透明背景的话，可以将LGlobal.keepClear的值设置为false来提高游戏效率。</p>
	 * @property LGlobal.keepClear
	 * @type Boolean
	 * @default true
	 * @static
	 * @since 1.8.7
	 * @public
	 */
	LGlobal.keepClear = true;
	LGlobal.top = 0;
	LGlobal.left = 0;
	LGlobal.window = window;
	(function (n) {
		LGlobal.isOldFirefox = (function(un){
			var i = un.toLowerCase().indexOf('firefox');
			if (i < 0) {
				return false;
			}
			var v = un.substring(i + 8, un.length);
			return parseFloat(v) < 39.0;
		})(n);
		if (n.indexOf(OS_IPHONE) > 0) {
			LGlobal.os = OS_IPHONE;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPOD) > 0) {
			LGlobal.os = OS_IPOD;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPAD) > 0) {
			LGlobal.os = OS_IPAD;
			LGlobal.ios = true;
			LGlobal.canTouch = true;
		} else if (n.indexOf(OS_ANDROID) > 0) {
			LGlobal.os = OS_ANDROID;
			LGlobal.canTouch = true;
			LGlobal.android = true;
			var i = n.indexOf(OS_ANDROID);
			if(parseInt(n.substr(i + 8, 1)) > 3){
				LGlobal.android_new = true;
			}
		} else if (n.indexOf(OS_WINDOWS_PHONE) > 0) {
			LGlobal.os = OS_WINDOWS_PHONE;
			LGlobal.canTouch = true;
		} else if (n.indexOf(OS_BLACK_BERRY) > 0) {
			LGlobal.os = OS_BLACK_BERRY;
			LGlobal.canTouch = true;
		}
		LGlobal.mobile = LGlobal.canTouch;
	})(navigator.userAgent);
	/** @language chinese
	 * <p>设定是否开启测试模式。</p>
	 * <p>＊当游戏发布的时候，必须关闭测试模式。</p>
	 * @method setDebug
	 * @static
	 * @param {Boolean} value 是否开启测试模式
	 * @example
	 * 	LInit(50, "legend", 800, 480, main);
	 * 	function main () {
	 * 		LGlobal.setDebug(true);
	 * 		trace("test01", "test02", "test03");
	 * 	}	
	 * @examplelink <p><a href="../../../api/LGlobal/setDebug.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.4.0
	 */
	LGlobal.setDebug = function (v) {
		LGlobal.traceDebug = v; 
	};
	LGlobal.setCanvas = function (id, w, h) {
		LGlobal.ll_createCanvas(id, w, h);
		LGlobal.ll_createStage();
		if(LGlobal.displayState == LStage.FULL_SCREEN){
			LGlobal.resize();
		}else if(typeof LGlobal.displayState == "number"){
			LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
		}
		if (LGlobal.canTouch) {
			LGlobal.ll_clicks = 0;
			LGlobal.ll_prev_clickTime = 0;
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START, LGlobal.ll_touchStart);
			LEvent.addEventListener(document, LMouseEvent.TOUCH_END, LGlobal.ll_touchEnd);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE, LGlobal.ll_touchMove);
		} else {
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.DOUBLE_CLICK, LGlobal.ll_mouseDbclick);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN, LGlobal.ll_mouseDown);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE, LGlobal.ll_mouseMove);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP, LGlobal.ll_mouseUp);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT, LGlobal.ll_mouseOut);
		}
	};
	LGlobal.ll_createCanvas = function (id, w, h) {
		LGlobal.id = id;
		LGlobal.object = document.getElementById(id);
		LGlobal.object.innerHTML = '<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">' +
		'<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:' + w + 'px;height:' + h + 'px;">' +
		'<div id="noCanvas">' +
		"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>" + 
		'</div>' +  
		'</canvas></div>' +
		'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">' +
		'<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>' +
		'<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />' +
		'<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
		LGlobal.canvasObj = document.getElementById(LGlobal.id + "_canvas");
		LGlobal._canvas = document.createElement("canvas");
		LGlobal._context = LGlobal._canvas.getContext("2d");
		if (LGlobal._context) {
			LGlobal.canvasObj.innerHTML="";
		}
		LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
		LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
		LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
		LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
		LGlobal.inputTextField = null;
		if (w) {
			LGlobal.canvasObj.width = w;
		}
		if (h) {
			LGlobal.canvasObj.height = h;
		}
		LGlobal.width = LGlobal.canvasObj.width;
		LGlobal.height = LGlobal.canvasObj.height;
		LGlobal.canvasStyleWidth = LGlobal.width;
		LGlobal.canvasStyleHeight = LGlobal.height;
		LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
		LGlobal.offsetX = mouseX = 0;
		LGlobal.offsetY = mouseY = 0;
	};
	LGlobal.ll_createStage = function () {
		LGlobal.stage = new LSprite();
		LGlobal.stage.parent = "root";
		LGlobal.childList.push(LGlobal.stage);
		LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
		LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
		LGlobal.stage.addEventListener = function (type, listener) {
			if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
				if(type == LEvent.WINDOW_RESIZE){
					LGlobal.stage.onresizeListener = listener;
				}else{
					LGlobal.stage.onorientationchangeListener = listener;
				}
				if(!LGlobal.stage.onresize){
					LGlobal.stage.onresize = function (e) {
						LGlobal.stage.onresizeEvent = e;
					};
					LEvent.addEventListener(LGlobal.window, type,LGlobal.stage.onresize);
				}
			} else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
				LEvent.addEventListener(LGlobal.window, type, listener);
			} else {
				LGlobal.stage.baseAddEvent(type, listener);
			}
		};
		LGlobal.stage.removeEventListener = function (type, listener) {
			if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
				if(type == LEvent.WINDOW_RESIZE){
					delete LGlobal.stage.onresizeListener;
					if(LGlobal.stage.onorientationchangeListener){
						return;
					}
				}else{
					delete LGlobal.stage.onorientationchangeListener;
					if(LGlobal.stage.onresizeListener){
						return;
					}
				}
				LEvent.removeEventListener(LGlobal.window, LEvent.WINDOW_RESIZE, LGlobal.stage.onresize);
				delete LGlobal.stage.onresize;
			} else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
				LEvent.removeEventListener(LGlobal.window, type, listener);
			} else {
				LGlobal.stage.baseRemoveEvent(type, listener);
			}
		};
		LGlobal.innerWidth = window.innerWidth;
		LGlobal.innerHeight = window.innerHeight;
		LEvent.addEventListener(LGlobal.window, "blur", function(){
			LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
		});
	};
	LGlobal.ll_touchStart = function (event) {
		LGlobal._outStageCheckCount = 1;
		LGlobal.IS_MOUSE_DOWN = true;
		LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
		if (LGlobal.inputBox.style.display != NONE) {
			LGlobal.inputTextField._ll_getValue();
		}
		var canvasX, canvasY, eve, k, i;
		canvasX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
		canvasY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
		if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
			eve = LGlobal.ll_touchStartEvent(event, 0, canvasX, canvasY);
		} else if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
			for (var i = 0,l = event.touches.length; i < l; i++) {
				if(!LMultitouch.touchs["touch" + event.touches[i].identifier]){
					eve = LGlobal.ll_touchStartEvent(event, i, canvasX, canvasY);
				}
			}
		}
		var date = new Date();
		var clickTime = date.getTime();
		LGlobal.ll_clicks = (clickTime <= (LGlobal.ll_prev_clickTime + 500)) ? (LGlobal.ll_clicks + 1) : 1;
		LGlobal.ll_prev_clickTime = clickTime;
		if (LGlobal.ll_clicks === 2) {
			LGlobal.mouseEvent(eve, LMouseEvent.DOUBLE_CLICK);
			LGlobal.ll_clicks = 0;
		}
		if (LGlobal.mouseJoint_start) {
			LGlobal.mouseJoint_start(eve);
		}
		LGlobal.touchHandler(event);
	};
	LGlobal.ll_touchStartEvent = function (event,eveIndex,canvasX,canvasY) {
		var eve = {offsetX : (event.touches[eveIndex].pageX - canvasX),
		offsetY : (event.touches[eveIndex].pageY - canvasY),
		touchPointID : event.touches[eveIndex].identifier,
		force : event.touches[eveIndex].force,
		rotationAngle : event.touches[eveIndex].rotationAngle,
		radiusX : event.touches[eveIndex].radiusX,
		radiusY : event.touches[eveIndex].radiusY};
		eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
		eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
		mouseX = LGlobal.offsetX = eve.offsetX;
		mouseY = LGlobal.offsetY = eve.offsetY;
		LMultitouch.touchs["touch" + eve.touchPointID] = eve;
		LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_DOWN);
		LGlobal.buttonStatusEvent = eve;
		return eve;
	};
	LGlobal.ll_touchEnd = function (event) {
		var e, eve, k, i, l, h;
		LGlobal.IS_MOUSE_DOWN = false;
		if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
			for (k in LMultitouch.touchs) {
				e = LMultitouch.touchs[k];
				h = false;
				for (i = 0,l = event.touches.length; i < l; i++) {
					if (event.touches[i].identifier == e.touchPointID) {
						h = true;
						break;
					}
				}
				if (!h) {
					eve = e;
					delete LMultitouch.touchs[k];
					LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
				}
			}
		}
		if (!eve) {
			eve = {offsetX : LGlobal.offsetX, offsetY : LGlobal.offsetY};
		}
		LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
		LGlobal.touchHandler(event);
		LGlobal.buttonStatusEvent = null;
		if (LGlobal.mouseJoint_end) {
			LGlobal.mouseJoint_end();
		}
		LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
	};
	LGlobal.ll_touchMove = function (e) {
		var cX, cY, eve, l, ll = e.touches.length;
		cX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
		cY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
		if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
			ll = 1;
		}
		for (i = 0, l = e.touches.length; i < l && i < ll; i++) {
			eve = {offsetX : (e.touches[i].pageX - cX), offsetY : (e.touches[i].pageY - cY), touchPointID : e.touches[i].identifier};
			eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
			eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
			mouseX = LGlobal.offsetX = eve.offsetX;
			mouseY = LGlobal.offsetY = eve.offsetY;
			if (LMultitouch.touchs["touch" + eve.touchPointID] && 
				LMultitouch.touchs["touch" + eve.touchPointID].offsetX == eve.offsetX && 
				LMultitouch.touchs["touch" + eve.touchPointID].offsetY == eve.offsetY){
				continue;	
			}
			LGlobal.buttonStatusEvent = eve;
			LMultitouch.touchs["touch" + eve.touchPointID] = eve;
			if(eve.offsetX <= 0 || eve.offsetX >= LGlobal.innerWidth || eve.offsetX >= LGlobal.width || eve.offsetY <= 0 || eve.offsetY >= LGlobal.innerHeight || eve.offsetY >= LGlobal.height){
				LGlobal._outStageCheckCount = 0;
			}else{
				LGlobal._outStageCheckCount = 1;
			}
			LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_MOVE);
		}
		LGlobal.touchHandler(e);
		if (LGlobal.mouseJoint_move) {
			LGlobal.mouseJoint_move(eve);
		}
	};
	LGlobal.ll_mouseDbclick = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.DOUBLE_CLICK);
	};
	LGlobal.ll_mouseDown = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		if (LGlobal.inputBox.style.display != NONE) {
			LGlobal.inputTextField._ll_getValue();
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_DOWN);
		LGlobal.IS_MOUSE_DOWN = true;
		if (LGlobal.mouseJoint_start) {
			LGlobal.mouseJoint_start(event);
		}
	};
	LGlobal.ll_mouseMove = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.buttonStatusEvent = event;
		mouseX = LGlobal.offsetX = event.offsetX;
		mouseY = LGlobal.offsetY = event.offsetY;
		LGlobal.cursor = "default";
		if(mouseX <= 0 || mouseX >= LGlobal.innerWidth || mouseX >= LGlobal.width || mouseY <= 0 || mouseY >= LGlobal.innerHeight || mouseY >= LGlobal.height){
			if(LGlobal._outStageCheckCount){
				LGlobal._outStageCheckCount = 0;
				LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
			}
		}else{
			if(!LGlobal._outStageCheckCount){
				LGlobal._outStageCheckCount = 1;
				LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
			}
		}
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_MOVE);
		document.body.style.cursor = LGlobal.cursor;
		if (LGlobal.mouseJoint_move) {
			LGlobal.mouseJoint_move(event);
		}
	};
	LGlobal.ll_mouseUp = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_UP);
		LGlobal.IS_MOUSE_DOWN = false;
		if (LGlobal.mouseJoint_end) {
			LGlobal.mouseJoint_end();
		}
	};
	LGlobal.ll_mouseOut = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_OUT);
		LGlobal.IS_MOUSE_DOWN = false;
	};
	LGlobal.touchHandler = function (e) {
		if (LGlobal.stopPropagation) {
			e.stopPropagation();
			if (e.stopImmediatePropagation) {
				e.stopImmediatePropagation();
			}
		}
		if (LGlobal.preventDefault) {
			e.preventDefault();
		}
		return e;
	};
	LGlobal.mouseEvent = function (e, t) {
		if (t == LMouseEvent.MOUSE_MOVE) {
			LGlobal.dragHandler(e);
		}
		if (LMouseEventContainer.container[t]) {
			LMouseEventContainer.dispatchMouseEvent(e, t);
			return;
		}
		for (var k = LGlobal.childList.length - 1; k >= 0; k--) {
			if (LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e, t)) {
				break;
			}
		}
	};
	LGlobal.dragHandler = function (e) {
		var i, s, c, d = LGlobal.dragList;
		for(i = d.length - 1; i >= 0; i--) {
			s = d[i];
			if (LGlobal.canTouch && s.ll_touchPointID != e.touchPointID) {
				continue;
			}
			c = s.parent.globalToLocal(new LPoint(e.offsetX - s.ll_dragMX + s.ll_dragGlobalPoint.x, e.offsetY - s.ll_dragMY + s.ll_dragGlobalPoint.y));
			s.x = c.x;
			s.y = c.y;
			if (s.dragRange) {
				if (s.x < s.dragRange.left) {
					s.x = s.dragRange.left;
				} else if(s.x > s.dragRange.right){
					s.x = s.dragRange.right;
				}
				if (s.y < s.dragRange.top) {
					s.y = s.dragRange.top;
				} else if(s.y > s.dragRange.bottom){
					s.y = s.dragRange.bottom;
				}
			}
			break;
		}
	};
	LGlobal._ll_mobile = function () {
		var w1 = LGlobal.width * 0.3, h1 = w1 * 1.5, s = LGlobal.width * 0.05, ss = w1 * 0.05, sm = w1 * 0.15, 
		sx = w1 * 0.3, sh = h1 * 0.20, c = '#cccccc', d = '#000000', f = '#ffffff', h = '#ff0000', b, w1, h1, m, m1, n, v;
		b = new LSprite();
		addChild(b);
		w1 = LGlobal.width * 0.3, h1 = w1 * 1.5;
		b.graphics.drawRoundRect(1, d, [s, s, w1, h1, s],true,c);
		b.graphics.drawRoundRect(1, d, [s + ss, s + ss, w1 - ss * 2, h1 - ss * 2, s], true, d);
		b.graphics.drawRect(1, f, [s + sm, s + sh, w1 - sm * 2, h1 - sh * 2], true, f);
		b.graphics.drawArc(1, f, [s + w1 * 0.5, s + h1 - ss * 3.5, ss * 1.5, 0, 2 * Math.PI]);
		b.graphics.drawRoundRect(1, f, [s + sx, s + sm, w1 - sx * 2, ss, ss * 0.5]);
		m = new LSprite();
		m.x = -(w1 - sm * 2) * 0.5;
		m.y = -ss * 0.5;
		m.graphics.drawRect(1, h, [0, 0, w1 - sm * 2, ss], true, h);
		m1 = new LSprite();
		m1.y = -(w1 - sm * 2) * 0.5;
		m1.x = -ss * 0.5;
		m1.graphics.drawRect(1, h, [0, 0, ss, w1 - sm * 2], true, h);
		n = new LSprite();
		n.x = s + sx + (w1 - sx * 2) * 0.5;
		n.y = s + sh + (h1 - sh * 2) * 0.5;
		n.rotate = 45;
		n.addChild(m);
		n.addChild(m1);
		b.addChild(n);
		v = new LSprite();
		v.graphics.drawVertices(2, d, [[0, 0], [sm, sm ], [0, sm * 2]], true, c);
		v.x = s * 1.5 + h1;
		v.y = s * 1.5 + h1 * 0.5;
		addChild(v);
		b.arrow = v;
		var fn = function () {
			setTimeout(function () {
				location.href = location.href;
			}, 100);
		};
		window.onorientationchange = fn;
		return b;
	};
	LGlobal.verticalError = function () {
		var w1 = LGlobal.width * 0.3, s = LGlobal.width * 0.05;
		var b = LGlobal._ll_mobile();
		var d = b.clone();
		d.getChildAt(0).visible = false;
		d.x = LGlobal.width * 0.5 + s;
		addChild(d);
		b.rotate = 90;
		b.x = LGlobal.width * 0.5 + s;
		b.y = w1 * 0.5;
	};
	LGlobal.horizontalError = function () {
		var w1 = LGlobal.width * 0.3, s = LGlobal.width * 0.05;
		var b = LGlobal._ll_mobile();
		var d = b.clone();
		d.getChildAt(0).visible = false;
		d.rotate = 90;
		d.x = LGlobal.width - s;
		d.y = w1 * 0.5;
		addChild(d);
		b.arrow.x = s * 1.5 + w1;
	};
	LGlobal.onShow = function () {
		if (LGlobal.canvas == null) {
			return;
		}
		if(LGlobal._outStageCheckCount <= 0){
			LGlobal._outStageCheckCount--;
			if(LGlobal._outStageCheckCount < -2){
				LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
				LGlobal._outStageCheckCount = 1;
			}
		}
		if (LGlobal.fpsStatus) {
			LGlobal.fpsStatus.reset();
		}
		if (LGlobal.stage.onresizeEvent) {
			if(LGlobal.stage.onresizeListener){
				LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
			}
			if(LGlobal.stage.onorientationchangeListener){
				LGlobal.stage.onorientationchangeListener({orientation:(window.innerWidth > window.innerHeight ? LANDSCAPE : PORTRAIT)});
			}
			delete LGlobal.stage.onresizeEvent;
		}
		if (LGlobal.forceRefresh) {
			LGlobal.canvasObj.width = LGlobal.canvasObj.width;
			LGlobal.forceRefresh = false;
		}
		LGlobal.canvas.beginPath();
		if (LGlobal.box2d != null) {
			LGlobal.box2d.ll_show();
			if (!LGlobal.traceDebug && LGlobal.keepClear) {
				LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
			}
		} else {
			if (LGlobal.keepClear) {
				LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
			}
			if (LGlobal.backgroundColor !== null) {
				LGlobal.canvas.fillStyle = LGlobal.backgroundColor;
				LGlobal.canvas.fillRect(0, 0, LGlobal.width, LGlobal.height);
			}
		}
		LGlobal.show(LGlobal.childList, LGlobal.canvas);
	};
	/** @language chinese
	 * <p>将传入的一组对象绘制到指定的CanvasRenderingContext2D对象上。</p>
	 * <p>※该方法每调用一次，只绘制一次。</p>
	 * @method show
	 * @static
	 * @param {Array} list 要绘制的对象数组，数组中的对象必须是LDisplayObject对象
	 * @param {CanvasRenderingContext2D} context2D 通过canvas.getContext("2d")得到的对象
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	var myCanvas=document.getElementById("myCanvas");
	 * 	var ctx=myCanvas.getContext("2d");
	 * 	function main () {
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata(event){
	 * 		var bitmapdata = new LBitmapData(event.target); 
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 		LGlobal.show([bitmap], ctx);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/show.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.10.0
	 */
	LGlobal.show = function (s, ctx) {
		ctx = ctx || LGlobal.canvas;
		for (var i = 0, l = s.length, c; i < l; i++) {
			c = s[i];
			if (c && c.ll_show) {
				c.ll_show(ctx);
				if(c._ll_removeFromSelf){
					i--;
					l--;
				}
			}
		}
	};
	/** @language chinese
	 * <p>将传入的宽和高，按照行数和列数进行拆分计算，会得到一个2维数组。</p>
	 * @method divideCoordinate
	 * @static
	 * @param {float} width 宽
	 * @param {float} height 高
	 * @param {int} row 行数
	 * @param {int} col 列数
	 * @return {Array} 2维数组
	 * @example
	 * 	LInit(50, "legend", 800, 480, main);
	 * 	function main () {
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("player.png", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata(event){
	 * 		var backLayer = new LSprite();
	 * 		addChild(backLayer);
	 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
	 * 		var data = new LBitmapData(event.target,0,0,120,210);
	 * 		player = new LAnimation(backLayer,data,list);
	 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
	 * 	}
	 * 	function onframe(){
	 * 		player.onframe();
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/divideCoordinate.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.3.1
	 */
	LGlobal.divideCoordinate = function (w, h, row, col) {
		var i, j, cw = w / col, ch = h / row, r = [], c;
		for (i = 0; i < row; i++) {
			c = [];
			for (j = 0; j < col; j++) {
				c.push({x : cw * j, y : ch * i, width : cw, height : ch});
			}
			r.push(c);
		}
		return r;
	};
	LGlobal._create_loading_color = function () {
		var co = LGlobal.canvas.createRadialGradient(LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);  
		co.addColorStop(0, "red");  
		co.addColorStop(0.3, "orange");  
		co.addColorStop(0.4, "yellow");  
		co.addColorStop(0.5, "green");  
		co.addColorStop(0.8, "blue");  
		co.addColorStop(1, "violet");  
		return co;
	};
	/** @language chinese
	 * <p>检测点是否在多边形内部</p>
	 * @method hitPolygon
	 * @static
	 * @param {Array} vertices 多边形的顶点数组[[x1,y1],[x2,y2],[x3,y3],......]
	 * @param {float} x coordinate-x of point
	 * @param {float} y coordinate-y of point
	 * @return {Boolean} 当たったらtrueを返す
	 * @example
	 * 	LGlobal.setDebug(true);
	 * 	var layer = new LSprite();
	 * 	addChild(layer);
	 * 	var vertices = [[50,100],[150,50],[100,150]];
	 * 	layer.graphics.drawVertices(1,"#000000",vertices);
	 * 	var point1 = [100,100];
	 * 	layer.graphics.drawArc(1,"#000000",[point1[0],point1[1],2,0,2*Math.PI]);
	 * 	var point2 = [50,200];
	 * 	layer.graphics.drawArc(1,"#000000",[point2[0],point2[1],2,0,2*Math.PI]);
	 * 	trace(LGlobal.hitPolygon(vertices,point1[0],point1[1]));//out:true
	 * 	trace(LGlobal.hitPolygon(vertices,point2[0],point2[1]));//out:false
	 * @examplelink <p><a href="../../../api/LGlobal/hitPolygon.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.8.9
	 */
	LGlobal.hitPolygon = function (list, x, y) {
		var c = 0, p0 = list[0], b0x = (x <= p0[0]), b0y = (y <= p0[1]), i, l, p1, b1x, b1y;
		for (i = 1, l = list.length; i < l + 1; i++) {
			p1 = list[i % l];
			b1x = (x <= p1[0]);
			b1y = (y <= p1[1]);
			if (b0y != b1y) {
				if (b0x == b1x) {
					if (b0x) {
						c += (b0y ? -1 : 1);
					}
				} else {
					if (x <= (p0[0] + (p1[0] - p0[0]) * (y - p0[1] ) / (p1[1] - p0[1]))) {
						c += (b0y ? -1 : 1);
					}
				}
			}
			p0 = p1;
			b0x = b1x;
			b0y = b1y;
		}
		return 0 != c;
	};
	/** @language chinese
	 * <p>检测多边形与多边形的碰撞</p>
	 * @method hitTestPolygon
	 * @static
	 * @param {Array} verticesA 多边形A的顶点数组[[x1,y1],[x2,y2],[x3,y3],......]
	 * @param {Array} verticesB 多边形B的顶点数组[[x1,y1],[x2,y2],[x3,y3],......]
	 * @return {Boolean} 当たったらtrueを返す
	 * @example
	 * 	LGlobal.setDebug(true);
	 * 	var layer = new LSprite();
	 * 	addChild(layer);
	 * 	var vertices = [[50,100],[150,50],[100,150]];
	 * 	layer.graphics.drawVertices(1,"#000000",vertices);
	 * 	var vertices1 = [[120,60],[250,150],[100,100]];
	 * 	layer.graphics.drawVertices(1,"#000000",vertices1);
	 * 	var vertices2 = [[70,200],[100,160],[200,300]];
	 * 	layer.graphics.drawVertices(1,"#000000",vertices2);
	 * 	trace(LGlobal.hitTestPolygon(vertices,vertices1));//out:true
	 * 	trace(LGlobal.hitTestPolygon(vertices,vertices2));//out:false
	 * @examplelink <p><a href="../../../api/LGlobal/hitTestPolygon.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.9.0
	 */
	LGlobal.hitTestPolygon = function (p1, p2) {
		var i, j, l, listA, normals, vecs, list = [[p1, [], []], [p2, [], []]];
		for (j = 0; j < list.length; j++) {
			listA = list[j][0], normals = list[j][1];
			for (i = 0, l = listA.length; i < l; i++) {
				list[j][2].push(new LVec2(listA[i][0], listA[i][1]));
				if (i < l - 1) {
					normals.push((new LVec2(listA[i + 1][0] - listA[i][0], listA[i + 1][1] - listA[i][1])).normL());
				}
			}
			normals.push((new LVec2(listA[0][0] - listA[l - 1][0], listA[0][1] - listA[l - 1][1])).normL());
		}
		for (j = 0; j < list.length; j++) {
			normals = list[j][1];
			for (i = 0, l = normals.length; i < l; i++) {
				var r1 = LVec2.getMinMax(list[0][2], normals[i]);
				var r2 = LVec2.getMinMax(list[1][2], normals[i]);
				if (r1.max_o < r2.min_o || r1.min_o > r2.max_o) {
					return false;
				}
			}
		}
		return true;
	};
	/** @language chinese
	 * <p>检测一个多边形和一个圆的碰撞</p>
	 * @method hitTestPolygonArc
	 * @static
	 * @param {Array} vertices 多边形的顶点数组[[x1,y1],[x2,y2],[x3,y3],......]
	 * @param {Array} circle 圆[中心坐标x,中心坐标y,半径,半径*半径]
	 * @return {Boolean} 当たったらtrueを返す
	 * @example
	 * 	LGlobal.setDebug(true);
	 * 	var layer = new LSprite();
	 * 	addChild(layer);
	 * 	var vertices = [[50,100],[150,50],[100,150]];
	 * 	layer.graphics.drawVertices(1,"#000000",vertices);
	 * 	var circle1 = [170,100,50,2500];
	 * 	layer.graphics.drawArc(1,"#000000",[circle1[0],circle1[1],circle1[2],0,2*Math.PI]);
	 * 	var circle2 = [50,200,50,2500];
	 * 	layer.graphics.drawArc(1,"#000000",[circle2[0],circle2[1],circle2[2],0,2*Math.PI]);
	 * 	trace(LGlobal.hitTestPolygonArc(vertices,circle1));//out:true
	 * 	trace(LGlobal.hitTestPolygonArc(vertices,circle2));//out:false
	 * @examplelink <p><a href="../../../api/LGlobal/hitTestPolygonArc.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.9.0
	 */
	LGlobal.hitTestPolygonArc = function (vs, arc) {
		if (LGlobal.hitPolygon(vs, arc[0], arc[1])) {
			return true;
		}
		var i, j, l, p1, p2, v1, v2, ext, inn, l2;
		for (i = 0, l = vs.length; i < l; i++) {
			j = i < l - 1 ? i + 1 : 0;
			p1 = vs[i], p2 = vs[j];
			v1 = new LVec2(arc[0] - p1[0], arc[1] - p1[1]), v2 = new LVec2(p2[0] - p1[0], p2[1] - p1[1]);
			l2 = v2.normalize();
			inn = LVec2.dot(v1, l2);
			if (inn <= 0) {
				if (v1.x * v1.x + v1.y * v1.y < arc[3]) {
					return true;
				}
			} else if (inn * inn < v2.x * v2.x + v2.y * v2.y) {
				ext = LVec2.cross(v1, l2);
				if (ext * ext < arc[3]) {
					return true;
				}
			}
		}
		return false;
	};
	/** @language chinese
	 * <p>将两个对象看作圆来检测碰撞</p>
	 * <p>如果对象发生旋转，则不能使用此方法进行碰撞检测，请使用LSprite类的hitTestObject</p>
	 * @method hitTestArc
	 * @static
	 * @param {LDisplayObject} objA 对象A
	 * @param {LDisplayObject} objB 对象B
	 * @param {float} objAR 新的半径
	 * @param {float} objBR 新的半径
	 * @return {Boolean} 当たったらtrueを返す
	 * @example
	 * 	LGlobal.setDebug(true);
	 * 	var arcLayer1 = new LSprite();
	 * 	arcLayer1.graphics.drawArc(1,"#000000",[100,100,100,0,2*Math.PI]);
	 * 	addChild(arcLayer1);
	 * 	var arcLayer2 = new LSprite();
	 * 	arcLayer2.alpha = 0.5;
	 * 	arcLayer2.x = 150;
	 * 	arcLayer2.graphics.drawArc(1,"#000000",[100,100,100,0,2*Math.PI]);
	 * 	addChild(arcLayer2);
	 * 	var arcLayer3 = new LSprite();
	 * 	arcLayer3.alpha = 0.5;
	 * 	arcLayer3.x = 300;
	 * 	arcLayer3.graphics.drawArc(1,"#000000",[100,100,100,0,2*Math.PI]);
	 * 	addChild(arcLayer3);
	 * 	//[100,100,100,0,2*Math.PI] vs [100,100,100,0,2*Math.PI]
	 * 	trace(LGlobal.hitTestArc(arcLayer1,arcLayer2));//out:true
	 * 	//[115,115,70,0,2*Math.PI] vs [115,115,70,0,2*Math.PI]
	 * 	trace(LGlobal.hitTestArc(arcLayer2,arcLayer3,70,70));//out:false
	 * @examplelink <p><a href="../../../api/LGlobal/hitTestArc.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.4.1
	 */
	LGlobal.hitTestArc = function (objA, objB, objAR, objBR) {
		var rA = objA.getWidth() * 0.5
		,rB = objB.getWidth() * 0.5
		,xA = objA._startX ? objA._startX() : objA.startX()
		,xB = objB._startX ? objB._startX() : objB.startX()
		,yA = objA._startY ? objA._startY() : objA.startY()
		,yB = objB._startY ? objB._startY() : objB.startY();
		if (typeof objAR != UNDEFINED) {
			xA += (rA - objAR);
			yA += (rA - objAR);
			rA = objAR;
		}
		if (typeof objBR != UNDEFINED) {
			xB += (rB - objBR);
			yB += (rB - objBR);
			rB = objBR;
		}
		var disx = xA + rA - xB - rB
		,disy = yA + rA - yB - rB;
		return disx * disx + disy * disy < (rA + rB) * (rA + rB);
	};
	/** @language chinese
	 * <p>将两个对象看作矩形来检测碰撞，等同于 hitTest。</p>
	 * <p>如果对象发生旋转，则不能使用此方法进行碰撞检测，请使用LSprite类的hitTestObject</p>
	 * @method hitTestRect
	 * @static
	 * @param {LDisplayObject} objA 对象A
	 * @param {LDisplayObject} objB 对象B
	 * @param {Array} vecA 重新设置对象A的矩形范围 [width,height]
	 * @param {Array} vecB 重新设置对象B的矩形范围 [width,height]
	 * @return {Boolean} 如果碰撞则返回true。
	 * @example
	 * 	LGlobal.setDebug(true);
	 * 	var rectLayer1 = new LSprite();
	 * 	rectLayer1.graphics.drawRect(1,"#000000",[0,0,200,200],true,"#FF0000");
	 * 	addChild(rectLayer1);
	 * 	var rectLayer2 = new LSprite();
	 * 	rectLayer2.alpha = 0.5;
	 * 	rectLayer2.x = 150;
	 * 	rectLayer2.graphics.drawRect(1,"#000000",[0,0,200,200],true,"#00FF00");
	 * 	addChild(rectLayer2);
	 * 	var rectLayer3 = new LSprite();
	 * 	rectLayer3.alpha = 0.5;
	 * 	rectLayer3.x = 300;
	 * 	rectLayer3.graphics.drawRect(1,"#000000",[0,0,200,200],true,"#0000FF");
	 * 	addChild(rectLayer3);
	 * 	//[0,0,200,200] vs [0,0,200,200]
	 * 	trace(LGlobal.hitTestRect(rectLayer1,rectLayer2));//out:true
	 * 	//[30,0,140,200] vs [30,0,140,200]
	 * 	trace(LGlobal.hitTestRect(rectLayer2,rectLayer3,[140,200],[140,200]));//out:false
	 * @examplelink <p><a href="../../../api/LGlobal/hitTestRect.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.4.1
	 */
	LGlobal.hitTestRect = function (objA, objB, vecA, vecB) {
		var wA = objA.getWidth()
		,wB = objB.getWidth()
		,hA = objA.getHeight()
		,hB = objB.getHeight()
		,xA = objA._startX ? objA._startX() : objA.startX()
		,xB = objB._startX ? objB._startX() : objB.startX()
		,yA = objA._startY ? objA._startY() : objA.startY()
		,yB = objB._startY ? objB._startY() : objB.startY();
		if (typeof vecA != UNDEFINED) {
			xA += (wA - vecA[0]) * 0.5;
			yA += (hA - vecA[1]) * 0.5;
			wA = vecA[0];
			hA = vecA[1];
		}
		if (typeof vecB != UNDEFINED) {
			xB += (wB - vecB[0]) * 0.5;
			yB += (hB - vecB[1]) * 0.5;
			wB = vecB[0];
			hB = vecB[1];
		}
		var minx = xA > xB ? xA : xB
		,miny = yA > yB ? yA : yB
		,maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
		,maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
		return minx <= maxx && miny <= maxy;
	};
	LGlobal.hitTest = LGlobal.hitTestRect;
	/** @language chinese
	 * 重新设定游戏速度
	 * @method setFrameRate
	 * @static
	 * @param {int} speed 游戏速度,每次页面刷新间隔（单位毫秒）, FPS = 1000 / speed。
	 * @example
	 * 	LGlobal.setFrameRate(1000/60);
	 * @examplelink <p><a href="../../../api/LGlobal/setFrameRate.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.5.0
	 */
	LGlobal.setFrameRate = function (s) {
		if (LGlobal.frameRate) {
			clearInterval(LGlobal.frameRate);
		}
		LGlobal.speed = s;
		LGlobal.frameRate = setInterval(function () {
			LGlobal.onShow();
		}, s);
	};
	LGlobal.ll_scaleX = function (v) {
		return (v - LGlobal.left) * LGlobal.width/LGlobal.canvasStyleWidth;
	};
	LGlobal.ll_scaleY = function (v) {
		return (v - LGlobal.top) * LGlobal.height / LGlobal.canvasStyleHeight;
	};
	LGlobal.ll_setStageSize = function (w, h) {
		w =  Math.ceil(w);
		h =  Math.ceil(h);
		LGlobal.canvasObj.style.width = w + "px";
		LGlobal.canvasObj.style.height = h + "px";
		LGlobal.canvasStyleWidth = w;
		LGlobal.canvasStyleHeight = h;
	};
	/** @language chinese
	 * 将画面设置为指定大小
	 * @method resize
	 * @static
	 * @param {float} width 指定宽度
	 * @param {float} height 指定高度
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.resize(400,100);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/resize.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.9.0
	 */
	LGlobal.resize = function (canvasW, canvasH) {
		var w, h, t = 0, l = 0, ww = window.innerWidth, wh = window.innerHeight;
		LGlobal.innerWidth = ww;
		LGlobal.innerHeight = wh;
		if (canvasW) {
			w = canvasW;
		}
		if (canvasH) {
			h = canvasH;
		}
		if (LGlobal.stageScale == "noScale") {
			w = canvasW || LGlobal.width;
			h = canvasH || LGlobal.height;
		}
		switch (LGlobal.stageScale) {
		case "exactFit":
			w = canvasW || ww;
			h = canvasH || wh;
			break;
		case "noBorder":
			w = canvasW || ww;
			h = canvasH || LGlobal.height*ww/LGlobal.width;
			switch (LGlobal.align) {
			case LStageAlign.BOTTOM:
			case LStageAlign.BOTTOM_LEFT:
			case LStageAlign.BOTTOM_RIGHT:
			case LStageAlign.BOTTOM_MIDDLE:
				t = wh - h;
				break;
			}
		break;
		case "showAll":
			if (ww / wh > LGlobal.width / LGlobal.height) {
				h = canvasH || wh;
				w = canvasW || LGlobal.width * wh / LGlobal.height;
			} else {
				w = canvasW || ww;
				h = canvasH || LGlobal.height * ww / LGlobal.width;
			}
		case "noScale":
		default:
			switch (LGlobal.align) {
			case LStageAlign.BOTTOM:
			case LStageAlign.BOTTOM_LEFT:
				t = wh - h;
				break;
			case LStageAlign.RIGHT:
			case LStageAlign.TOP_RIGHT:
				l = ww - w;
				break;
			case LStageAlign.TOP_MIDDLE:
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.BOTTOM_RIGHT:
				t = wh - h;
				l = ww - w;
				break;
			case LStageAlign.BOTTOM_MIDDLE:
				t = wh - h;
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.MIDDLE:
				t = (wh - h) * 0.5;
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.TOP:
			case LStageAlign.LEFT:
			case LStageAlign.TOP_LEFT:
			default:
			}
		}
		LGlobal.canvasObj.style.marginTop = t + "px";
		LGlobal.canvasObj.style.marginLeft = l + "px";
		if (LGlobal.isOldFirefox) {
			LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
			LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
		}
		LGlobal.ll_setStageSize(w, h);
	};
	LGlobal.sleep = function (s) {
		var d = new Date();   
		while ((new Date().getTime() - d.getTime()) < s) {}
	};
	/** @language chinese
	 * 全画面显示或者设定画面大小的缩放比例值
	 * @method screen
	 * @static
	 * @param {String | float} value 全画面的静态值LGlobal.FULL_SCREEN 或者 画面大小的缩放比例值
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	 * 		LGlobal.screen(LStage.FULL_SCREEN);
	 * 		//you can also use it like : LGlobal.screen(1.5);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/screen.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.6.0
	 */
	LGlobal.screen = function (a) {
		LGlobal.displayState = a;
		if (LGlobal.stage) {
			if (typeof LGlobal.displayState == "number") {
				LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
			} else {
				LGlobal.resize();
			}
		}
	};
	return LGlobal;
})();
var LSystem = LGlobal;
var LStage = LGlobal;