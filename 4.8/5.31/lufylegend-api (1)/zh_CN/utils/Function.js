/** @language chinese
 * @class 全局函数
 * @since 1.0.0
 * @public
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (elt) {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++){
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}
if (!Array.isArray){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) == '[object Array]';
	};
}
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function () {},
			fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}
if (!Array.prototype.find) {
	Array.prototype.find = function (predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;
		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if ( typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;
		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ( typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if ( k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.prototype.every) {
	Array.prototype.every = function(callbackfn, thisArg) {
		'use strict';
		var T, k;
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ( typeof callbackfn !== 'function') {
			throw new TypeError();
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if ( k in O) {
				kValue = O[k];
				var testResult = callbackfn.call(T, kValue, k, O);
				if (!testResult) {
					return false;
				}
			}
			k++;
		}
		return true;
	};
}
if (!Array.prototype.some) {
	Array.prototype.some = function(fun) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}
		if ( typeof fun !== 'function') {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		var thisArg = arguments.length >= 2 ? arguments[1] :
		void 0;
		for (var i = 0; i < len; i++) {
			if ( i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}
		return false;
	};
}
if (!String.format) {
	String.format = function(format) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return format.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number] 
	        : match
	      ;
	    });
	};
}
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
	Object.defineProperty(Function.prototype, 'name', {
		get:function() {
			var funcNameRegex = /function\s([^(]{1,})\(/;
			var results = (funcNameRegex).exec((this).toString());
			return (results && results.length > 1) ? results[1].trim() : "";
		},
		set:function(value) {}
	});
}
/** @language chinese
 * 您可以在测试环境下捕获来自 trace() 函数的输出并显示结果。如果 trace 语句中的任何参数包含 String 之外的数据类型，则 trace 函数将调用与该数据类型关联的 toString() 方法。例如，如果该参数是一个布尔值，则跟踪函数将调用 Boolean.toString() 并显示返回值。
 * @method trace
 * @param {Object} expression 要计算的表达式。expression 参数的值显示在"输出"面板中。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @examplelink <p><a href="../../../api/GlobalFunctions/trace.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
*/
function trace() {
	if (!LGlobal.traceDebug) return;
	var t = document.getElementById("traceObject"), i;
	if (trace.arguments.length > 0 && t == null) {
		var d = document.createElement("DIV");
		d.position=0;
		d.style.position = "absolute";
		document.body.appendChild(d);
		t = document.createElement("TEXTAREA");
		t.id = "traceObject";
		t.style.width = (window.innerWidth*0.5) + "px";
		t.style.height = "200px";
		var b = document.createElement("BUTTON");
		b.style.width = (window.innerWidth*0.25) + "px";
		b.innerHTML="Hide";
		d.appendChild(b);
		LEvent.addEventListener(b,LGlobal.mobile ? "touchstart":"click", function(e){
			t.style.display = (t.style.display == "none" ? "":"none");
		});
		b = document.createElement("BUTTON");
		b.style.width = (window.innerWidth*0.25) + "px";
		b.innerHTML="position";
		d.appendChild(b);
		var f = function(e){
			d.position++;
			if(d.position == 0){
				d.style.top = "5px";
				d.style.left = "5px";
			}else if(d.position == 1){
				d.style.top = (window.innerHeight - 20 - parseInt(t.style.height)) + "px";
				d.style.left = "5px";
			}else if(d.position == 2){
				d.style.top = "5px";
				d.style.left = (window.innerWidth - parseInt(t.style.width)) + "px";
			}else{
				d.style.top = (window.innerHeight - 20 - parseInt(t.style.height)) + "px";
				d.style.left = (window.innerWidth - parseInt(t.style.width)) + "px";
				d.position = -1;
			}
		};
		f();
		LEvent.addEventListener(b,LGlobal.mobile ? "touchstart":"click", f);
		d.appendChild(document.createElement("BR"));
		d.appendChild(t);
	}
	for (i = 0; i < trace.arguments.length; i++) {
		t.value = t.value + trace.arguments[i] + "\r\n";
		t.scrollTop = t.scrollHeight;
	}
}
if (!window.console) {
	window.console = {
		log : trace,
		warn : trace
	};
}
/** @language chinese
 * 将一个 DisplayObject 子实例添加到Stage。
 * @method addChild
 * @param {LDisplayObject} child 要添加的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
function addChild (o) {
	LGlobal.stage.addChild(o);
}
/** @language chinese
 * 从 Stage 实例的子列表中删除指定的 child DisplayObject 实例。
 * @method removeChild
 * @param {LDisplayObject} child 要删除的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
function removeChild (o) {
	LGlobal.stage.removeChild(o);
}
/** @language chinese
 * 引擎初始化函数。等同于 init。
 * @method LInit
 * @param {float} speed <p>游戏速度,每次页面刷新间隔（单位毫秒）, FPS = 1000 / speed。</p> <p style="color:#FF0000;">*也可以直接将此参数设定为requestAnimationFrame，引擎会切换到requestAnimationFrame来循环刷新。</p>
 * @param {String} divid 传入一个div的id，库件进行初始化的时候，会自动将canvas加入到此div内部。
 * @param {int} width 游戏界面宽。
 * @param {int} height 游戏界面高。
 * @param {Function} callback 游戏初始化后，调用此函数。
 * @param {String} type <p style="color:#FF0000;">*该参数在1.10.1之后已被删除，改为引擎内部自动判定。</p>当为null时，会先进行页面的onload操作，如果你的init函数调用是在onload之后，那么需要将此参数设为LEvent.INIT。
 * @example
 * 	<!DOCTYPE html>
 * 	<html>
 * 	<head>
 * 	<meta charset="UTF-8">
 * 	<title>demo</title>
 * 	</head>
 * 	<body>
 * 	<div id="mylegend">loading……</div>
 * 	<script type="text/javascript" src="../lufylegend-x.x.x.min.js"></script> 
 * 	<script>
 * 	LInit(50,"mylegend",800,480,main);
 * 	//window.onload = function(){LInit(50, "mylegend", 800, 480, main, LEvent.INIT);};
 * 	function main(){
 * 		alert("Hello lufylegend!");
 * 	}
 * 	</script>
 * 	</body>
 * 	</html>
 * @examplelink <p><a href="../../../api/GlobalFunctions/LInit.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
function init (s, c, w, h, f, t) {
	LGlobal.speed = s;
	var _f = function () {
		if (LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight) {
			LGlobal.horizontalError();
		} else if (LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight) {
			LGlobal.verticalError();
		} else {
			setTimeout(f, 100);
		}
		LGlobal.startTimer = (new Date()).getTime();
	};
	var loop;
	if(typeof s == "function"){
		LGlobal.setCanvas(c, w, h);
		_f();
		loop = function(){
			s(loop);
			LGlobal.onShow();
		};
		LGlobal.speed = 1000 / 60;
	}else{
		loop = function(){
			LGlobal.frameRate = setInterval(function () {
				LGlobal.onShow();
			}, s);
			LGlobal.setCanvas(c, w, h);
			_f();
		};
	}
	if (document.readyState === "complete") {
		loop();
	}else{
		LEvent.addEventListener(window, "load", function () {
			loop();
		});
	}
}
var LInit = init;
/** @language chinese
 * 等同于 LExtends
 * @method base
 * @since 1.0.0
 * @public
 */
function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	if (typeof d.__ll__parent__ == UNDEFINED) {
		d.__ll__parent__ = [];
		d.__ll__parent__ = [];
	}
	d.__ll__parent__.push(b.prototype);
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
	}
	if (o.toString == Object.prototype.toString) {
		o.toString = LObject.prototype.toString;
	}
	b.apply(d, a);
}
/** @language chinese
 * 对象继承。等同于 base。
 * @method LExtends
 * @param {Object} child 子对象本身。
 * @param {Object} parent 父对象。
 * @param {Array} params 参数。
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function FatherClass(){
 * 		this.name = "Father";
 * 	}
 * 	FatherClass.prototype.getName = function(){
 * 		return this.name;
 * 	};
 * 	function ChildClass(){
 * 		LExtends(this,FatherClass,[]);
 * 		this.name = "Child";
 * 	}
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var father = new FatherClass();
 * 		var child = new ChildClass();
 * 		trace("father.getName() = " + father.getName()); //father.getName() = Father
 * 		trace("child.getName() = " + child.getName());//child.getName() = Child
 * 	}
 * @examplelink <p><a href="../../../api/GlobalFunctions/LExtends.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
var LExtends = base;
/** @language chinese
 * 返回自引擎初始化开始播放时起已经过的毫秒数。
 * @method getTimer
 * @return {float} 自引擎初始化开始播放时起已经过的毫秒数。
 * @since 1.0.0
 * @public
 */
function getTimer () {
	return (new Date()).getTime() - LGlobal.startTimer;
}
function getExtension (path) {
	var r, pattern = /([^#?]+\.)([^.#?]+)/;
	r = path.match(pattern);
	if (r.length >= 3) {
		return r[2].toLowerCase();
	}
	return null;
}