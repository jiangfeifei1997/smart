<?php 
	header('content-type:text/html;charset="utf-8"');

	//区分当前你是要进行什么操作  登陆  注册
	$type = $_GET['type'];

	//用户名和密码全部取出
	$username = $_POST['username'];
	$password = $_POST['password'];
	//做md5处理
	//$password = md5(md5($password).'qianfeng');


	$link = mysql_connect("localhost", "root", "123456");
	//2、判断数据库是否链接成功
	if(!$link){
		echo '数据库链接失败';
		exit; //退出整个php程序
	}

	//3、设置字符集
	mysql_set_charset('utf8');

	//4、选择数据库
	mysql_select_db("chuizi");


	if($type == "login"){
		//登陆
		/*
			会出现几种情况
			1、用户名或密码错误
			2、用户名不存在
			3、登陆成功
		*/
		//5、准备sql语句
		$sql = "select * from user_info where username='{$username}'";
		//6、发送sql语句
		$res = mysql_query($sql);
		//7、处理结果
		$row = mysql_fetch_assoc($res);

		if(!$row){
			echo "用户名不存在";
		}else{
			$sql = "select * from user_info where username='{$username}' AND password='{$password}'";
			$res = mysql_query($sql);
			$row = mysql_fetch_assoc($res);
			if($row){
				echo '登陆成功';
			}else{
				echo "用户名或密码错误";
			}
		}
			

	}else if($type == 'register'){
		//注册
		/*
			判断之前是否添加过
		*/
		$sql = "select * from user_info where username='{$username}'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		if($row){
			echo '用户名已存在';
		}else{
			//注册成功
			$sql = "insert into user_info(username,password) values('{$username}','{$password}');";
			$res = mysql_query($sql);
			if($res){
				echo '注册成功';
			}else{
				echo '注册失败';
			}
		}


	}else{
		echo 'error';
	}
	//8、关闭数据
	mysql_close($link);

 ?>		
