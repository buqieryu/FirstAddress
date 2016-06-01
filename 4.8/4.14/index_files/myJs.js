
   
function browserRedirect() {  
    
var sUserAgent= navigator.userAgent.toLowerCase();  
    
var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";  
    
var bIsIphoneOs= sUserAgent.match(/iphone/i) == "iphone";  
    
var bIsMidp= sUserAgent.match(/midp/i) == "midp";  
    
var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
    
var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";  
    
var bIsAndroid= sUserAgent.match(/android/i) == "android";  
    
var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";  
    
var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";  
    
    
if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {  
     return false;
}
else {  
     return true;
}  
    
}


$.fn.extend({

	mouseWheel:function (sussFn,bol){

		var _this=$(this).get(0);
		_this.onmousewheel=fnMouseWheel;

		if (_this.addEventListener){
			_this.addEventListener("DOMMouseScroll",fnMouseWheel , false);//ff
		}
		
		function fnMouseWheel(ev){

			var ev=ev||window.event;
			var down=true;

			ev.pageX=ev.clientX;
			ev.pageY=ev.clientY;

			if (ev.wheelDelta){//谷歌
				down=ev.wheelDelta<0;
				if (bol){
					if (ev.preventDefault){
						ev.preventDefault();
					}
					return false;
				}
			}
			if (ev.detail){//ff
				down=ev.detail>0;
			}
			sussFn.call(_this,ev,down);
			// console.log(bol);
			
		}
	}
});
function fnTouch(obj,fun,bol){
	obj=obj.get(0);
	var startX;
	var startY;
	var oldLeft;
	var oldTop;

	var isMoveing=false;

	function cancelTouch(){
		isMoveing=false;

		startX=null;
		startY=null;
		this.removeEventListener("touchmove", onTouchMove, false);
	}

	function onTouchMove(e){

		var oEvent=e||window.event;
		if(bol){
			oEvent.preventDefault();
		}
		if (isMoveing){
			var disX=oEvent.touches[0].pageX-startX;
			var disY=oEvent.touches[0].pageY-startY;

			if (Math.abs(disY)>=20){
				cancelTouch();
				fun();
			}
			
		}
	}
	
	obj.addEventListener("touchstart", function (e){

		var oEvent=e||window.event;
		if (oEvent.touches.length==1){

			startX=oEvent.touches[0].pageX;
			startY=oEvent.touches[0].pageY;

			isMoveing=true;
			
			this.addEventListener("touchmove",onTouchMove,false);
			
			

		}
	}, false);
}  
    
  
