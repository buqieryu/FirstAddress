$(function(){
	
	
	
	var timer=null;

	var bol=false;

	function fnWheel(){
		$(document).mouseWheel(function(e,down){
				if(bol==false){
					Wheelslider();
				}
		},bol);
	}
	fnWheel();
	function isTouch(){
		$(document).bind("touchmove",function(e){
			if(bol){
				e.preventDefault();
			}
			else{
		  		Wheelslider();	
			}		
		})			
	}
	isTouch();

	function main(index){
		bol=true;
		fnWheel();
		isTouch()
		clearInterval(timer);
		var start=$(window).scrollTop();
		var t=0;
		var maxT=40;
		var top=0;
		switch(index){
			case 0:
			var end=0;
			var change=end-start;
			// $(".wrap").stop().animate({top:"0px"},500)
			timer=setInterval(function(){
				if(t>=maxT){
					bol=false;
					fnWheel();
					isTouch();
					clearInterval(timer);
				}
				t++;
				top=Tween.Quint.easeOut(t,start,change,maxT);
				$(window).scrollTop(top);
			},30);
			break;
			case 1:
			var end=$(".content").position().top+10;
			var change=end-start;
			timer=setInterval(function(){
				if(t>=maxT){
					bol=false;
					fnWheel();
					isTouch();
					clearInterval(timer);
				}
				t++;
				top=Tween.Quint.easeOut(t,start,change,maxT);
				$(window).scrollTop(top);
			},30);
			break;
			case 2:
			var end=$(document).height()-$(window).height();
			console.log(end);
			var change=end-start;
			timer=setInterval(function(){
				if(t>=maxT){
					bol=false;
					fnWheel();
					isTouch();
					clearInterval(timer);
				}
				t++;
				top=Tween.Quint.easeOut(t,start,change,maxT);
				$(window).scrollTop(top);
			},30);
			break;
		}
	}
	
	function reHeight(){
		$(".device").height($(".device img").eq(0).height());
		$(".swiper-wrapper").height($(".device img").eq(0).height());
		$(".swiper-slide").height($(".device img").eq(0).height());
		// $("swiper-container").height($(".device img").eq(0).height());
		$(".swiper-slide").height($(".device img").eq(0).height());
		// $(".swiper").css({height:$(window).height()-$(".head").height()});
		$(".con div").css({height:$(".con img").height()+"px"});
		
		// alert(top2);
	}
	
	// 页面切换
	var index=location.hash.substring(1,location.hash.length);
	switch(index){
		case "home":index=0;break;
		case "work":index=1;break;
		case "contact":index=2;break;
		case "join":index=3;break;
	}
	function turn(index){
		
		$(".nav a").removeClass("active");
		$(".nav a").eq(index).addClass("active");
	}


	function Wheelslider(){
		var top1=$(".content").position().top-100;
		var top2=$(".wrap").height()-$(window).height();
		if($(window).scrollTop()>=top2){
			index=2;
			turn(index);
		}
		else if($(window).scrollTop()>=top1&&$(window).scrollTop()<top2){
			index=1;
			turn(index);
		}
		else if($(window).scrollTop()<=0){
			index=0;
			turn(index);
		}

	}


	if(browserRedirect()){
		// alert(1);
		$(".nav a").click(function(){
			index=$(this).index();
			main(index);
			turn(index);
		})

	}
	else{
		
		$(".nav a").bind("touchstart", function (event) {
			// event.preventDefault();
			index=$(this).index();
			main(index);
			turn(index);
			if(index==3){
				location.href="join.html#join"
			}
			return false; 
	    });
	
  		
	}
	
  
	 var mySwiper = new Swiper('.swiper-container',{
	    pagination: '.pagination',
	    loop:true,
	    speed:800,
	    onSlideChangeStart:function()
	    {
	    	pChange();
	    	clearInterval(swiperTimer);
	    	swiperTimer=setInterval(function(){
			 	mySwiper.swipeNext();
			},4000)
	    },
	    // grabCursor: true,
	    paginationClickable: true
	 });
	 var swiperTimer=setInterval(function(){
	 	mySwiper.swipeNext();
	 },4000)


	 // 点解tab切换
	$(".swiper-pagination-switch").click(function(){
		// alert($(this).index());
			$(".message p").css({top:"25px",display:"none"});
			$(".message p").eq($(this).index()).css({top:"25px",display:"block"});
			$(".message p").eq($(this).index()).stop().animate({top:0},800)
			mySwiper.swipeTo($(this).index(),800)
	})
	// 上一步，下一步
	
	function pChange(){
		$(".message p").css({top:"25px",display:"none"});
		$(".message p").eq($(".swiper-active-switch").index()).css({top:"25px",display:"block"});
		$(".message p").eq($(".swiper-active-switch").index()).animate({top:0},800)
	}
	$(".arrow-left ").click(function(){
		mySwiper.swipePrev();
		pChange();
	})
	$(".arrow-right ").click(function(){
		mySwiper.swipeNext();
		pChange();
	})


	$("img").load(function(){
		reHeight();
		if(location.hash){
			main(index);
		}	
	})
	$(window).resize(function(){
		reHeight();
		
	})

	// 内容部分
	//var isFade=true;
	$(".con").bind("mouseenter",function(){
		
	
		//isFade=false;
		$(this).children(".work").fadeIn(300);
		$(this).children(".work").children("ul").fadeIn(300);
		$(this).children("p").css({color:"black"});
		
	})
	$(".con").bind("mouseleave",function(){
		$(this).children(".work").fadeOut(300);
		$(this).children(".work").children("ul").fadeOut(300);
		$(this).children("p").css({color:"#ADADAD"});
	})
	/*$(".con").eq(1).addClass("con2");
	$(".con").eq(4).addClass("con2");
	$(".con").eq(7).addClass("con2");10*/
	$.each($(".con"), function(index, val) {
		if ((index-1)%3==0){
			$(val).addClass("con2");
		}
	});

	
})


	