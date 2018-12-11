$(function(){
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



	$.ajax({
				url: '../data/index2.json',
				success: function(arr){
					var _count=0;
					var __count=0;
					var _price=0;
					$(".item-list").html("");
					//在所有商品信息里面找出，加入购物车的商品信息
					var cookie_arr = eval($.cookie('goods'));
					for(var i = 0; i < cookie_arr.length; i++){
						 _price=parseFloat(arr[0].child[cookie_arr[i].id].price.split(",").join(""));
						_count+=Number(cookie_arr[i].num*_price);
						__count+=cookie_arr[i].num;
						$(`<div class="cart-group"> 
							<div>  
							<div class="cart-items"> 
								<new-cart-item >
									<div class="cart-item"> 
										<div class="checkbox-container"> 
											<ui-checkbox >
												<span id=${i} class="m-blue-checkbox-new checkbox-on"> 
												</span> 
											</ui-checkbox> 
										</div> 
										<div class="item-wrapper"> 
											<div class="items-thumb"> 
												<img height="80" width="80" src=${arr[0].child[cookie_arr[i].id].img[0]} alt=${arr[0].child[cookie_arr[i].id].name}>    
												<a target="_blank" title="Smartisan 蓝牙运动耳机" href="/item/100037801"></a> 
											</div> 
											<div class="name hide-row"> 
												<div class="name-table " > 
												<a target="_blank" title="${arr[0].child[cookie_arr[i].id].name}" href="/item/100037801">${arr[0].child[cookie_arr[i].id].name}</a> 
													<ul class="attribute clearfix">  
													<li>${arr[0].child[cookie_arr[i].id].yanse}</li>  
													</ul>  
												</div> 
											</div> 
											<div class="operation"> 
												<a id=${i} class="items-delete-btn"></a> 
											</div> 
											<div> 
											<div class="subtotal"><i>¥</i> <span>${cookie_arr[i].num*_price}</span></div>  
											<div class="item-cols-num"> 
												<cart-quantity>
													<div  class="quantity"> 
													<span id=${i}  class="button down">-</span> 
													<span  class="num"> 
													<input  name="" readonly="readonly" type="number" class="ng-untouched ng-pristine ng-valid" value=${cookie_arr[i].num}></span> 
													<span id=${i}  class="button up">+</span>  
													</div> 
												</cart-quantity>   
											</div> 
											<div class="price"><i>¥</i> <span>${arr[0].child[cookie_arr[i].id].price}</span></div> 
											</div> 
										</div> 
									</div>    
								</new-cart-item> 
							</div>   
						</div>
					</div>`).appendTo($(".item-list"));

					}
					$(`<div class="shipping"> 
				<div class="shipping-box"> 
					<div class="shipping-total shipping-num"> 
						<h4 class="highlight">已选择 <i>${__count}</i> 件商品</h4> 
						<h5>共计 <i>${__count}</i> 件商品</h5> 
					</div> 
					<div class="shipping-total shipping-price"> 
						<h4 class="highlight"> 应付总额：<span>￥</span><i><span>${_count}</span></i>  </h4>  
						<h5 class="shipping-tips">应付总额不含运费</h5> 
					</div> 
				</div> 
				<span class="jianguo-blue-main-btn big-main-btn js-checkout"> 
				<a>现在结算</a> 
				</span> 
			</div>`).appendTo($(".fix-bottom-inner"));
				}
			})
	//减少商品数量
	$(".item-list").on("click",".down",function(){
		if($(".item-cols-num input").eq($(this).attr("id")).attr("value")>1){
			
			//var a=parseInt($(".item-cols-num input").attr("value"));
			///a--;
			
			//修改cookie中的数量
			var str = $.cookie('goods');
			var arr = eval(str);
			arr[$(this).attr("id")].num--;
			var _price=parseFloat($(this).parents(".item-cols-num").next().find("span").html().split(",").join(""));
			var shop_num=0;
			var shop_peice=0;
			for(var i = 0; i < arr.length; i++){
				
				shop_num+=arr[i].num;
				shop_peice+=arr[i].num*parseFloat($(".price span").eq(i).html().split(",").join(""));
			}
			var cookieStr = JSON.stringify(arr);
			$.cookie('goods', cookieStr, {path:"/",expires: 7});
			// str = $.cookie('goods');
			// arr = eval(str);
			//修改网页内容
			
			$(".item-cols-num input").eq($(this).attr("id")).attr("value",`${arr[$(this).attr("id")].num}`);
			$(".item-wrapper .subtotal").eq($(this).attr("id")).html('').append($(`<i>¥</i> <span>${arr[$(this).attr("id")].num*_price}</span>`));
			$(".shipping-num i").html(`${shop_num}`);
			$(".shipping-price i span").html(`${shop_peice}`);
			
		}
	})
		//增加商品数量
		$(".item-list").on("click",".up",function(){
			if($(".item-cols-num input").eq($(this).attr("id")).attr("value")<5){
				// var a=parseInt($(".item-cols-num input").attr("value"));
				// a++;
				
				//修改cookie中的数量
				var str = $.cookie('goods');
				var arr = eval(str);
				arr[$(this).attr("id")].num++;
				var _price=parseFloat($(this).parents(".item-cols-num").next().find("span").html().split(",").join(""));
				var shop_num=0;
				var shop_peice=0;
				for(var i = 0; i < arr.length; i++){
					
					shop_num+=arr[i].num;
					shop_peice+=arr[i].num*parseFloat($(".price span").eq(i).html().split(",").join(""));
				}
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods', cookieStr, {path:"/",expires: 7});
				// str = $.cookie('goods');
				// arr = eval(str);
				//修改网页内容
				
				$(".item-cols-num input").eq($(this).attr("id")).attr("value",`${arr[$(this).attr("id")].num}`);
				$(" .item-wrapper .subtotal").eq($(this).attr("id")).html('').append($(`<i>¥</i> <span>${arr[$(this).attr("id")].num*_price}</span>`));
				$(".shipping-num i").html(`${shop_num}`);
				$(".shipping-price i span").html(`${shop_peice}`);
			}
		})
		//删除商品
		$(".item-list").delegate(".items-delete-btn","click",function(){
		//删除cookie中的内容
		var str = $.cookie('goods');
		var arr = eval(str);
		arr.splice($(this).attr("id"),1);
		console.log(arr);
		var cookieStr = JSON.stringify(arr);
		$.cookie('goods', cookieStr, {path:"/",expires: 7});
		var _price=parseFloat($(this).parent().parent().find(".price span").html().split(",").join(""));
		//删除网页内容
		$(this).parents(".cart-group").remove();
		var shop_num=0;
		var shop_peice=0;
		for(var i = 0; i < arr.length; i++){
			$(".operation a").attr("id","i");
			shop_num+=arr[i].num;
			//alert($(".price span").eq(i).html());
			shop_peice+=arr[i].num*parseFloat($(".price span").eq(i).html().split(",").join(""));
		}
		$(".shipping-num i").html(`${shop_num}`);
		$(".shipping-price i span").html(`${shop_peice}`);
		/*sc_msg();
		if($.cookie("goods") == null||$.cookie("goods") =="[]"){
			$(".nav-cart a").html("");
		$(".nav-cart .nav-cart-list").html("<div class='empty'> <h3>购物车为空</h3> <p>您还没有选购任何商品，现在前往商城选购吧！</p> </div>");
	}*/
	})
		$(".choose-all .m-blue-checkbox-new").click(function(){
			if($(".m-blue-checkbox-new").attr("class")=="m-blue-checkbox-new checkbox-on"){
				$(".m-blue-checkbox-new").removeClass("checkbox-on");
				$(".shipping-num i").html(`0`);
				$(".shipping-price i span").html(`0`);

			}else{
				$(".m-blue-checkbox-new").addClass("checkbox-on");
				var shop_num=0;
				var shop_peice=0;
				var str = $.cookie('goods');
				var arr = eval(str);	
				for(var i = 0; i < arr.length; i++){

					shop_num+=arr[i].num;
					shop_peice+=arr[i].num*parseFloat($(".price span").eq(i).html().split(",").join(""));
				}
				$(".shipping-num i").html(`${shop_num}`);
				$(".shipping-price i span").html(`${shop_peice}`);
			}
		})


		$(".item-list").on("click",".checkbox-container .m-blue-checkbox-new",function(){
			var shop_num=parseInt($(".shipping-num i").html());
			var shop_peice=parseInt($(".shipping-price i span").html());
			var _price=parseFloat($(".price span").eq($(this).attr("id")).html().split(",").join(""));
			/*var str = $.cookie('goods');
			var arr = eval(str);	
			for(var i = 0; i < arr.length; i++){

				shop_num+=arr[i].num;
				shop_peice+=arr[i].num*parseFloat($(".price span").eq(i).html().split(",").join(""));
			}
*/

			if($(this).attr("class")=="m-blue-checkbox-new checkbox-on"){
				$(this).removeClass("checkbox-on");
				shop_num-=parseInt($(".item-cols-num input").eq($(this).attr("id")).attr("value"));
				shop_peice-=parseInt($(".item-cols-num input").eq($(this).attr("id")).attr("value"))*_price;
				$(".shipping-num i").html(`${shop_num}`);
				$(".shipping-price i span").html(`${shop_peice}`);
			}else{
				$(this).addClass("checkbox-on");
				shop_num+=parseInt($(".item-cols-num input").eq($(this).attr("id")).attr("value"));
				shop_peice+=parseInt($(".item-cols-num input").eq($(this).attr("id")).attr("value"))*_price;
				$(".shipping-num i").html(`${shop_num}`);
				$(".shipping-price i span").html(`${shop_peice}`);
			}
		})	
			
	})