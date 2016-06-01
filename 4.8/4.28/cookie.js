function setCookie(sName,sValue,iDay){
	var oDate=new Date();

	oDate.setDate(oDate.getDate()+iDay);

	document.cookie=sName+"="+sValue+"; expires="+oDate;
}
function getCookie(sName){
	var sCookie=document.cookie;

	var arr=sCookie.split("; ");//arr=["user=李双","pass=12345"]

	for (var i=0; i<arr.length; i++){

		var arr2=arr[i].split("=");

		if(arr2[0]==sName){
			return arr2[1]
		}
	}

	return false;
}

function removeCookie(sName){

	setCookie(sName,".",-1);
}