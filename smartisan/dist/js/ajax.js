			function ajax({method = 'get', url, data, success, error}){
				var xhr = null;
				try{
					xhr = new XMLHttpRequest();
				}catch(error){
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}

				//1、判断是否是get，data存在
				if(method == "get" && data){
					url += "?" + data + "&" + new Date().getTime();
				}

				xhr.open(method, url, true);

				//2、send
				if(method == "get"){
					xhr.send();
				}else{
					//设置post提交的格式
					xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); 
					xhr.send(data);
				}

				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						if(xhr.status == 200){
							/*
								下载到了数据，如何处理数据，我们有不同的需求。
								需要将，这部分代码编写的权利，交给别人。
								回调函数的技术：
									我们把别人写好的一段代码，在下载数据以后再去调用。
							*/
							// alert(xhr.responseText);
							if(success){
								success(xhr.responseText);
							}
						}else{
							// alert("Error:" + xhr.status);
							if(error){
								error("Error:" + xhr.status);
							}
						}
					}
				}
			}