/** @language chinese
 * 创建一个新的 LAnimationTimeline 实例。
 * LAnimationTimeline类在LAnimation 类的基础上提供了很多扩展。LAnimation 类需要调用本身的onframe函数才能播放动画，而LAnimationTimeline类则不需要。
 * @class LAnimationTimeline
 * @extends LAnimation
 * @constructor
 * @param {LBitmapData | Array} data 一个LBitmapData对象，既包含一组或多组frame的精灵图表。或者是一个LBitmapData对象的数组。
 * @param {Array} list <p>每个frame的属性值。</p>
 * <p>每个数组元素格式为{x : 0, y : 0, width : 100, height : 100, sx : 0, sy : 0, dataIndex : 0}。 x, y, width, height分别对应LBitmapData对象的属性值，sx, sy是图像显示时的起始点坐标，当data是一个LBitmapData对象的数组的时候，dataIndex表示该数组的索引，用来指定使用哪个LBitmapData对象。</p>
 * <p>＊如果需要直接给对象设定label，可以给元素设定label属性，设定label属性时候，可以同时设定isMirror属性。</p>
 * <p>＊也可以给元素设定mirror（true或者false）属性，设定mirror属性的时候需要同时给所有元素设定mirror属性，如果元素和label同时设定了mirror属性，则优先使用元素中设定的mirror属性。</p>
 * <p>如果精灵图表中的每个frame大小都是的，你可以使用LGlobal.divideCoordinate函数来直接对图表进行分割。</p>
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	var imgData = [
 * 		{name : "player-0", path : "./player-0.png"}, 
 * 		{name : "player-1", path : "./player-1.png"}, 
 * 		{name : "player-2", path : "./player-2.png"}, 
 * 		{name : "player-3", path : "./player-3.png"}, 
 * 		{name : "player-4", path : "./player-4.png"}
 * 	];
 * 	function main () {
 * 		LLoadManage.load(imgData, null, gameInit);
 * 	}
 * 	function gameInit(result) {
 * 		var list = LGlobal.divideCoordinate(480, 210, 1, 4);
 * 		var data = new LBitmapData(result["player-0"], 0, 0, 120, 210);
 * 		var playerLeft = new LAnimationTimeline(data, list);
 * 		addChild(playerLeft);
 * 		
 * 		var datas = [];
 * 		var listChild = [];
 * 		for (var i = 0; i < 4; i++) {
 * 			datas.push(new LBitmapData(result["player-" + (i + 1)]));
 * 			listChild.push({dataIndex : i, x : 0, y : 0, width : 120, height : 210, sx : 0, sy : 0});
 * 		}
 * 		var playerRight = new LAnimationTimeline(datas, [listChild]);
 * 		playerRight.x = 200;
 * 		addChild(playerRight);
 * 	}
 * @examplelink <p><a href="../../../api/LAnimationTimeline/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.0
 * @public
 */
var LAnimationTimeline = (function() {
	function LAnimationTimeline(data, list) {
		var s = this;
		LExtends(s, LAnimation, [null, data, list]);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LAnimationTimeline
		 * @since 1.8.0
		 * @public
		 */
		s.type = "LAnimationTimeline";
		/** @language chinese
		 * 动画播放速度
		 * @property speed
		 * @type int
		 * @default 0
		 * @since 1.8.0
		 * @example
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(data,list);
		 * 		player.speed = 10;
		 * 		backLayer.addChild(player);
		 * 		var player2 = new LAnimationTimeline(data.clone(),list);
		 * 		player2.speed = 5;
		 * 		player2.x = 150;
		 * 		backLayer.addChild(player2);
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/speed.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		s.speed = 0;
		s._speedIndex = 0;
		s.ll_labelList = {};
		for (var i = 0, sublist, j, child; i < list.length; i++) {
			sublist = list[i];
			for ( j = 0; j < sublist.length; j++) {
				child = sublist[j];
				if (child.label) {
					s.setLabel(child.label, i, j, 1, child.isMirror ? true : false);
				}
			}
		}
		s.addEventListener(LEvent.ENTER_FRAME, s._ll_onframe);
	};
	var p = {
		/** @language chinese
		 * 返回一个LAnimationTimeline的克隆对象。
		 * @method clone
		 * @return {LAnimationTimeline} 一个新的 LAnimationTimeline 对象，它与原始对象相同.
		 * @since 1.8.8
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	var player;
		 * 	var player2;
		 * 	function main(){
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
		 * 		player2 = player.clone();
		 * 		player2.setAction(2,0);
		 * 		player2.x = 150;
		 * 		backLayer.addChild(player2);
		 * 		backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
		 * 	}
		 * 	function onframe(event){
		 * 		player.onframe();
		 * 		player2.onframe();
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/clone.html" target="_blank">测试链接</a></p>
		 */
		clone : function() {
			var s = this, k, o, a = new s.constructor(s.bitmapList, s.imageArray.slice(0));
			a.copyProperty(s);
			a.childList.length = 0;
			a.bitmap = s.bitmap.clone();
			a.addChild(a.bitmap);
			for (k in s.ll_labelList) {
				o = s.ll_labelList[k];
				a.ll_labelList[k] = {
					rowIndex : o.rowIndex,
					colIndex : o.colIndex,
					mode : o.mode,
					isMirror : o.isMirror
				};
			}
			return a;
		},
		setFrameSpeedAt : function(rowIndex, colIndex, speed) {
			var s = this;
			if (!s._ll_stepArray[rowIndex]) {
				s._ll_stepArray[rowIndex] = [];
			}
			s._ll_stepArray[rowIndex][colIndex] = speed;
		},
		_ll_onframe : function(event) {
			var self = event.target;
			if (self._ll_stop) {
				return;
			}
			if (self._speedIndex++ < self.speed) {
				return;
			}
			if(self._send_complete){
				self.dispatchEvent(LEvent.COMPLETE);
				self._send_complete = false;
				if (self._ll_stop) {
					return;
				}
			}
			self._speedIndex = 0;
			self.onframe();
		},
		/** @language chinese
		 * 在LAnimationTimeline实例的时间轴中设置标签。
		 * @method setLabel
		 * @param {String} name 标签名称.
		 * @param {int} rowIndex 行号.
		 * @param {int} colIndex 列号.
		 * @param {int} mode (1,0,-1)分别代表(正序播放,静止,倒序播放)。
		 * @param {Boolean} isMirror 是否使用镜像来水平翻转显示对象。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndPlay("right");
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/setLabel.html" target="_blank">测试链接</a></p>
		 */
		setLabel : function(name, _rowIndex, _colIndex, _mode, _isMirror) {
			this.ll_labelList[name] = {
				rowIndex : _rowIndex,
				colIndex : _colIndex,
				mode : (typeof _mode == UNDEFINED ? 1 : _mode),
				isMirror : (typeof _isMirror == UNDEFINED ? false : _isMirror)
			};
		},
		/** @language chinese
		 * 开始播放 LAnimationTimeline 动画。
		 * @method play
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndPlay("right");
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/play_stop.html" target="_blank">测试链接</a></p>
		 */
		play : function() {
			this._ll_stop = false;
		},
		/** @language chinese
		 * 停止播放 LAnimationTimeline 动画。
		 * @method stop
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndPlay("right");
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/play_stop.html" target="_blank">测试链接</a></p>
		 */
		stop : function() {
			this._ll_stop = true;
		},
		/** @language chinese
		 * 从指定标签开始播放 LAnimationTimeline 动画。
		 * @method gotoAndPlay
		 * @param {String} label 表示播放头转到的帧标签的字符串。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndPlay("right");
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/gotoAndPlay.html" target="_blank">测试链接</a></p>
		 */
		gotoAndPlay : function(name) {
			var s = this, l = s.ll_labelList[name];
			s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
			s.play();
			s.onframe();
		},
		/** @language chinese
		 * 将播放头移到影片剪辑的指定标签并停在那里。
		 * @method gotoAndStop
		 * @param {String} label 表示播放头转到的帧标签的字符串。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndStop("right");
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/gotoAndStop.html" target="_blank">测试链接</a></p>
		 */
		gotoAndStop : function(name) {
			var s = this, l = s.ll_labelList[name];
			s.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
			s.stop();
			s.onframe();
		},
		/** @language chinese
		 * 向指定标签位置添加执行脚本。
		 * @method addFrameScript
		 * @param {String} label 指定标签。
		 * @param {Function} func 动画到达指定标签位置时要执行的函数。
		 * @param {Array} params 执行函数时的参数。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		player.addFrameScript("right",scriptTest,["testParams1","testParams2"]);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndPlay("right");
		 * 	}
		 * 	function scriptTest(param1,param2){
		 * 		trace("scriptTest Run : " + param1 + "," + param2);
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/addFrameScript.html" target="_blank">测试链接</a></p>
		 */
		addFrameScript : function(name, func, params) {
			var l = this.ll_labelList[name];
			var arr = this.imageArray[l.rowIndex][l.colIndex];
			if (!arr.script) {
				arr.script = [];
			}
			arr.script.push({func : func, params : params, name : name});
		},
		/** @language chinese
		 * 删除指定标签位置的执行脚本。
		 * @method removeFrameScript
		 * @param {String} label 指定标签。
		 * @since 1.8.0
		 * @public
		 * @example
		 * 	LInit(200,"legend",800,450,main);
		 * 	function loadBitmapdata(event){
		 * 		var backLayer = new LSprite();
		 * 		addChild(backLayer);
		 * 		var list = LGlobal.divideCoordinate(480,630,3,4);
		 * 		var data = new LBitmapData(event.target,0,0,120,210);
		 * 		var player = new LAnimationTimeline(backLayer,data,list);
		 * 		player.setLabel("right",2,0,1,true);
		 * 		player.addFrameScript("right",scriptTest,["testParams1","testParams2"]);
		 * 		backLayer.addChild(player);
		 * 		player.gotoAndPlay("right");
		 * 	}
		 * 	function scriptTest(param1,param2){
		 * 		trace("scriptTest Run : " + param1 + "," + param2);
		 * 	}
		 * @examplelink <p><a href="../../../api/LAnimationTimeline/removeFrameScript.html" target="_blank">测试链接</a></p>
		 */
		removeFrameScript : function(name) {
			var l = this.ll_labelList[name], obj, script, i;
			script = this.imageArray[l.rowIndex][l.colIndex].script;
			if (!script) {
				return;
			}
			for(i = 0; i < script.length; i++){
				obj = script[i];
				if(obj.name == name){
					script.splice(i, 1);
					break;
				}
			}
		}
	};
	for (var k in p) {
		LAnimationTimeline.prototype[k] = p[k];
	}
	return LAnimationTimeline;
})(); 