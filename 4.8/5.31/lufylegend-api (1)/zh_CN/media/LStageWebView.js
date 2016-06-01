/** @language chinese
 * <p>LStageWebView 类在舞台视口中显示 HTML 内容。</p>
 * @class LStageWebView
 * @extends LEventDispatcher
 * @constructor
 * @example
 * 	var webview = new LStageWebView();
 * 	webview.setViewPort(new LRectangle(100,10,600,400));
 * 	webview.loadURL("http://www.lufylegend.com");
 * 	webview.show();
 * @examplelink <p><a href="../../../api/LStageWebView/index.html" target="_blank">测试链接</a></p>
 * @since 1.7.2
 * @public
 */
var LStageWebView = (function () {
	function LStageWebView () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.display = document.createElement("div");
		s.iframe = document.createElement("iframe");
		s.display.style.position = "absolute";
		s.display.style.marginTop = "0px";
		s.display.style.marginLeft = "0px";
		s.display.style.zIndex = LStageWebView.START_INDEX++;
		if(LGlobal.ios){
			s.display.style.overflow = "auto";
			s.display.style.webkitOverflowScrolling = "touch";
		}
		s.display.appendChild(s.iframe);
		s.idAdded = false;
	}
	LStageWebView.START_INDEX = 11;
	var p = {
		/** @language chinese
		 * <p>在指定的 URL 加载页面。</p>
		 * @method loadURL
		 * @param {String} url 指向的 URL。
		 * @since 1.7.2
		 * @public
		 */
		loadURL : function (u) {
			var s = this;
			s.iframe.src = u;
			s.iframe.onload = function () {
				s.dispatchEvent(LEvent.COMPLETE);
			};
		},
		/** @language chinese
		 * <p>显示此LStageWebView对象。</p>
		 * @method show
		 * @since 1.7.2
		 * @public
		 */
		show : function () {
			var s = this;
			if (!s.idAdded) {
				LGlobal.object.appendChild(s.display);
				s.idAdded = true;
			}
			if (s.display.style.display == "none") {
				s.display.style.display = "";
			}
		},
		/** @language chinese
		 * <p>隐藏此LStageWebView对象。</p>
		 * @method die
		 * @since 1.7.2
		 * @public
		 */
		die : function () {
			LGlobal.object.removeChild(this.display);
			this.idAdded = false;
		},
		hide : function () {
			this.display.style.display = "none";
		},
		/** @language chinese
		 * <p>设定舞台上显示 LStageWebView 对象的区域。</p>
		 * @method setViewPort
		 * @param {LRectangle} viewPort 舞台上显示 LStageWebView 对象的区域。
		 * @since 1.7.2
		 * @public
		 */
		setViewPort : function (r) {
			var s = this, sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width, sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
			s.display.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + ((r.y * sy) >>> 0)) + "px";
			s.display.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + ((r.x * sx) >>> 0)) + "px";
			s.iframe.style.width = s.display.style.width = (r.width * sx >>> 0) + "px";
			s.iframe.style.height = s.display.style.height = (r.height * sy >>> 0) + "px";
		}
	};
	for (var k in p) {
		LStageWebView.prototype[k] = p[k];
	}
	return LStageWebView;
})();
/** @language chinese
 * 网页加载完成事件。
 * <p><a href="LEvent.html#property_COMPLETE">LEvent.COMPLETE</a></p>
 * @event LEvent.COMPLETE
 */