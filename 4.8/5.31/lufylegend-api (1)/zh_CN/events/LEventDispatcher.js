/** @language chinese
 * <p>LEventDispatcher 类是可调度事件的所有类的基类。</p>
 * @class LEventDispatcher
 * @extends LObject
 * @constructor
 * @since 1.8.0
 * @public
 */
var LEventDispatcher = (function () {
	function LEventDispatcher () {
		var s = this;
		LExtends(s, LObject, []);
		s._eventList = new Array();
	}
	var p = {
		/** @language chinese
		 * <p>使用 LEventDispatcher 对象注册事件侦听器对象，以使侦听器能够接收事件通知。可以为特定类型的事件、阶段和优先级在显示列表中的所有节点上注册事件侦听器。</p>
		 * <p>成功注册一个事件侦听器后，无法通过额外调用 addEventListener() 来更改其优先级。要更改侦听器的优先级，必须首先调用 removeListener()。然后，可以使用新的优先级再次注册该侦听器。</p>
		 * <p>如果不再需要某个事件侦听器，可调用 removeEventListener() 删除它，否则会产生内存问题。</p>
		 * @method addEventListener
		 * @param {String} type 事件的类型。
		 * @param {Function} listener 处理事件的侦听器函数。
		 * @public
		 * @since 1.8.0
		 */
		addEventListener : function (type, listener) {
			this._eventList.push({listener : listener, type : type});
		},
		/** @language chinese
		 * <p>从 LEventDispatcher 对象中删除侦听器。如果没有向 LEventDispatcher 对象注册任何匹配的侦听器，则对此方法的调用没有任何效果。</p>
		 * @method removeEventListener
		 * @param {String} type 事件的类型。
		 * @param {Function} listener 要删除的侦听器对象。
		 * @public
		 * @since 1.8.0
		 */
		removeEventListener : function (type, listener) {
			var s = this, i, length;
			length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type && (!listener || s._eventList[i].listener == listener)) {
					s._eventList.splice(i, 1);
					return;
				}
			}
		},
		/** @language chinese
		 * <p>从 LEventDispatcher 对象中删除所有侦听器。</p>
		 * @method removeAllEventListener
		 * @public
		 * @since 1.8.0
		 */
		removeAllEventListener : function () {
			this._eventList = [];
		},
		/** @language chinese
		 * <p>将事件调度到事件流中。事件目标是对其调用 dispatchEvent() 方法的 LEventDispatcher 对象。</p>
		 * @method dispatchEvent
		 * @param {LEvent | String} event 调度到事件流中的 Event 对象。如果正在重新调度事件，则会自动创建此事件的一个克隆。在调度了事件后，其 target 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
		 * @return {Boolean} 如果成功调度了事件，则值为 true。
		 * @example
		 * 	function MyEventObject(){
		 * 		var self = this;
		 * 		LExtends(self,LSprite,[]);
		 * 		self.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		self.graphics.drawRect(1,"#FF0000",[100,0,100,100],true,"#FF0000");
		 * 		self.addEventListener(LMouseEvent.MOUSE_UP,self.onclick);
		 * 		self.addEventListener(MyEventObject.CLICK_LEFT,function(event){
		 * 			trace("dispatchEvent");
		 * 		});
		 * 		self.addEventListener(MyEventObject.CLICK_RIGHT,function(event){
		 * 			trace("dispatchEvent event.name = " + event.name);
		 * 		});
		 * 	}
		 * 	MyEventObject.CLICK_LEFT = "click_left";
		 * 	MyEventObject.CLICK_RIGHT = "click_right";
		 * 	MyEventObject.prototype.onclick = function(event){
		 * 		var self = event.clickTarget;
		 * 		if(event.selfX < 100){
		 * 			self.dispatchEvent(MyEventObject.CLICK_LEFT);
		 * 		}else{
		 * 			var event = new LEvent(MyEventObject.CLICK_RIGHT);
		 * 			event.name = "LEvent Test";
		 * 			self.dispatchEvent(event);
		 * 		}
		 * 	}
		 * @examplelink <p><a href="../../../api/LEventDispatcher/dispatchEvent.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.8.0
		 */
		dispatchEvent : function (event) {
			var s = this, i, length = s._eventList.length, ctype = (typeof event == "string") ? event : event.eventType;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (ctype == s._eventList[i].type) {
					if (typeof event == "string") {
						s.currentTarget = s.target = s;
						s.eventType = s.event_type = ctype;
						s._eventList[i].listener(s);
						delete s.currentTarget;
						delete s.target;
						delete s.eventType;
					}else{
						if (!event.target) {
							event.target = s;
						}
						if (!event.currentTarget) {
							event.currentTarget = event.target;
						}
						event._ll_preventDefault = false;
						s._eventList[i].listener(event);
						if (event._ll_preventDefault) {
							return false;
						}
					}
					return true;
				}
			}
			return false;
		},
		/** @language chinese
		 * <p>检查 LEventDispatcher 对象是否为特定事件类型注册了任何侦听器。这样，您就可以确定 LEventDispatcher 对象在事件流层次结构中的哪个位置改变了对事件类型的处理。</p>
		 * @method hasEventListener
		 * @param {String} type 事件的类型。
		 * @return {Boolean} 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
		 * @public
		 * @since 1.8.0
		 */
		hasEventListener : function (type, listener) {
			var s = this, i, length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type) {
					if (typeof listener == UNDEFINED || listener == s._eventList[i].listener) {
						return true;
					}
				}
			}
			return false;
		}
	};
	for (var k in p) {
		LEventDispatcher.prototype[k] = p[k];
	}
	return LEventDispatcher;
})();