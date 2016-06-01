/** @language chinese
 * <p>用户将焦点从显示列表中的一个LTextField对象更改到另一个LTextField对象时，对象将调度 LFocusEvent 对象。</p>
 * <p>※ LGlobal.stage作为舞台，也可以添加LFocusEvent事件，LFocusEvent.FOCUS_IN表示鼠标(或手指)进入舞台，反之，LFocusEvent.FOCUS_OUT则指的是舞台失去焦点，包括移动端手指移出屏幕，或者因为alert等弹出框而使得画面失去焦点后触发。</p>
 * @class LFocusEvent
 * @constructor
 * @since 1.9.0
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var theTextField1 = new LTextField();
 * 		theTextField1.x = 20;
 * 		theTextField1.y = 20;
 * 		theTextField1.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField1);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField1.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 		var theTextField2 = new LTextField();
 * 		theTextField2.x = 20;
 * 		theTextField2.y = 100;
 * 		theTextField2.setType(LTextFieldType.INPUT);
 * 		addChild(theTextField2);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_IN, onfocus);
 * 		theTextField2.addEventListener(LFocusEvent.FOCUS_OUT, outfocus);
 * 	}
 * 	function onfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_IN");
 * 	}
 * 	function outfocus(e){
 * 		trace(e.currentTarget + "(" + e.currentTarget.objectIndex + ") FOCUS_OUT");
 * 	}
 * @examplelink <p><a href="../../../api/LFocusEvent/index.html" target="_blank">测试链接</a></p>
 * @public
 */
var LFocusEvent = function (){throw "LFocusEvent cannot be instantiated";};
/** @language chinese
 * [静态] 定义 focusIn 事件对象的 type 属性值。(目前只有LTextField对象支持)
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * </table>
 * @property FOCUS_IN
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
LFocusEvent.FOCUS_IN = "focusIn";
/** @language chinese
 * [静态] 定义 focusOut 事件对象的 type 属性值。(目前只有LTextField对象支持)
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>currentTarget</td><td>当前正在使用某个事件侦听器处理 Event 对象的对象。</td></tr>
 * <tr><td>target</td><td>在此事件中等同于currentTarget。</td></tr>
 * </table>
 * @property FOCUS_OUT
 * @type String
 * @static
 * @since 1.9.0
 * @public
 */
LFocusEvent.FOCUS_OUT = "focusOut";