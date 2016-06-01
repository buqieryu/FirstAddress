/** @language chinese
 * <p>LEvent 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。</p>
 * @class LEvent
 * @constructor
 * @since 1.9.0
 * @public
 */
function LEvent(type){
	this.eventType = type;
	this._ll_preventDefault = false;
}
LEvent.prototype.preventDefault = function () {
	this._ll_preventDefault = true;
};
/** @language chinese
 * <p>[静态] 定义 lufylegend.js引擎初始化 事件对象的 type 属性值，当引擎初始化是在window.onload事件之后，需要使用此属性。</p>
 * <p>LEvent.INIT在1.10.1之后已经废弃。</p>
 * @property INIT
 * @type String
 * @static
 * @since 1.0.0
 * @example
 * 	<!DOCTYPE html>
 * 	<html>
 * 	<head>
 * 	<meta charset="UTF-8">
 * 	<script type="text/javascript" src="../lufylegend-x.x.x.min.js"></script> 
 * 	<title>demo</title>
 * 	</head>
 * 	<body>
 * 	<div id="mylegend">loading……</div>
 * 	<script>
 * 	window.onload = function () {
 * 		LInit(50, "mylegend", 800, 480, main, LEvent.INIT);
 * 	};
 * 	function main(){
 * 		alert("Hello lufylegend!");
 * 	}
 * 	</script>
 * 	</body>
 * 	</html>
 * @public
 */
LEvent.INIT = "init";
/** @language chinese
 * <p>[静态] 定义加载完成事件对象的 type 属性值。</p>
 * <p>此事件可以在下列对象中使用：</p>
 * <table>
 * <tr><th>对象</th><th>说明</th></tr>
 * <tr><td>LLoader</td><td>图片加载完成事件。</td></tr>
 * <tr><td>LURLLoader</td><td>js文件或者文本文件加载完成事件。</td></tr>
 * <tr><td>LMedia</td><td>多媒体文件加载完成事件。</td></tr>
 * <tr><td>LAnimation</td><td>一组动画播放完成事件。</td></tr>
 * <tr><td>LStageWebView</td><td>网页加载完成事件。</td></tr>
 * </table>
 * @property COMPLETE
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LEvent.COMPLETE = "complete";
/** @language chinese
 * <p>[静态] 定义 加载异常事件对象的 type 属性值。</p>
 * <p>此事件可以在下列对象中使用：</p>
 * <table>
 * <tr><th>对象</th><th>说明</th></tr>
 * <tr><td>LLoader</td><td>图片加载异常事件。</td></tr>
 * <tr><td>LURLLoader</td><td>js文件或者文本文件加载异常事件。</td></tr>
 * <tr><td>LMedia</td><td>多媒体文件加载异常事件。</td></tr>
 * </table>
 * @property ERROR
 * @type String
 * @static
 * @since 1.10.1
 * @public
 */
LEvent.ERROR = "error";
/** @language chinese
 * <p>[静态] 定义 加载进度事件对象的 type 属性值。</p>
 * <p>此事件可以在下列对象中使用：</p>
 * <table>
 * <tr><th>对象</th><th>说明</th></tr>
 * <tr><td>LLoader</td><td>图片加载进度事件。</td></tr>
 * <tr><td>LURLLoader</td><td>js文件或者文本文件加载进度事件。</td></tr>
 * <tr><td>LMedia</td><td>多媒体文件加载进度事件。</td></tr>
 * </table>
 * @property ERROR
 * @type String
 * @static
 * @since 1.10.1
 * @public
 */
LEvent.PROGRESS = "progress";
/** @language chinese
 * <p>[播放事件] 播放头进入新帧时调度。如果播放头不移动，或者只有一帧，则会继续以帧速率调度此事件。此事件为广播事件，这意味着具有注册了此事件的侦听器的所有显示对象都会调度此事件。</p>
 * <p>LEvent.ENTER_FRAME 常量定义 enterFrame 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * </table>
 * @property ENTER_FRAME
 * @type String
 * @static
 * @since 1.0.0
 * @example
 * 	LInit(1000/60, "legend", 800, 480, main);
 * 	var direction = 1;
 * 	function main () {
 * 		var layer = new LSprite();
 * 		addChild(layer);
 * 		layer.graphics.drawRect(1, "#ff0000", [0, 0, 100, 100], true, "#880088");
 * 		layer.addEventListener(LEvent.ENTER_FRAME,onframe);
 * 	}
 * 	function onframe(event){
 * 		var layer = event.currentTarget;
 * 		layer.x += direction;
 * 		if(layer.x < 0){
 * 			direction = 1;
 * 		}
 * 		if(layer.x > 700){
 * 			direction = -1;
 * 		}
 * 	}
 * @examplelink <p><a href="../../../api/LEvent/ENTER_FRAME.html" target="_blank">测试链接</a></p>
 * @public
 */
LEvent.ENTER_FRAME = "enter_frame";
/** @language chinese
 * <p>当调整浏览器窗口的大小时，发生resize 事件。</p>
 * @property WINDOW_RESIZE
 * @type String
 * @static
 * @since 1.9.0
 * @example
 * 	LInit(1000/60, "legend", window.innerWidth,window.innerHeight, main);
 * 	var layer;
 * 	function main () {
 * 		layer = new LSprite();
 * 		addChild(layer);
 * 		update();
 * 		LGlobal.stage.addEventListener(LEvent.WINDOW_RESIZE,update);
 * 	}
 * 	function update(){
 * 		LGlobal.resize(window.innerWidth,window.innerHeight);
 * 		layer.graphics.clear();
 * 		layer.graphics.drawRect(1, "#ff0000", [0, 0, 50, 50], true, "#880088");
 * 		layer.graphics.drawRect(1, "#ff0000", [LGlobal.width - 50, 0, 50, 50], true, "#880088");
 * 		layer.graphics.drawRect(1, "#ff0000", [0, LGlobal.height - 50, 50, 50], true, "#880088");
 * 		layer.graphics.drawRect(1, "#ff0000", [LGlobal.width - 50, LGlobal.height - 50, 50, 50], true, "#880088");
 * 	}
 * @examplelink <p><a href="../../../api/LEvent/WINDOW_RESIZE.html" target="_blank">测试链接</a></p>
 * @public
 */
LEvent.WINDOW_RESIZE = "resize";
/** @language chinese
 * <p>当屏幕旋转时，发生orientationchange 事件。</p>
 * @property WINDOW_ORIENTATIONCHANGE
 * @type String
 * @static
 * @since 1.9.11
 * @example
 * 	LInit(1000/60, "legend", 400,400, main);
 * 	var label;
 * 	function main () {
 * 		label = new LTextField();
 * 		label.x = label.y = 20;
 * 		label.text = "orientationchange test";
 * 		addChild(label);
 * 		LGlobal.stage.addEventListener(LEvent.WINDOW_ORIENTATIONCHANGE,orientationIsChange);
 * 	}
 * 	function orientationIsChange(e){
 * 		label.text = e.orientation;
 * 	}
 * @examplelink <p><a href="../../../api/LEvent/WINDOW_ORIENTATIONCHANGE.html" target="_blank">测试链接</a></p>
 * @public
 */
LEvent.WINDOW_ORIENTATIONCHANGE = "orientationchange";
LEvent.SOUND_COMPLETE = "sound_complete";
LEvent.END_CONTACT = "endContact";
LEvent.PRE_SOLVE = "preSolve";
LEvent.POST_SOLVE = "postSolve";
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.addEventListener = function (n, t, f, b) {
	if (b == null) {
		b = false;
	}
	if (n.addEventListener) {
		n.addEventListener(t, f, b);
	} else if (n.attachEvent) {
		n["e" + t + f] = f;
		n[t + f] = function () {
			n["e" + t + f]();
		};
		n.attachEvent("on" + t, n[t + f]);
	}
};
LEvent.removeEventListener = function (n, t, f, b) {
	if (b == null) {
		b = false;
	}
	if (n.removeEventListener) {
		n.removeEventListener(t, f, b);
	} else if (n.detachEvent) {
		n["e" + t + f] = f;
		n[t + f] = function () {
			n["e" + t + f]();
		};
		n.detachEvent("on" + t, n[t + f]);
	}
};
/** @language chinese
 * <p>[静态] LEvent.ADDED 常量定义 added 事件对象的 type 属性值。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * @property LEvent.ADDED
 * @type String
 * @static
 * @since 1.9.1
 * @examplelink <p><a href="../../../api/LEvent.added/added.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language chinese
 * <p>[静态] LEvent.ADDED_TO_STAGE 常量定义 addedToStage 事件对象的 type 属性值。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * @property LEvent.ADDED_TO_STAGE
 * @type String
 * @static
 * @since 1.9.1
 * @examplelink <p><a href="../../../api/LEvent.added/added.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language chinese
 * <p>[静态] LEvent.REMOVED 常量定义 removed 事件对象的 type 属性值。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * @property LEvent.REMOVED
 * @type String
 * @static
 * @since 1.9.1
 * @examplelink <p><a href="../../../api/LEvent.added/removed.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language chinese
 * <p>[静态] LEvent.REMOVED_FROM_STAGE 常量定义 removedFromStage 事件对象的 type 属性值。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * @property LEvent.REMOVED_FROM_STAGE
 * @type String
 * @static
 * @since 1.9.1
 * @examplelink <p><a href="../../../api/LEvent.added/removed.html" target="_blank">测试链接</a></p>
 * @public
 */