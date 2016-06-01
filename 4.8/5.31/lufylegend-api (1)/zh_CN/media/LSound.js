/** @language chinese
 * <p>此类创建和播放音频的 LSound 对象。</p>
 * <p>当浏览器不支持Web Audio Api或者设置LGlobal.webAudio = false的时候，LSound会自动继承LMedia对象。</p>
 * <p>当LSound继承LMedia的时候，IOS浏览器下加载音频需要在点击事件中进行，并且同一时间只能播放一个音频文件。</p>
 * @class LSound(LMedia)
 * @extends LMedia
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function loadOver (e) {
 * 		sound.play();
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LMedia.html" target="_blank">测试链接</a></p>
 * @since 1.7.0
 * @public
 */
/** @language chinese
 * <p>当前浏览器是否支持Web Audio。</p>
 * @property LSound.webAudioEnabled
 * @type Boolean
 * @static
 * @since 1.9.0
 * @public
 */
/*LSound.webAudioEnabled = false;*/
/** @language chinese
 * <p>此类创建和播放音频的 LSound 对象。</p>
 * <p>当浏览器支持Web Audio Api并且设置LGlobal.webAudio = true(默认值是true)的时候，LSound会自动继承LWebAudio对象。</p>
 * <p>当LSound继承LWebAudio的时候，IOS浏览器下可以预先加载音频文件，但是播放音频必须在点击事件中进行。</p>
 * <p>当LSound继承LWebAudio的时候，IOS浏览器下可以同时播放多个音频文件，但是有上线，IOS浏览器的播放上限大约为4个。</p>
 * @class LSound(LWebAudio)
 * @extends LWebAudio
 * @constructor
 * @example
 * 	var backLayer;
 * 	var sound;
 * 	function main () {
 * 		backLayer = new LSprite();
 * 		addChild(backLayer);
 * 		sound = new LSound();
 * 		......
 * 		var url = "./sample.";
 * 		sound.load(url+"mp3,"+url+"ogg,"+url+"wav");
 * 		sound.addEventListener(LEvent.COMPLETE,loadOver);
 * 	}
 * 	function onup (e) {
 * 		......
 * 		sound.play();
 * 	}
 * 	function loadOver (e) {
 * 		backLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
 * 	}
 * @examplelink <p><a href="../../../api/LSound/LWebAudio.html" target="_blank">测试链接</a></p>
 * @since 1.9.0
 * @public
 */
var LSound = (function () {
	function LSound (u) {
		var s = this;
		s.type = "LSound";
		s._type = "audio";
		if (LSound.webAudioEnabled && LGlobal.webAudio) {
			LExtends(s, LWebAudio, []);
		} else {
			LExtends(s, LMedia, []);
			try {
				s.data = new Audio();
			} catch (e) {
				console.warn( "ReferenceError: Can't find variable: Audio");
				s.data = {};
			}
			s.data.loop = false;
			s.data.autoplay = false;
		}
		if (u) {
			s.load(u);
		}
	}
	LSound.TYPE_SOUND = "sound";
	/** @language chinese
	 * <p>当前浏览器是否支持Web Audio。</p>
	 * @property LSound.webAudioEnabled
	 * @type Boolean
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	LSound.webAudioEnabled = false;
	var protocol = location.protocol;
	if (protocol == "http:" || protocol == "https:") {
		if (typeof AudioContext !== UNDEFINED) {
			try {
				LWebAudio._context = new AudioContext();
			} catch (e) {
			}
		} else if (typeof webkitAudioContext !== UNDEFINED) {
			try {
				LWebAudio._context = new webkitAudioContext();
			} catch (e) {
			}
		}
		if (LWebAudio._context) {
			LWebAudio.container.push(LWebAudio._context);
			LSound.webAudioEnabled = true;
		}
	}
	LSound.Container = {
		ll_save : 0,
		time : 0,
		list : [],
		ll_show : function () {
			var c = LSound.Container;
			var t = (new Date()).getTime();
			c.time = t - (c.ll_save ? c.ll_save : t);
			c.ll_save = t;
			var l = c.list;
			for (var i = l.length - 1; i >= 0; i--) {
				if (l[i]) {
					l[i].ll_check();
				}
			}
		},
		add : function (obj) {
			if (LSound.Container.list.indexOf(obj) >= 0) {
				return;
			} 
			LSound.Container.list.push(obj);
		},
		remove : function (obj) {
			var l = LSound.Container.list;
			for (var i = l.length -1; i >= 0; i--) {
				if (l[i].objectIndex == obj.objectIndex) {
					l.splice(i,1);
					break;
				}
			}
		},
		stopOther : function (obj) {
			var l = LSound.Container.list;
			for (var i = l.length - 1; i >= 0; i--) {
				if (l[i].objectIndex != obj.objectIndex) {
					l[i].stop();
				}
			}
		}
	};
	LGlobal.childList.push(LSound.Container);
	return LSound;
})();