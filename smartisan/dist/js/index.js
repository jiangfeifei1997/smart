
function id(id){
	return document.getElementById(id);
}

  $(function(){
  	//登录后显示用户名
  		if($.cookie("user")){
  			$(`<div class="nav-user-wrapper"> 	
								<div class="nav-user-list"> 
									<dl class="nav-user-avatar"> 
										<dd> 
											<span></span> 
										</dd> 
										<dt>+86 ${$.cookie("user")}</dt> 
									</dl> 
									<ul> 
										<li class="order">
											<a href="//www.smartisan.com/user/order/list">我的订单</a>
										</li> 
										<li class="support">
											<a href="//www.smartisan.com/user/aftersale/list">售后服务</a>
										</li> 
										<li class="coupon">
											<a href="//www.smartisan.com/user/coupon">我的优惠</a>
										</li> 
										<li class="information">
											<a href="//www.smartisan.com/user/account">账户资料</a>
										</li> 
										<li class="address">
											<a href="//www.smartisan.com/user/address/list">收货地址</a>
										</li> 
										<li class="logout">
											<a>退出</a>
										</li> 
									</ul> 
								</div> 
							</div>`).appendTo($(".nav-user"));
  		}else{
  			$(".nav-user").html("");
  		}
  	$(".nav-user").mouseenter(function(){
  			
  			$(".nav-user-wrapper").css({
  				opacity:1,
  				visibility:"visible",
  				top:"30px"
  			})
  	})
  		$(".nav-user").mouseleave(function(){
  		
  			$(".nav-user-wrapper").css({
  				opacity:0,
  				visibility:"hidden",
  				top:"-3000px"
  			})
  	})
  	//搜索框获取焦点提示信息消失，失去焦点显示
	id("js_searchText").onfocus=function(){
		id("words").style.display="none";
		id("keywords-list").style.display="block";
	}
	id("js_searchText").onblur=function(){
		id("words").style.display="block";
		id("keywords-list").style.display="none";
	}
	//页面滚动，导航栏动画并停留在顶部
	window.onscroll = function(){	
		var oDiv=document.getElementById("nav-sub-wrapper");
		var oDiv2=document.getElementById("nav-search");

		if($(window).scrollTop()>=45){
			//$(".nav-sub-wrapper").addClass("fixed");
			$(".header-sub-shop").addClass("fixed");
			$(".nav-search").css("display","none");
			id("nav-aside").style.display="block";
			$(".nav-aside .nav-user").css({"background":"url(images/profilephoto.png) no-repeat","background-size":20});
			$(".nav-aside .nav-cart").css({"background":"url(images/carticon.png) no-repeat","background-size":20,"margin-left":30});
			startMove(oDiv,{top:0});

		}else{
			//$(".nav-sub-wrapper").removeClass("fixed");
			$(".header-sub-shop").removeClass("fixed");
			$(".nav-sub-wrapper").removeAttr("style");
			$(".nav-search").css("display","block");
			id("nav-aside").style.display="none";
			$(".nav-aside .nav-user,.nav-aside .nav-cart").removeAttr("style");
		}
	}
	//移入导航加载下拉菜单
	$(".nav-sub .nav-list li").mouseenter(function(){
		$(".nav-sub").addClass("active");
		var _this=$(this).index();
		$(".nav-goods-panel").html("");
		if(_this<=6){
			$.ajax({
			url:"data/index.json",
			success:function(data){
				if(data[_this].child){
					$(".nav-goods-panel").append($(`<ul _ngcontent-c6="" class="nav-category-list"></ul>`));
				for(var i=0;i<data[_this].child.length;i++){
					var html=`<li _ngcontent-c6="" class="" style="width: 0px;"> 
							<a _ngcontent-c6="" class="min-title">${data[_this].child[i].title}</a> 
							<div _ngcontent-c6="" class="nav-category-item">`;
					for(j = 0; j<data[_this].child[i].child.length;j++){
						 html+=`<span _ngcontent-c6="">
									<img _ngcontent-c6="" src="${data[_this].child[i].child[j].img}">
									<span _ngcontent-c6="">${data[_this].child[i].child[j].info}</span>
									<a _ngcontent-c6="" href="/category/7?type=product" title="${data[_this].child[i].child[j].info}"></a> 
								</span>`
					}
						html+=`</div></li>`;
						$(".nav-category-list").append(html);				
							
				}
				if(_this==0){
					$(".nav-category-list li").eq(1).css("width","404px");
				}	


				}
				
				
			},
			error:function(msg){
				alert(msg);
			}
		})
		}
		

	})
	$(".nav-sub").mouseleave(function(){
		$(".nav-sub").removeClass("active");
	})	
	//点击小点切换图片
	var iNow=0;
	$(".banner-focus a").click(function(){
		 iNow=$(this).index();
		move();
	})
	function timerInner(){				
					iNow++;
					move();	
				}

	var timer = setInterval(timerInner, 2000);

	$(".banner").hover(function(){
			clearInterval(timer);
		}, function(){
			timer = setInterval(timerInner, 2000);
	})
	function move(){
		$(".banner-focus a").removeClass("active").eq(iNow).addClass("active");
					
		$(".banner-item").removeClass("active").eq(iNow).addClass("active");
		
						if(iNow == $(".banner-item").size() - 1){
							//切回第一张图片
							iNow = -1;
							
						}
					
	}


	//热门商品左右切换
	$(".home-box").eq(2).on("click",".home-page a:nth-child(2)",function(){
		$(".hot-items").css("transform","translate(-1220px, 0px)");
		$(this).addClass("disabled");
		$(".home-page a").eq(0).removeClass("disabled");
	});
	$(".home-box").eq(2).on("click",".home-page a:nth-child(1)",function(){
		$(".hot-items").css("transform","translate(0px, 0px)");
		$(this).addClass("disabled");
		$(".home-page a").eq(1).removeClass("disabled");
	})

	//移入移出商品显示查看详情等按钮,h6内容变化 
	$(".home-wrapper").on("mouseenter",".item-four",function(){
		__this=$(this).index();
		$(".item-price").eq($(this).index()).css("display","none");
		$(".button-container").eq($(this).index()).css("display","flex");
		$(".product-box-item h6").eq($(this).index()).addClass("title-promos");
	});
	$(".home-wrapper").on("mouseleave",".item-four",function(){
		$(".item-price").eq($(this).index()).css("display","block");
		$(".button-container").eq($(this).index()).css("display","none");
		$(".product-box-item h6").eq($(this).index()).removeClass("title-promos");
	});
	var __this="";
	var ___this="";
	$(".home-wrapper").on("mouseenter",".home-box",function(){
		if($(this).index()==2){
			___this=0;
		}else if($(this).index()==0){
			___this=1;
		}else if($(this).index()==1){
			___this=2;
		}
	})
	//移入按钮改变按钮样式	
	$(".home-wrapper").on("mouseenter",".colors-list li",function(){
		$(this).parent().children().removeClass("active");
		$(this).addClass("active");
		var tthis=$(this);
		var _this=$(this).index();
		$.ajax({
		url:"data/index2.json",
		success:function(data){
			if(___this==0){
				tthis.parent().parent().prev().children(".item-img").html("").append(`<img src=${data[___this].child[__this].img[_this]} style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">`);
			}else{
				tthis.parent().parent().prev().children(".item-img").html("").append(`<img src=${data[___this].child[__this-1].img[_this]} style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">`);
			}
			
		},
		error:function(msg){
			alert(msg);
		}
	})
	});
	//锤子应用移入移出切换
	$(".page-home ul li").hover(function(){
		$(this).find(".app-content").css({
			    opacity: 0,
    			transition: "opacity .1s cubic-bezier(.4,0,1,1)"
		});
		$(this).find(".operation").css({
			opacity:1,
			visibility:"visible",
			boxShadow: "inset 0 0 38px rgba(0,0,0,.08)",
    		transition:" opacity .2s ease-out .15s"
		})
	},function(){
		$(this).find(".app-content").css({
			    opacity: 1,
			    transition:" opacity .2s ease-out .15s"
    			
		});
		$(this).find(".operation").css({
			opacity:0,
			visibility:"hidden",
    		transition: "opacity .1s cubic-bezier(.4,0,1,1)"
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
//加载商品
	$.ajax({
		url:"data/index2.json",
		success:function(data){
			$(".home-wrapper .home-box").eq(2).append($(`<header class="storey-title">
				  	<h5 class="title">${data[0].title}</h5> 
				  	<div class="home-page"> 
				  		<a class="disabled"></a>
				   		<a class=""></a> 
				   </div> 
			   	</header> 
			   	<div class="category-normal-wrapper"> 
				   	<section class="items-wrapper clearfix"> 
					   	<ul class="items clearfix hot-items" style="width: 2440px; transform: translate(0px, 0px);">
					   	</ul>
					</section>
				</div>`));
			for(i=0;i<data[0].child.length;i++){
				$(".category-normal-wrapper .hot-items").append($(`<li class="item-four">  
						   		<sku-item-normal _nghost-c9="">
						   			<div class="product-box-item"> 
							   			<div>
								    		<div class="item-img"> 
								    			<img src=${data[0].child[i].img[0]} style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
								    		</div> 
							     			<h4>${data[0].child[i].name}</h4> 
							      			<h6 class="">${data[0].child[i].info}</h6> 
							    		</div> 
						      			<div class="params-colors"> 
						      				<ul class="colors-list"> 
							      				
						          			</ul>
						           		</div>  
							           	<div class="item-price clearfix"> 
							           		<span><i>¥</i> <span>${data[0].child[i].price}</span></span> 
							           	</div>
							           	<div class="button-container" style="display: none;">
											<button class="normal">查看详情</button>
											<button class="confirm">加入购物车</button>
							           	</div>    
							           	<div class="item-tips"> 
								           <span class="info">添加商品</span> 
								           <span class="warning">已达限购数量</span>
							           	</div>   
						            </div> 
						        </sku-item-normal> 
							</li>`));
				
				if(data[0].child[i].activity){
					$(".product-box-item").eq(i).append($(` <colorful-tag _nghost-c14="">
							            <span" class="colorful-tag red"> 买赠 </span> 
							            </colorful-tag>`));

				}
			}
			for(var k = 1;k < data.length;k++){
				$(`<div class="home-box"> 
					<header class="storey-title"> 
						<h5 class="title">${data[k].title}</h5>  
					</header> 
					<div class="category-normal-wrapper"> 
						<section class="items-wrapper clearfix"> 
							<ul class="items clearfix"> 
								<li class="item-four item-recom"> 
									<advertise _nghost-c8="">
										<div class="advertise"> 
											<div class="advertise-item"> 
												<img src=${data[k].advertise} style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;"> <a target="_blank" href="https://www.smartisan.com/item/100046411"></a> 
											</div> 
										</div> 
									</advertise> 
								</li>
							</ul>
						</section>
					</div>
				</div>		`).appendTo($(".home-wrapper .mianbox"));
				for(var l=0;l<data[k].child.length;l++){
					$(`<li class="item-four">  
									<sku-item-normal>
										<div class="product-box-item"> 
											<div> 
												<div class="item-img"> 
													<img src=${data[k].child[l].img[0]} style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;"> </div> 
												<h4>${data[k].child[l].name}</h4>  
												<h6>${data[k].child[l].info}</h6>   
											</div> 
											<div class="params-colors"> 
												<ul class="colors-list"> 
													
												</ul> 
											</div>  
											<div class="item-price clearfix"> 
												<span><i>¥</i> <span>${data[k].child[l].price}</span></span> 
											</div>     
											<div class="item-tips"> 
												<span class="info">添加商品</span><span class="warning">已达限购数量</span>
											</div>   
										</div> 
									</sku-item-normal> 
								</li>`).appendTo($(".category-normal-wrapper .items").eq(k));
					
				}
				
			}
			var count=-1;
			for(var n=0;n<data.length;n++){
				for(var o=0;o<data[n].child.length;o++){
					count++;
					for(var m=0;m<data[n].child[o].color.length;m++){
				$(" .category-normal-wrapper .item-four .colors-list").eq(count).append($(`<li class=""> 
									              	<div class="outer">
									               		<img src=${data[n].child[o].color[m]} style="opacity: 1; transition: opacity 0.3s ease-in-out 0s;">
									                </div> 
					                			</li>`))
					}
				}
			}
			
			
		},
		error:function(msg){
			console.log(msg);
		}
	})
	if($.cookie("goods") == null){
		$(".nav-cart .nav-cart-list").html("<div class='empty'> <h3>购物车为空</h3> <p>您还没有选购任何商品，现在前往商城选购吧！</p> </div>");
	}else{
		$(".nav-cart .nav-cart-list").html("<div class='full'> </div>");
	}

			//购物车
		$(".home-wrapper").on("click", ".confirm", function(){
			//进行抛物线运动
			ballMove(this);
			//出现红点
			$(".nav-cart a").append(`<span  class="cart-tip cart-num"></span>`);
			//获取到当前加入购物车按钮所在的商品id
			var id = __this;
			//存储cookie的时候，对于当前商品只存储两个值，id num
			//json格式的字符串去存 goods  [{id:1, num:3},{id:7, num2}];
			//
			//1、判断是否第一次添加cookie
			var first = $.cookie("goods") == null ? true : false;
			if(first){
				$.cookie('goods', `[{id:${id},num:1}]`, {expires: 7});
			}else{
				//2、判断之前是否添加过该商品
				var str = $.cookie('goods');
				//alert(eval(str));
				var arr = eval(str);
				var same = false; //假设没有相同的数据
				for(var i = 0; i < arr.length; i++){
					if(arr[i].id == id){
						//之前添加过
						arr[i].num++;
						var cookieStr = JSON.stringify(arr);
						$.cookie('goods', cookieStr, {expires: 7});
						same = true;
						break;
					}
				}

				if(!same){
					//之前没添加过
					var obj = {id: id, num: 1};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods', cookieStr, {expires: 7});
				}
			}
			sc_car();
			/*if($.cookie("goods") == null||$.cookie("goods") == "[]"){
		$(".nav-cart .nav-cart-list").html("<div class='empty'> <h3>购物车为空</h3> <p>您还没有选购任何商品，现在前往商城选购吧！</p> </div>");
	}else{
		$(".nav-cart .nav-cart-list").html("<div class='full'> </div>");
	}*/
		})
		function sc_car(){
			var str = $.cookie("goods");
			if(str){
				var arr = eval(str);
				var sum = 0;
				for(var i = 0; i < arr.length; i++){
					sum += arr[i].num;
				}
				
			}
			return sum;
		}
		//显示购物车内商品
		function sc_msg(){
			$.ajax({
				url: 'data/index2.json',
				success: function(arr){
					var _count=0;
					$(".full").html("");
					//在所有商品信息里面找出，加入购物车的商品信息
					var cookie_arr = eval($.cookie('goods'));
					$(`<div class="nav-cart-items" id="iscroll_wrapper"> 
						<ul></ul</div>
						`).appendTo($(".full"));
					for(var i = 0; i < cookie_arr.length; i++){
						var _price=parseFloat(arr[0].child[cookie_arr[i].id].price.split(",").join(""));
						_count+=Number(cookie_arr[i].num*_price);
						$(`<li class="clearfix"> 
							<div class="cart-item js-cart-item cart-item-sell" id="100033802"> 
								<div class="cart-item-inner"> 
								<div class="item-thumb"> 
								<img src=${arr[0].child[cookie_arr[i].id].img[0]}>   
								</div> 
								<div class="item-desc"> 
								<div class="cart-cell"> 
								<h4> 
								<a target="_blank" href="/item/100033802">${arr[0].child[cookie_arr[i].id].name}</a>  
								</h4> <p class="attrs"> 
								<span>${arr[0].child[cookie_arr[i].id].yanse}</span></p> 
								<h6>
								<span class="price-icon">¥</span>
								<span class="price-num">${arr[0].child[cookie_arr[i].id].price}</span> 
								<span class="item-num">x ${cookie_arr[i].num}</span> 
								</h6> 
								</div> 
								</div> 
									<div id=${i} class="del-btn">删除</div> 
								</div> 
							</div>    
							</li>`).appendTo($(".full ul"));

					}
					$(`<div class="nav-cart-total"> 
							<p>共 <strong>${sc_car()}</strong> 件商品</p>
							<h5>合计：
							<span class="price-icon">¥</span>
							<span class="price-num">${_count}</span>
							</h5> 
							<h6><a class="nav-cart-btn" href="//www.smartisan.com/cart">去购物车</a></h6> 
						</div> `).appendTo($(".full"));
				}
			})
		}
	$(".nav-cart").mouseenter(function(){
		if($.cookie("goods")){
			sc_msg();
		}
		if($.cookie("goods") == null||$.cookie("goods") == "[]"){
		$(".nav-cart .nav-cart-list").html("<div class='empty'> <h3>购物车为空</h3> <p>您还没有选购任何商品，现在前往商城选购吧！</p> </div>");
	}else{
		$(".nav-cart .nav-cart-list").html("<div class='full'> </div>");
	}
		
	})

	$(".nav-cart-list").on("click",".del-btn",function(){
		//删除cookie中的内容
		var str = $.cookie('goods');
		var arr = eval(str);
		arr.splice($(this).attr("id"),1);
		var cookieStr = JSON.stringify(arr);
		$.cookie('goods', cookieStr, {expires: 7});
		//删除网页内容
		$(this).parents(".clearfix").remove();
		//sc_msg();
		if($.cookie("goods") == null||$.cookie("goods") =="[]"){
			$(".nav-cart a").html("");
		$(".nav-cart .nav-cart-list").html("<div class='empty'> <h3>购物车为空</h3> <p>您还没有选购任何商品，现在前往商城选购吧！</p> </div>");
	}
	})

	//抛物线运动
		function ballMove(startNode){
			$.ajax({
				url:"data/index2.json",
				success:function(data){
					$(".ball").html("").append($(`<img src=${data[0].child[__this].img[0]} alt="">`))
				},
				error:function(msg){
					alert(msg);
				}
			})
			$(".ball").css({
					left: $(startNode).offset().left,
					top: $(startNode).offset().top,
					display: "block"
			})

			var offsetX = $("#nav-aside").offset().left - $(".ball").offset().left+60;
			var offsetY = $("#nav-aside").offset().top - $(".ball").offset().top;
			//配置参数
			var bool = new Parabola({
				el: ".ball",
				targetEl:null,
				offset: [offsetX,offsetY],
				curvature: 0.0004,
				duration: 400,
				callback:function(){
					$(".ball").css('display', 'none');
				}
			})

			bool.start();
		}
			$(".nav-user").click(function(){
				if(!$.cookie("user")){
					location.href='html/login.html';
				}
				
			})
			$(".nav-cart").click(function(){
				location.href='html/cart.html';
			})

			$(".home-wrapper").on("click", ".normal", function(){
				location.href="html/Pro2s.html";
			})
			
})