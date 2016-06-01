/** @language chinese
 * Ajax 操作函数。允许我们在不刷新浏览器的情况下从服务器加载数据。
 * @class LAjax	
 * @constructor
 * @since 1.7.1
 * @public
 */
var LAjax = (function () {
	function LAjax () {
		/** @language chinese
		 * 服务器响应的数据类型，支持LAjax.TEXT，LAjax.JSON，LAjax.ARRAY_BUFFER，LAjax.BLOB四种类型。
		 * @property LAjax.responseType
		 * @type String
		 * @since 1.9.8
		 * @public
		 * @example
		 * 	LAjax.responseType = LAjax.JSON;
		 * 	LAjax.get("test.txt",{},success);
		 * 	function success (data) {
		 * 		trace(data.name);
		 * 	}
		 */
		this.responseType = null;
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		this.canUseBlob = window.Blob || window.BlobBuilder;
		var protocol = location.protocol;
		this.local = !(protocol == "http:" || protocol == "https:");
	}
	LAjax.prototype = {
		/** @language chinese
		 * 服务器响应的数据类型的一种，TEXT。
		 * @property LAjax.TEXT
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		TEXT : "text",
		/** @language chinese
		 * 服务器响应的数据类型的一种，JSON。
		 * @property LAjax.JSON
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		JSON : "json",
		/** @language chinese
		 * 服务器响应的数据类型的一种，ARRAY_BUFFER。
		 * @property LAjax.ARRAY_BUFFER
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		ARRAY_BUFFER : "arraybuffer",
		/** @language chinese
		 * 服务器响应的数据类型的一种，BLOB。
		 * @property LAjax.BLOB
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		BLOB : "blob",
		/** @language chinese
		 * 通过远程 HTTP GET 请求载入信息。
		 * @method get
		 * @param {String} url 必需。规定将请求发送的哪个 URL。
		 * @param {Json Object} data 可选。规定连同请求发送到服务器的数据。
		 * @param {function} oncomplete 可选。规定当请求成功时运行的函数。
		 * @param {function} onerror 可选。规定当请求失败时运行的函数。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.get ......";
		 * 		LAjax.get("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/get.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.7.1
		 */
		get : function (url, data, oncomplete, onerror) {
			this.getRequest("GET", url, data, oncomplete, onerror);
		},
		/** @language chinese
		 * 通过远程 HTTP POST 请求载入信息。
		 * @method post
		 * @param {String} url 必需。规定将请求发送的哪个 URL。
		 * @param {Json Object} data 可选。规定连同请求发送到服务器的数据。
		 * @param {function} oncomplete 可选。规定当请求成功时运行的函数。
		 * @param {function} onerror 可选。规定当请求失败时运行的函数。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.post ......";
		 * 		LAjax.post("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/post.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.7.1
		 */
		post : function (url, data, oncomplete, onerror) {
			this.getRequest("POST", url, data, oncomplete, onerror);
		},
		getRequest : function (t, url, d, oncomplete, err) {
			var s = this, k, data = "", a = "";
			s.err = err;
			var ajax = s.getHttp();
			if (!ajax) {
				return;
			}
			if (d) {
				for (k in d) {
					data += (a + k + "=" + d[k]);
					a = "&";	
				}
			}
			if (t.toLowerCase() == "get" && data.length > 0) {
				url += ((url.indexOf('?') >= 0 ? '&' : '?') + data);
				data = null;
			}
			ajax.onerror = function(e){
				if(err){
					err(e);
					err = null;
				}
			};
			var progress = s.progress;
			s.progress = null;
			ajax.addEventListener("progress", function(e){
				if(e.currentTarget.status == 404){
					if (err) {
						err(e.currentTarget);
						err = null;
					}
				}else if(e.currentTarget.status == 200){
					if(progress){
						progress(e);
					}
				}
			}, false);
			ajax.open(t, url, true);
			if (s.responseType) {
				if(s.responseType == s.JSON){
					try{
						ajax.responseType = s.responseType;
					}catch(e){
						ajax.responseType = s.TEXT;
						ajax._responseType = "json";
					}
				}else{
					ajax.responseType = s.responseType;
				}
				s.responseType = s.TEXT;
			}
			ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			ajax.onreadystatechange = function (e) {
				var request = e.currentTarget;
				if (request.readyState == 4) {
					if (request.status >= 200 && request.status < 300 || request.status === 304) {
						if (oncomplete) {
							if(request._responseType == s.JSON){
								request._responseType = s.TEXT;
								oncomplete(JSON.parse(request.responseText));
							}else if (request.responseType == s.ARRAY_BUFFER || request.responseType == s.BLOB || request.responseType == s.JSON) {
								oncomplete(request.response);
							} else if (request.responseText.length > 0) {
								oncomplete(request.responseText);
							} else {
								oncomplete(null);
							}
						}
					} else {
						if (err) {
							err(request);
							err = null;
						}
					}
		 		}
			};
			ajax.send(data);
		},
		getHttp : function () {
			if (typeof XMLHttpRequest != UNDEFINED) {
				return new XMLHttpRequest();
			}  
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					if (!this.err) {
						this.err(e);
					}
				}
			}
			return false;
		}
	};
	return new LAjax();
})();