/** @language chinese
 * <p>在响应用户通过键盘输入的内容时将调度的 LKeyboardEvent 对象 ID。有两种类型的键盘事件：LKeyboardEvent.KEY_DOWN 和 LKeyboardEvent.KEY_UP</p>
 * <p>加载键盘事件必须使用LGlobal.stage.addEventListener或者LEvent.addEventListener。</p>
 * @class LKeyboardEvent
 * @constructor
 * @since 1.0.0
 * @example
 * 	LInit(50, "legend", 800, 80, main);
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var title = new LTextField();
 * 		addChild(title);
 * 		title.text = "Click the keyboard, please!";
 * 		LGlobal.stage.addEventListener(LKeyboardEvent.KEY_DOWN,keydown);
 * 		//LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,keydown);
 * 		LGlobal.stage.addEventListener(LKeyboardEvent.KEY_UP,keyup);
 * 		//LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,keydown);
 * 		LGlobal.stage.addEventListener(LKeyboardEvent.KEY_PRESS,keypress);
 * 		//LEvent.addEventListener(window,LKeyboardEvent.KEY_PRESS,keypress);
 * 	}
 * 	function keydown (e) {
 * 		trace("keydown e.keyCode = " + e.keyCode);
 * 	}
 * 	function keyup (e) {
 * 		trace("keyup e.keyCode = " + e.keyCode);
 * 	}
 * 	function keypress (e) {
 * 		trace("keypress e.keyCode = " + e.keyCode);
 * 	}
 * @examplelink <p><a href="../../../api/LKeyboardEvent/index.html" target="_blank">测试链接</a></p>
 * @public
 */
var LKeyboardEvent = function () {throw "LKeyboardEvent cannot be instantiated";};
/** @language chinese
 * <p>[静态] 定义 keydown 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>type</td><td>返回当前 Event 对象表示的事件的名称。</td></tr>
 * <tr><td>keyCode</td><td>对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。</td></tr>
 * <tr><td>ctrlKey</td><td>返回当事件被触发时，"CTRL" 键是否被按下。</td></tr>
 * <tr><td>shiftKey</td><td>返回当事件被触发时，"SHIFT" 键是否被按下。</td></tr>
 * <tr><td>altKey</td><td>返回当事件被触发时，"ALT" 是否被按下。</td></tr>
 * <tr><td>metaKey</td><td>返回当事件被触发时，"meta" 键是否被按下。</td></tr>
 * </table>
 * @property KEY_DOWN
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LKeyboardEvent.KEY_DOWN = "keydown";
/** @language chinese
 * <p>[静态] 定义 keyup 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>type</td><td>返回当前 Event 对象表示的事件的名称。</td></tr>
 * <tr><td>keyCode</td><td>对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。</td></tr>
 * <tr><td>ctrlKey</td><td>返回当事件被触发时，"CTRL" 键是否被按下。</td></tr>
 * <tr><td>shiftKey</td><td>返回当事件被触发时，"SHIFT" 键是否被按下。</td></tr>
 * <tr><td>altKey</td><td>返回当事件被触发时，"ALT" 是否被按下。</td></tr>
 * <tr><td>metaKey</td><td>返回当事件被触发时，"meta" 键是否被按下。</td></tr>
 * </table>
 * @property KEY_UP
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LKeyboardEvent.KEY_UP = "keyup";
/** @language chinese
 * <p>[静态] 定义 keypress 事件对象的 type 属性值。</p>
 * <p>此事件具有以下属性：</p>
 * <table>
 * <tr><th>属性</th><th>值</th></tr>
 * <tr><td>type</td><td>返回当前 Event 对象表示的事件的名称。</td></tr>
 * <tr><td>keyCode</td><td>对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。</td></tr>
 * <tr><td>ctrlKey</td><td>返回当事件被触发时，"CTRL" 键是否被按下。</td></tr>
 * <tr><td>shiftKey</td><td>返回当事件被触发时，"SHIFT" 键是否被按下。</td></tr>
 * <tr><td>altKey</td><td>返回当事件被触发时，"ALT" 是否被按下。</td></tr>
 * <tr><td>metaKey</td><td>返回当事件被触发时，"meta" 键是否被按下。</td></tr>
 * </table>
 * @property KEY_PRESS
 * @type String
 * @static
 * @since 1.0.0
 * @public
 */
LKeyboardEvent.KEY_PRESS = "keypress";