/** @language chinese
 * <p>LDisplayObjectContainer 类是可用作显示列表中显示对象容器的所有对象的基类。该显示列表管理 运行时中显示的所有对象。使用 LDisplayObjectContainer 类排列显示列表中的显示对象。每个 LDisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，可确定哪个对象绘制在前，哪个对象绘制在后等。</p>
 * <p>LDisplayObjectContainer 是一种抽象基类；因此，不能直接调用 LDisplayObjectContainer。</p>
 * <p>LDisplayObjectContainer 类是可以包含子对象的所有对象的抽象基类。无法直接对其进行实例化。</p>
 * @class LDisplayObjectContainer
 * @extends LInteractiveObject
 * @constructor
 * @since 1.9.0
 * @public
 */
var LDisplayObjectContainer = (function () {
	function LDisplayObjectContainer () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		/** @language chinese
		 * 子对象列表
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		s.childList = new Array();
		/** @language chinese
		 * 返回此对象的子项数目。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/numChildren.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.numChildren = 0;
		/** @language chinese
		 * 确定对象的子级是否支持鼠标输入设备。
		 * @property mouseChildren
		 * @type Boolean
		 * @since 1.9.0
		 * @example
		 * 	LGlobal.setDebug(true);
		 * 	var container1 = new LSprite();
		 * 	container1.x = container1.y = 20;
		 * 	var container2 = new LSprite();
		 * 	container2.x = 20;
		 * 	container2.y = 100;
		 * 	container2.mouseChildren = false;
		 * 	addChild(container1);
		 * 	addChild(container2);
		 * 	var button01 = new LButtonSample1("mouseChildren=true");
		 * 	container1.addChild(button01);
		 * 	button01.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button01 click");
		 * 	});
		 * 	var button02 = new LButtonSample1("mouseChildren=false");
		 * 	container2.addChild(button02);
		 * 	button02.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){
		 * 		trace("button02 click");
		 * 	});
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/mouseChildren.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.mouseChildren = true;
	}
	var p = {
		/** @language chinese
		 * <p>将一个 DisplayObject 子实例添加到该 LDisplayObjectContainer 实例中。子项将被添加到该 LDisplayObjectContainer 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）</p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChild
		 * @param {LDisplayObject} child 要作为该 LDisplayObjectContainer 实例的子项添加的 LDisplayObject 实例。
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChild.html" target="_blank">测试链接</a></p>
		 */
		addChild : function (d) {
			var s  = this,t;
			if (d.parent) {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.parent.removeChild(d);
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.push(d);
			s.numChildren = s.childList.length;
			s._ll_removeFromSelf = false;
			return d;
		},
		/** @language chinese
		 * <p>将一个 LDisplayObject 子实例添加到该 LDisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 LDisplayObjectContainer 对象的显示列表的后（底）部。</p>
		 * <p>例如，下例在索引位置 0、2、1 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/LDisplayObjectContainer_layers.jpg" /></p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChildAt
		 * @param {LDisplayObject} child 要作为该 LDisplayObjectContainer 实例的子项添加的 LDisplayObject 实例。
		 * @param {int} index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChildAt.html" target="_blank">测试链接</a></p>
		 */
		addChildAt : function (d, i) {
			var s = this,t;
			if (i < 0 || i > s.childList.length) {
				return;
			}
			if (typeof d.remove == "function") {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.remove();
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.splice(i, 0, d);
			s.numChildren = s.childList.length;
			s._ll_removeFromSelf = false;
			return d;
		},
		/** @language chinese
		 * <p>从 LDisplayObjectContainer 实例的子列表中删除指定的 child LDisplayObject 实例。将已删除子项的 parent 属性设置为 null；如果不存在对该子项的任何其它引用，则将该对象作为垃圾回收。LDisplayObjectContainer 中该子项之上的任何显示对象的索引位置都减去 1。</p>
		 * @method removeChild
		 * @param {LDisplayObject} child 要删除的 LDisplayObject 实例。
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChild.html" target="_blank">测试链接</a></p>
		 */
		removeChild : function (d) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					if (LGlobal.destroy && d.die) {
						d.die();
					}
					s.childList.splice(i, 1);
					break;
				}
			}
			s.numChildren = s.childList.length;
			delete d.parent;
		},
		/** @language chinese
		 * 返回位于指定索引处的子显示对象实例。
		 * @method getChildAt
		 * @param {int} index 子对象的索引位置。
		 * @return {LDisplayObject} 位于指定索引位置处的子显示对象。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildAt.html" target="_blank">测试链接</a></p>
		 */
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		/** @language chinese
		 * <p>返回具有指定名称的子显示对象。如果多个子显示对象具有指定名称，则该方法会返回子级列表中的第一个对象。</p>
		 * <p>getChildAt() 方法比 getChildByName() 方法快。getChildAt() 方法从缓存数组中访问子项，而 getChildByName() 方法则必须遍历链接的列表来访问子项。</p>
		 * @method getChildByName
		 * @param {String} name 要返回的子项的名称。
		 * @return {LDisplayObject} 具有指定名称的子显示对象。
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	var target = container.getChildByName("sprite1");
		 * 	trace(container.getChildIndex(target)); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildByName.html" target="_blank">测试链接</a></p>
		 */
		getChildByName : function (n) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (!c[i]) {
					continue;
				}
				if (c[i].name == n) {
					return c[i];
				}
			}
			return null;
		},
		/** @language chinese
		 * 从 LDisplayObjectContainer 的子列表中指定的 index 位置删除子 LDisplayObject。将已删除子项的 parent 属性设置为 null；如果没有对该子项的任何其他引用，则将该对象作为垃圾回收。LDisplayObjectContainer 中该子项之上的任何显示对象的索引位置都减去 1。
		 * @method removeChildAt
		 * @param {int} index 要删除的 DisplayObject 的子索引。
		 * @return {LDisplayObject} 已删除的 DisplayObject 实例。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChildAt.html" target="_blank">测试链接</a></p>
		 */
		removeChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length <= i) {
				return;
			}
			if (LGlobal.destroy && c[i].die) {
				c[i].die();
			}
			var d = s.childList.splice(i, 1);
			d = d[0];
			delete d.parent;
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * 返回 LDisplayObject 的 child 实例的索引位置。
		 * @method getChildIndex
		 * @param {LDisplayObject} child 要标识的 LDisplayObject 实例。
		 * @return {int} 要标识的子显示对象的索引位置。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildIndex.html" target="_blank">测试链接</a></p>
		 */
		getChildIndex : function (child) {
			if (!child) {
				return -1;
			}
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		/** @language chinese
		 * <p>更改现有子项在显示对象容器中的位置。这会影响子对象的分层。例如，下例在索引位置 0、1、2 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>在使用 setChildIndex() 方法并指定一个已经占用的索引位置时，唯一发生更改的位置是显示对象先前的位置和新位置之间的位置。所有其他位置将保持不变。如果将一个子项移动到比它当前的索引更低的索引处，则这两个索引之间的所有子项的索引引用都将增加 1。如果将一个子项移动到比它当前的索引更高的索引处，则这两个索引之间的所有子项的索引引用都将减小 1。例如，如果上例中的显示对象容器名为 container，则可以通过调用以下代码来交换带有 a 和 b 标记的显示对象的位置：</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>该代码产生以下对象排列：</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child 要为其更改索引编号的 LDisplayObject 子实例。
		 * @param {int} index 生成的 child 显示对象的索引编号。
		 * @return {int} 生成的 child 显示对象的索引编号。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/setChildIndex.html" target="_blank">测试链接</a></p>
		 */
		setChildIndex : function (child, index) {
			var s = this, c = s.childList, i, l = c.length;
			if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
				return -1;
			}
			for (i = 0; i < l; i++) {
				if(c[i].objectIndex == child.objectIndex){
					break;
				}
			}
			s.childList.splice(i,1);
			s.childList.splice(index, 0, child);
			return index;
		},
		resize : function () {
			var s  = this;
			s.width = s.getWidth();
			s.height = s.getHeight();
		},
		/** @language chinese
		 * <p>从 LDisplayObjectContainer 实例的子列表中删除所有的 child LDisplayObject 实例。</p>
		 * @method removeAllChild
		 */
		removeAllChild : function () {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (LGlobal.destroy && c[i].die) {
					c[i].die();
				}
			}
			s.childList.length = 0;
			s.width = 0;
			s.height = 0;
			s.numChildren = 0;
		}
	};
	for (var k in p) {
		LDisplayObjectContainer.prototype[k] = p[k];
	}
	return LDisplayObjectContainer;
})();
/** @language chinese
 * <p>将显示对象添加到显示列表中时调度。以下方法会触发此事件：LDisplayObjectContainer.addChild()、LDisplayObjectContainer.addChildAt()。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * <p><a href="LEvent.html#property_ADDED">LEvent.ADDED</a></p>
 * @event LEvent.ADDED
 */
/** @language chinese
 * <p>在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。以下方法会触发此事件：LDisplayObjectContainer.addChild()、LDisplayObjectContainer.addChildAt()。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * <p><a href="LEvent.html#property_ADDED_TO_STAGE">LEvent.ADDED_TO_STAGE</a></p>
 * @event LEvent.ADDED_TO_STAGE
 */
/** @language chinese
 * <p>将要从显示列表中删除显示对象时调度。LDisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * <p><a href="LEvent.html#property_REMOVED">LEvent.REMOVED</a></p>
 * @event LEvent.REMOVED
 */
/** @language chinese
 * <p>在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。LDisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。</p>
 * <p>使用时需要引入lufylegend.LEvent.added-x.x.x.min.js文件。</p>
 * <p><a href="LEvent.html#property_REMOVED_FROM_STAGE">LEvent.REMOVED_FROM_STAGE</a></p>
 * @event LEvent.REMOVED_FROM_STAGE
 */