$(function(){
	var index=location.hash.substring(1,location.hash.length);
	// alert(index);

	switch(index){
		case "home":index=0;break;
		case "work":index=1;break;
		case "contact":index=2;break;
		case "join":index=3;break;
	}
	$(".nav a").removeClass("active");
	$(".nav a").eq(index).addClass("active");
	
})
