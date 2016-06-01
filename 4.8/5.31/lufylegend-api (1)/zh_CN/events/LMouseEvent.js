/** @language chinese
 * <p>每次发生鼠标事件时，都会将 LMouseEvent 对象调度到事件流中。鼠标事件通常由使用指针的用户输入设备（如鼠标或轨迹球）生成。</p>
 * <p>如果是移动浏览器，则MOUSE_DOWN,MOUSE_UP,MOUSE_MOVE会自动转换为TOUCH_DOWN,TOUCH_UP,TOUCH_MOVE，开发者无需自己增加额外的判断。</p>
 * @class LMouseEvent
 * @constructor
 * @since 1.0.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var layer01 = new LSprite();
 * 		layer01.x = 50;
 * 		layer01.y = 20;
 * 		addChild(layer01);
 * 		var bmd = new LBitmapData("#FF0000", 0, 0, 100, 100);
 * 		var bm = new LBitmap(bmd);
 * 		layer01.addChild(bm);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer01.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 		
 * 		var layer02 = new LSprite();
 * 		layer02.graphics.drawRect(1,"#008800",[0,0,100,100],true);
 * 		layer02.x = 200;
 * 		layer02.y = 20;
 * 		addChild(layer02);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouse);
 * 		layer02.addEventListener(LMouseEvent.MOUSE_DOWN, onmouseOther);
 * 	}
 * 	function onmouse(event){
 * 		trace("event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("event.target : " + event.target + "(" + event.target.objectIndex + ")");
 * 		trace("event.clickTarget == event.currentTarget : " + (event.clickTarget == event.currentTarget));
 * 		trace("event.offsetX : " + event.offsetX, "event.offsetY : " + event.offsetY);
 * 		trace("event.selfX : " + event.selfX, "event.selfY : " + event.selfY, "");
 * 	}
 * 	function onmouseOther(event,object){
 * 		trace("onmouseOther event.currentTarget : " + event.currentTarget + "(" + event.currentTarget.objectIndex + ")");
 * 		trace("onmouseOther object : " + object + "(" + object.objectIndex + ")");
 * 		trace("onmouseOther object == event.currentTarget : " + (object == event.currentTarget), "");
 * 	}
 * @examplelink <p><a href="../../../api/LMouseEvent/index.html" target="_blank">测试链接</a></p>
 * @public
 */
var LMouseEvent = function (){throw "LMouseEvent cannot be instantiated";};
/** @language chinese
 * <p>[静态] 定义 mouseDown 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。等同于 clickTarget。</td></tr>
 * <tr><td>target</td><td>指针设备下的 LInteractiveObject 实例。target 不一定是显示列表中注册此事件侦听器的对象。请使用 currentTarget 属性来访问显示列表中当前正在处理此事件的对象。</td></tr>
 * <tr><td>offsetX</td><td>事件发生点在全局舞台坐标中的水平坐标。</td></tr>
 * <tr><td>offsetY</td><td>事件发生点在全局舞台坐标中的垂直坐标。</td></tr>
 * <tr><td>selfX</td><td>事件发生点在当前正在处理此事件的对象坐标中的水平坐标。</td></tr>
 * <tr><td>selfY</td><td>事件发生点在当前正在处理此事件的对象坐标中的垂直坐标。</td></tr>
 * <tr><td>button</td><td>鼠标的按键动作。左键：1，右键：2。</td></tr>
 * </table>
 * @property MOUSE_DOWN
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LMouseEvent.MOUSE_DOWN = "mousedown";
/** @language chinese
 * <p>[静态] 定义 mouseUp 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。等同于 clickTarget。</td></tr>
 * <tr><td>target</td><td>指针设备下的 LInteractiveObject 实例。target 不一定是显示列表中注册此事件侦听器的对象。请使用 currentTarget 属性来访问显示列表中当前正在处理此事件的对象。</td></tr>
 * <tr><td>offsetX</td><td>事件发生点在全局舞台坐标中的水平坐标。</td></tr>
 * <tr><td>offsetY</td><td>事件发生点在全局舞台坐标中的垂直坐标。</td></tr>
 * <tr><td>selfX</td><td>事件发生点在当前正在处理此事件的对象坐标中的水平坐标。</td></tr>
 * <tr><td>selfY</td><td>事件发生点在当前正在处理此事件的对象坐标中的垂直坐标。</td></tr>
 * <tr><td>button</td><td>鼠标的按键动作。左键：1，右键：2。</td></tr>
 * </table>
 * @property MOUSE_UP
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
/** @language chinese
 * <p>[静态] 定义 mouseMove 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。等同于 clickTarget。</td></tr>
 * <tr><td>target</td><td>指针设备下的 LInteractiveObject 实例。target 不一定是显示列表中注册此事件侦听器的对象。请使用 currentTarget 属性来访问显示列表中当前正在处理此事件的对象。</td></tr>
 * <tr><td>offsetX</td><td>事件发生点在全局舞台坐标中的水平坐标。</td></tr>
 * <tr><td>offsetY</td><td>事件发生点在全局舞台坐标中的垂直坐标。</td></tr>
 * <tr><td>selfX</td><td>事件发生点在当前正在处理此事件的对象坐标中的水平坐标。</td></tr>
 * <tr><td>selfY</td><td>事件发生点在当前正在处理此事件的对象坐标中的垂直坐标。</td></tr>
 * </table>
 * @property MOUSE_MOVE
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LMouseEvent.MOUSE_MOVE = "mousemove";
/** @language chinese
 * <p>[静态] 定义 mouseOver 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。等同于 clickTarget。</td></tr>
 * <tr><td>target</td><td>指针设备下的 LInteractiveObject 实例。target 不一定是显示列表中注册此事件侦听器的对象。请使用 currentTarget 属性来访问显示列表中当前正在处理此事件的对象。</td></tr>
 * <tr><td>offsetX</td><td>事件发生点在全局舞台坐标中的水平坐标。</td></tr>
 * <tr><td>offsetY</td><td>事件发生点在全局舞台坐标中的垂直坐标。</td></tr>
 * <tr><td>selfX</td><td>事件发生点在当前正在处理此事件的对象坐标中的水平坐标。</td></tr>
 * <tr><td>selfY</td><td>事件发生点在当前正在处理此事件的对象坐标中的垂直坐标。</td></tr>
 * </table>
 * @property MOUSE_OVER
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LMouseEvent.MOUSE_OVER = "mouseover";
/** @language chinese
 * <p>[静态] 定义 mouseOut 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。等同于 clickTarget。</td></tr>
 * <tr><td>target</td><td>指针设备下的 LInteractiveObject 实例。target 不一定是显示列表中注册此事件侦听器的对象。请使用 currentTarget 属性来访问显示列表中当前正在处理此事件的对象。</td></tr>
 * </table>
 * @property MOUSE_OUT
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LMouseEvent.MOUSE_OUT = "mouseout";
/** @language chinese
 * <p>[静态] 定义 doubleClick 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。等同于 clickTarget。</td></tr>
 * <tr><td>target</td><td>指针设备下的 LInteractiveObject 实例。target 不一定是显示列表中注册此事件侦听器的对象。请使用 currentTarget 属性来访问显示列表中当前正在处理此事件的对象。</td></tr>
 * <tr><td>offsetX</td><td>事件发生点在全局舞台坐标中的水平坐标。</td></tr>
 * <tr><td>offsetY</td><td>事件发生点在全局舞台坐标中的垂直坐标。</td></tr>
 * <tr><td>selfX</td><td>事件发生点在当前正在处理此事件的对象坐标中的水平坐标。</td></tr>
 * <tr><td>selfY</td><td>事件发生点在当前正在处理此事件的对象坐标中的垂直坐标。</td></tr>
 * <tr><td>button</td><td>鼠标的按键动作。左键：1，右键：2。</td></tr>
 * </table>
 * @property DOUBLE_CLICK
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LMouseEvent.DOUBLE_CLICK = "dblclick";