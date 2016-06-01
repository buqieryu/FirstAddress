/** @language chinese
 * <p>LInteractiveObject 类是用户可以使用鼠标与之交互的所有显示对象的抽象基类。不能直接实例化 LInteractiveObject 类。</p>
 * @class LInteractiveObject
 * @extends LDisplayObject
 * @constructor
 * @since 1.9.0
 * @public
 */
var LInteractiveObject = (function() {
	function LInteractiveObject() {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.type = "LInteractiveObject";
		/** @language chinese
		 * 指定此对象是否接收鼠标或其他用户输入、消息。默认值为 true，这表示默认情况下，显示列表上的任何 LInteractiveObject 实例都会接收鼠标事件或其他用户输入事件。如果将 mouseEnabled 设置为 false，则实例将不接收任何鼠标事件（或其他用户输入事件，例如键盘事件）。显示列表上的该实例的任何子级都不会受到影响。要更改显示列表上对象的所有子级的 mouseEnabled 行为，请使用 LDisplayObjectContainer.mouseChildren。
		 * @property mouseEnabled
		 * @type Boolean
		 * @since 1.8.10
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var button01 = new LButtonSample1("mouseEnabled=true");
		 * 	button01.x = button01.y = 20;
		 * 	addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("mouseEnabled=false");
		 * 	button02.x = 20;
		 * 	button02.y = 150;
		 * 	button02.mouseEnabled = false;
		 * 	addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LInteractiveObject/mouseEnabled.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.mouseEnabled = true;
		s.mouseList = new Array();
	}
	var p = {
		addEventListener : function(type, listener) {
			var s = this;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LMouseEventContainer.container[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.addMouseEvent(s, type, listener);
					return;
				}
				s.mouseList.push({
					listener : listener,
					type : type
				});
			} else {
				s._eventList.push({
					listener : listener,
					type : type
				});
			}
		},
		removeEventListener : function(type, listener) {
			var s = this, i, length;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LMouseEventContainer.container[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.removeMouseEvent(s, type, listener);
					return;
				}
				length = s.mouseList.length;
				for ( i = 0; i < length; i++) {
					if (!s.mouseList[i]) {
						continue;
					}
					if (type == s.mouseList[i].type && s.mouseList[i].listener == listener) {
						s.mouseList.splice(i, 1);
						return;
					}
				}
			} else {
				return s.callParent("removeEventListener", arguments);
			}
		},
		removeAllEventListener : function() {
			var s = this;
			s.mouseList.length = 0;
			s._eventList.length = 0;
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_DOWN);
			}
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_UP]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_UP);
			}
			if (LMouseEventContainer.container[LMouseEvent.MOUSE_MOVE]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_MOVE);
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OVER);
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OUT);
			}
		},
		hasEventListener : function(type, listener) {
			var s = this, i, length;
			if (LMouseEventContainer.container[type]) {
				return LMouseEventContainer.hasEventListener(s, type, listener);
			}
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				length = s.mouseList.length;
				for ( i = 0; i < length; i++) {
					if (!s.mouseList[i]) {
						continue;
					}
					if (type == s.mouseList[i].type && (!listener || s.mouseList[i].listener == listener)) {
						return true;
					}
				}
			} else {
				return s.callParent("hasEventListener", arguments);
			}
			return false;
		}
	};
	for (var k in p) {
		LInteractiveObject.prototype[k] = p[k];
	}
	return LInteractiveObject;
})(); 
/** @language chinese
 * 当用户在 LInteractiveObject 实例上按下指针设备按钮时调度。
 * <p><a href="LMouseEvent.html#property_MOUSE_DOWN">LMouseEvent.MOUSE_DOWN</a></p>
 * @event LMouseEvent.MOUSE_DOWN
 */
/** @language chinese
 * 当用户在 LInteractiveObject 实例上释放指针设备按钮时调度。
 * <p><a href="LMouseEvent.html#property_MOUSE_UP">LMouseEvent.MOUSE_UP</a></p>
 * @event LMouseEvent.MOUSE_UP
 */
/** @language chinese
 * 用户移动 LInteractiveObject 上的指针设备时调度。
 * <p><a href="LMouseEvent.html#property_MOUSE_MOVE">LMouseEvent.MOUSE_MOVE</a></p>
 * @event LMouseEvent.MOUSE_MOVE
 */
/** @language chinese
 * 用户将指针设备从 LInteractiveObject 实例上移开时调度。
 * <p><a href="LMouseEvent.html#property_MOUSE_OUT">LMouseEvent.MOUSE_OUT</a></p>
 * @event LMouseEvent.MOUSE_OUT
 */
/** @language chinese
 * 用户将指针设备移动到 LInteractiveObject 实例上时调度。
 * <p><a href="LMouseEvent.html#property_MOUSE_OVER">LMouseEvent.MOUSE_OVER</a></p>
 * @event LMouseEvent.MOUSE_OVER
 */
/** @language chinese
 * 当用户在LInteractiveObject 实例上快速连续按下两次并释放指针设备的主按钮时调度。
 * <p><a href="LMouseEvent.html#property_DOUBLE_CLICK">LMouseEvent.DOUBLE_CLICK</a></p>
 * @event LMouseEvent.DOUBLE_CLICK
 */