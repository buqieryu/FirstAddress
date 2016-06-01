function wheel(obj , fn) {
	//	内部的 得 到向上或是向下
	//	元素a的改变应该是在得到向上或是向下时候发生
	var a = window.navigator.userAgent.indexOf("Firefox");
	if (a != -1) {
		//		因为各个浏览器添加滚轮事件的监听者不一样，
		//		所以要判断是那个浏览器
		//		火狐浏览器是用DOMMmouseScroll
		//		来添加滚轮监听事件的
		//		
		//		其他浏览器是用：onmousewheel
		//		来添加监听事件的
		//		//是火狐
		obj.addEventListener("doMMouseScroll", gunlunFunction, false);
	} else {
		//不是火狐
		obj.onmousewheel = gunlunFunction;
	}
//	滚轮事件的触发方法为gunlunFunction()
	function gunlunFunction(event){
		var down = false;
		
//		火狐用事件的detail 来检测方向的
//		非火狐中  用事件的wheelDelta 来检测方向的
		if(event.detail){
			//火狐
			down = event.detail > 0;
		}else{
			//非  huo hu
			down = event.wheelDelta < 0;
		}
		fn.apply(obj , [event , down]);
		return false;
	}
}