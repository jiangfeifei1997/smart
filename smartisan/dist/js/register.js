$(function(){
	$(".input input").focus(function(){
		$(this).parent().css({
			border:"1px solid #6b93f2",
			opacity:1
		});
		$(this).parent().attr({
			class:"input focus"
		});
		$(this).css("outline","none");
		showBtn();
		if($(this).val()){
			$(this).prev().css({
					display:"none"
				})
		}
	})
	$(".input .ng-valid-mobile").blur(function(){
		showBtn();
		$(this).parent().css({
			border:"1px solid #ccc"
		});
		 var pattern=/^[1-3]\d{10}$/;
		 var oVal=$(".input .ng-valid-mobile").val();
		 	if(!oVal){
		 		$(".input .ng-valid-mobile").parent().attr({
					class:"input invalid"
				});
				$(".input .warning").eq(0).css({
					display:"inline",
					opacity:1
				})
		 	}
			else if(!(pattern.test(oVal))){
				$(".input .ng-valid-mobile").parent().attr({
					class:"input invalid"
				});
				$(".input .warning").eq(1).css({
					display:"inline",
					opacity:1
				})
			}else{
				$(".input .warning").eq(0).css({
					display:"none",
					opacity:0
				})
				$(".btn-default").eq(0).attr({
					class:"btn btn-default"
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
	$(".input input").keydown(function(){
		$(this).prev().css({
			display:"none"
		})
		$(this).parent().attr({
					class:"input focus"
				});
	})
	$(".input  .ng-valid-mobile").keydown(function(){
		$(".input .warning").eq(1).css({
					display:"none",
					opacity:0
				})
		$(".input .warning").eq(0).css({
					display:"none",
					opacity:0
				})
		$(".input .warning").eq(2).css({
					display:"none",
					opacity:0
				})
	})
	$(".input input").keyup(function(){
		//showBtn();
	})
	$(".input").hover(function(){
		$(this).css({
			opacity:1
		});
	},function(){
		$(this).css({
			opacity:0.618
		});
	})

	$(".country").click(function(){
		if($(".country-list").css("display")=="none"){
			$(".country-list").css("display","block");
		}else{
			$(".country-list").css("display","none");
		}
		
		
	})	
		$(".country-list li").hover(function(){
			$(this).css({
				background: "#fafafa",
    			color: "#666",
    			fontWeight: 700

			})
		},function(){
			$(this).css({
				background: "#fff",
    			color: "#999",
    			fontSize: "14px"

			})
		})
	$(".country-list li").click(function(){
		$(".country").html($(this).html());
	})
	$(".password .ng-invalid-required").focus(function(){
		$(this).parent().next().css({
					display:"block",
					opacity:1,
					width:"349px"
				});
	})
	$(".password .ng-invalid-required").blur(function(){
		$(this).parent().next(1).css({
					display:"none",
					opacity:0,
					width:"349px"
				});
		showBtn();
	})
	$("#password").focus(function(){
		$(".input .warning").eq(7).css({
					display:"none",
					opacity:0
				})
		$(".input .warning").eq(8).css({
					display:"none",
					opacity:0
				})
	})
	$("#password").blur(function(){
		var pattern=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
		 var oVal=$("#password").val();
		 	if(!oVal){
		 		$(this).parent().attr({
					class:"input invalid"
				});
				$(".input .warning").eq(7).css({
					display:"inline",
					opacity:1
				});
				
		 	}else if(!(pattern.test(oVal))){
				$(this).parent().attr({
					class:"input invalid"
				});
				$(".input .warning").eq(8).css({
					display:"inline",
					opacity:1
				})
			}else{
				$(".input .warning").eq(8).css({
					display:"none",
					opacity:0
				})
			}
			showBtn();
	})
	$("#password").keydown(function(){
		$(".input .warning").eq(7).css({
					display:"none",
					opacity:0
				})
		$(".input .warning").eq(8).css({
					display:"none",
					opacity:0
				})
	})
	$("#repassword").blur(function(){
		 var oVal=$("#password").val();
		 var oVal2=$("#repassword").val();
		 if(oVal!=oVal2){
		 		$(this).parent().attr({
					class:"input invalid"
				});
		 		$(".input .warning").eq(11).css({
					display:"inline",
					opacity:1
				})
		 }else{
		 	$(this).parent().attr({
					class:"input"
				});
		 	$(".input .warning").eq(11).css({
					display:"none",
					opacity:0
				})
		 }
		 showBtn();
	})
	$("ew#password").focus(function(){
		$(".input .warning").eq(10).css({
					display:"none",
					opacity:0
				})
		$(".input .warning").eq(11).css({
					display:"none",
					opacity:0
				})
	})
	$("#repassword").keydown(function(){
		$(".input .warning").eq(10).css({
					display:"none",
					opacity:0
				})
		$(".input .warning").eq(11).css({
					display:"none",
					opacity:0
				})
	})
		$(".checkbox").click(function(){
			if($(".checkbox").attr("class")=="checkbox"){
				$(".checkbox").attr({
				class:"checkbox checked"
			})
			}else{
				$(".checkbox").attr({
				class:"checkbox"
			})
			}
			showBtn();
		})
		function showBtn(){
			var pattern=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
			var pattern2=/^[1-3]\d{10}$/;
			var oVal=$(".input .ng-valid-mobile").val();
			var oVal2=$("#password").val();
			var oVal3=$("#repassword").val();
			var oVal4=$(".checkbox").attr("class")=="checkbox checked"
			if((pattern.test(oVal2)&&pattern2.test(oVal))&&oVal2==oVal3&&oVal4){
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
			 var oVal=$(".input .ng-valid-mobile").val();
			  var oVal2=$(".input #password").val();
			var str=`username=${oVal}&password=${oVal2}`;
					ajax({
						method: "post",
						url: "../js/login.php?type=register",
						data:str,
						success: function(data){
							if(data.trim()=="注册成功"){
								location.href="../index.html";
							}else if(data.trim()=="用户名已存在"){
								$(".input .warning").eq(2).css({
									display:"block",
									opacity:1
								})
								$(".input .ng-valid-mobile").parent().attr({
					class:"input invalid"
				});
							}
						},
						error: function(msg){
							alert(msg);
						}
					});
					
					$.cookie(oVal,oVal2,{
								expires:7
							})

				})
				$(".tologin span").click(function(){
						location.href="login.html";
				})
})	



