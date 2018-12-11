$(function(){
	//选中输入框，边框变蓝
	$(".input input").focus(function(){
		$(this).parent().css({
			border:"1px solid #6b93f2",
			opacity:1
		});
		$(this).parent().addClass("focus");
		$(this).css("outline","none");
		showBtn();
		if($(this).val()){
			$(this).prev().css({
					display:"none"
				})
		}
	})
	$(".input .ng-valid-name-valid").blur(function(){
		showBtn();
		$(this).parent().css({
			border:"1px solid #ccc"
		});
			
			//用户名验证
		 var pattern=/^([\w\.\-]+)@([\w\.\-]+)\.([\w]{2,4})$/;
		 var pattern2=/^[1-3]\d{10}$/;
		 var oVal=$(".input .ng-valid-name-valid").val();
			if(!(pattern.test(oVal)||pattern2.test(oVal))){
				$(".input .ng-valid-name-valid").parent().attr({
					class:"input invalid"
				});
				$(".input .warning").eq(1).css({
					display:"inline",
					opacity:1
				})
			}else{
				$(".input .warning").eq(1).css({
					display:"none",
					opacity:0
				})
			}
	})
	$(".input input").blur(function(){
		showBtn();
		$(this).parent().css({
			border:"1px solid #ccc"
		});
			
		
			if(!$(this).val()){
				$(this).prev().css({
					display:"block"
				})
				$(this).parent().attr({
					class:"input"
				});
				$(".input .warning").eq(1).css({
					display:"none",
					opacity:0
				})
			}else{
				$(this).parent().css({
					opacity:1
				})
				$(this).prev().css({
					display:"none"
				})
			}
			
	})
	//移入输入框，透明度变化
	$(".input").hover(function(){
		$(this).css({
			opacity:1
		});
	},function(){
		$(this).css({
			opacity:0.618
		});
	})
	//输入用户名时，提示消失
	$(".input input").keydown(function(){
		$(this).prev().css({
			display:"none"
		})
		$(this).parent().attr({
					class:"input focus"
				});
	})
	$(".input  .ng-valid-name-valid").keydown(function(){
		$(".input .warning").css({
					display:"none",
					opacity:0
				})
	})
	$(".input input").keyup(function(){
		showBtn();
	})
	function showBtn(){
		 var pattern=/^([\w\.\-]+)@([\w\.\-]+)\.([\w]{2,4})$/;
		 var pattern2=/^[1-3]\d{10}$/;
		 var oVal=$(".input .ng-valid-name-valid").val();
		if((pattern.test(oVal)||pattern2.test(oVal))&&$(".input .ng-valid-password-valid").val()){
			$(".btn-wrapper div").attr({
				class:"btn btn-primary"
			})
		}else{
			$(".btn-wrapper div").attr({
				class:"btn btn-primary disabled" 
			})
		}
	}


	$(".btn-wrapper .btn-primary").click(function(){
			 var oVal=$(".input .ng-valid-name-valid").val();
			  var oVal2=$(".input .ng-valid-password-valid").val();
			var str=`username=${oVal}&password=${oVal2}`;
					ajax({
						method: "post",
						url: "../js/login.php?type=login",
						data:str,
						success: function(data){
							if(data.trim()=="登陆成功"){
								location.href="../index.html";
							}else if(data.trim()=="用户名不存在"){
								$(".input .warning").eq(2).css({
									display:"block",
									opacity:1
								})
								$(".input .ng-valid-name-valid").parent().attr({
					class:"input invalid"
				});
							}
						},
						error: function(msg){
							alert(msg);
						}
					})
					if($(".checkbox").attr("class")=="checkbox checked"){
							$.cookie("user",oVal,{
								path:'/',
								expires:7
							})
						}else{
							$.cookie("user",oVal,{
								path:"/"
							});
						}
				


	})
	$(".login-three li").not(".text").hover(function(){
		$(this).css("background-image","url(../img/icons-hover.png)")
	},function(){
		$(this).css("background-image","url(../img/icons.png)")
	})

	$(".auto").click(function(){
		if($(".checkbox").attr("class")=="checkbox checked"){
				$(".checkbox").attr({class:"checkbox"})

			}else{
				$(".checkbox").attr({class:"checkbox checked"})
			}
		
	})
	$(".remember .registercloud").click(function(){
		location.href="register.html";
	})
})