			function startMove(node, CSSObj, callBack){ //callback=show
				clearInterval(node.timer);
				node.timer = setInterval(function(){

					var isClose = true;//假设所有的动画都到达目的值

					//通过遍历，找出所有的属性和对应的目的值
					for(var attr in CSSObj){
						var iTarget = CSSObj[attr];
						//1、获取当前样式的值
						var iCur = null;
						if(attr == "opacity"){
							iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
						}else{
							iCur = parseInt(getStyle(node, attr))
						}
						//2、计算速度
						var speed = (iTarget - iCur) / 8;
						speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
						//3、运动和停止分开
						if(attr == "opacity"){
							iCur += speed;
							node.style.opacity = iCur / 100;
							node.style.filter = "alpha(opacity=" + iCur + ")";
						}else{
							node.style[attr] = iCur + speed + 'px';
						}

						if(iCur != iTarget){
							isClose = false;
						}
					}
					if(isClose){
						clearInterval(node.timer);
						if(callBack){
							callBack.call(node);
						}
					}

				}, 30);
			}
			// 浏览器兼容写法
			function getStyle(node, styleType){
				return node.currentStyle ? node.currentStyle[styleType] : getComputedStyle(node)[styleType];
			}