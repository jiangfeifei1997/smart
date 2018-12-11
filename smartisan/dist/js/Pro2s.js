$(function(){
	$(window).scroll(function(){
		//document.title=$(window).scrollTop();
		if($(window).scrollTop()>=45){
		$(".nav-product").addClass("active");
	}else{
		$(".nav-product").removeClass("active");
	}
	//product-fix-bar fixed
	if($(window).scrollTop()>=10190){
		$(".product-fix-bar").removeClass("follow");
	}else{
		$(".product-fix-bar").addClass("follow");
	}	
	
	})
	
	//放大功能
	var offsetX = 0;
	var offsetY = 0;
	$(".product-view").on("mousedown",".move",function(ev){
		offsetX = ev.clientX - $(".move").offset().left;
		offsetY = ev.clientY - $(".move").offset().top;
		$(document).mousemove(function(ev){
			var l = ev.clientX - offsetX-21.5;
			var t = ev.clientY - offsetY-133;

			//限制出界
			if(l <= 0){
				l = 0;
			}
			if(l >= ($(".move").parent().width()-$(".move").width()-100)){
				l = $(".move").parent().width()-$(".move").width()-100;
			}

			if(t <= 0){
				t = 0;
			}

			
			if(t >= ($(".move").parent().height() -  $(".move").height())){
				t = $(".move").parent().height() -  $(".move").height();
			}

			$(".move").css({
				left: l,
				top: t,
			})
			$(".big_pic img").css({
				left: -(l*2),
				top: -(t*2)
			})
		})
	})
	$(document).mouseup(function(){
		$(document).off("mousemove");
	})


	$(".product-view").hover(function(){
		$(".move").css({
			display:"block"
		});
		$(".big_pic").css({
			display:"block"
		})
	},function(){
		$(".move").css({
			display:"none"
		});
		$(".big_pic").css({
			display:"none"
		})
	})





	//中英文切换
	$(".language-switch").click(function(){
		if($(this).attr("class")=="language-switch"){
			$(this).addClass("active");
			$(".flag-cn .caret-down").css({
				    transform: "rotate(0)",
    				transition: "all .25s ease"
			})
		}else{
			$(this).removeClass("active");
			$(".flag-cn .caret-down").css({
				    transform: "rotate(-180deg)",
    				transition: "all .25s ease"
			})
		}
		
	})
	//动态加载数据
	$.ajax({
		url:"../data/Pro2s.json",
		success:function(data){
			$(`<h1 button-press="">${data[0].title}</h1>  
			<h2 class="product-subtitle">${data[0].info}</h2>`)
			.appendTo($(".product-title"));
			//$(`${data[0].title}`).appendTo($(".bar-device-info .title"));
			$(".bar-device-info .title").html(`${data[0].title}`);
			for(i=0;i<data[0].activity.length;i++)
			$(`<article class="activities-item"> 
					<figure class="tag-wrapper">
						<span class="tag tag-red">${data[0].activity[i].title}</span>
					</figure> 
					<label>${data[0].activity[i].content}</label> 
				</article>`).appendTo($(".activities-list"));
			for(j = 0;j < data[0].color.length;j++){
				$(`<li> 
					<div> 
						<span class="color-box"> 
							<i class="color-item"> 
								<img alt="" src=${data[0].color[j].img1}> 
							</i> 
						</span> 
						<label>${data[0].color[j].text}</label> 
					</div>  
					<div class="specs-item item-inline"> 
						<h1 class="item-name">${data[0].color[j].text}</h1> 
					</div>   
				</li>`).appendTo($(".first-spec-wrapper .spec-info"));
			}
			$(".first-spec-wrapper .spec-info li").eq(0).addClass("active");
			for(k = 0;k < data[0].size.length;k++){
				$(`<li class="">   
					<div class="specs-item item-inline"> 
						<h1 class="item-name">${data[0].size[k].capacity}</h1> 
					</div>   
				</li>`).appendTo($(".last-spec-wrapper .spec-info"));
			}
			$(".last-spec-wrapper .spec-info li").eq(0).addClass("active");
			for (var l = 0; l < data[0].specifications.length; l++) {
					$(`<img src=${data[0].specifications[l].img}>`).appendTo($(".specs-items"));
			}
			$(`<i>¥</i> <span>${data[0].size[0].price}</span>`).appendTo($(".bar-device-info .price"));
			$(`<i>¥</i> <span>${data[0].size[0].price}</span>`).appendTo($(".no-discount-price .bar-price"));
			$(".bar-device-info h2 span").eq(0).html(`${data[0].color[0].text}<span>&nbsp;|&nbsp;</span>`);
			$(".bar-device-info h2 span").eq(2).html(`${data[0].size[0].capacity}`);
			$(`<img src=${data[0].color[0].img2}>`).appendTo($(".product-view"));
			$(`<img src=${data[0].color[0].img2}>`).appendTo($(".big_pic"));

			
	},
	error:function(msg){
		alert(msg);
	}
	})
	$(".first-spec-wrapper .spec-info").on("click","li",function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
		var _this=$(this).index();
		$(".product-view").html("<div class='move'></div>");
		$(".big_pic").html("");
		$(".bar-device-info h2 span").eq(0).html("");
		$.ajax({
			url:"../data/Pro2s.json",
			success:function(data){
				var html=`<img src=${data[0].color[_this].img2}>`;
				$(html).appendTo($(".product-view"));
				$(html).appendTo($(".big_pic"));
				$(".bar-device-info h2 span").eq(0).html(`${data[0].color[_this].text}<span>&nbsp;|&nbsp;</span>`);
			},
			error:function(msg){
				alert(msg);
			}
		})
	})
	$(".last-spec-wrapper .spec-info").on("click","li",function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
		var _this=$(this).index();
		$(".bar-device-info .price").html("");
		$(".no-discount-price .bar-price").html("");
		$(".bar-device-info h2 span").eq(2).html("");
		$.ajax({
			url:"../data/Pro2s.json",
			success:function(data){
				$(`<i>¥</i> <span>${data[0].size[_this].price}</span>`).appendTo($(".bar-device-info .price"));
				$(`<i>¥</i> <span>${data[0].size[_this].price}</span>`).appendTo($(".no-discount-price .bar-price"));
				$(".bar-device-info h2 span").eq(2).html(`${data[0].size[_this].capacity}`);
			},
			error:function(msg){
				alert(msg);
			}
		})
	})
	
})