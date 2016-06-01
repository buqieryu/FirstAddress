$(function(){
	if($(window).width()>1366){
		$(".center").css({width:"1200px"});
		var isResize=false;
		$(window).resize(function(){
			if($(window).width()<1200){
				isResize=true;
			}else{
				isResize=false;
			}
			if(isResize){
				$(".center").css({width:$(window).width()*0.78});
			}else{
				$(".center").css({width:"1200px"});
			}
		})
	}
	
})