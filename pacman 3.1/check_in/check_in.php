<?php
	session_start();
	ob_start();
	include_once('../header_not_autorization.php');
?>
<div class="container" style="margin-top:100px">
    <main role="main" class="pb-3">
		<div class="row justify-content-center">
			<div class="col-md-4">
				<div class="card">
					<div class="card-header text-center"><h3>Регистрация</h3></div>
					<div class="card-body">
						<form method="post">
							<div class="form-group">
								<input type="text" name="nickname" placeholder="Введите свой никнейм" class="form-control" value='<?php
							echo $_POST['nickname'];
							  ?>' required>
							</div>
							<div class="form-group">
								<input type="tel" name="myphone" id='myphone' placeholder="Введите телефон" class="form-control" value='<?php
							echo $_POST['myphone'];
							 ?>'  required>
							  	<div id="error"></div>
							 	 <script>
							  		myphone.onblur = function() {

										var ph = myphone.value;
										var pattern = /^(8|\+7)\-\d{3}\-\d{3}\-\d{2}\-\d{2}$/;
										if(pattern.test(ph)){
											console.log('Соответсвует шабл.');
										}
										else
										{
											myphone.classList.add('invalid');
									   		error.innerHTML = 'Пожалуйста, введите правильный телефон. (начинаться должно +7-xxx-xxx-xx-xx или 8-xxx-xxx-xx-xx)'
									   		console.log('onblur');
										}
									}


									myphone.onfocus = function() {// pattern='\+7\d{10}'
									  if (this.classList.contains('invalid')) {
									    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
									    this.classList.remove('invalid');
									    error.innerHTML = "";
									  }

								  	   console.log('onfocus');
									};
								</script>
							</div>
							<div class="form-group">
								<input type="text" name="login" id='login' placeholder="Введите логин" class="form-control" value='<?php
								echo $_POST['login'];
							  ?>'  required>
								<div id="error1"></div>
							  	<script>
							  		login.onblur = function() {
										var lo = login.value;
										var pattern = /^[A-z]{4}[A-z0-9]*$/;
										if(pattern.test(lo)){
											console.log('Соответсвует шабл.');
										}
										else
										{
											login.classList.add('invalid');
									   		error1.innerHTML = 'Пожалуйста, введите правильный логин. (миниум 4 латинские символы)'
									   		console.log('onblur');
										}
									}
									login.onfocus = function() {// pattern='\+7\d{10}'
									  if (this.classList.contains('invalid')) {
									    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
									    this.classList.remove('invalid');
									    error1.innerHTML = "";
									  }
									  console.log('onfocus');
									};
								</script>
							</div>
							<div class="form-group">
								<input type="password" name="password" id='password' class="form-control" placeholder="Введите пароль" value='<?php
							echo $_POST['password'];
							  ?>' required>
							</div>
							<div class="form-group">
								<input type="password" name="password1" id='password1' class="form-control" placeholder="Введите повторно пароль" value='<?php
								echo $_POST['password1'];
							  ?>' required>
							  	<div id="error2"></div>
							  	<script>
								  	password1.onblur = function() {
										var pass = password.value;
										var pass1= password1.value;
										if(pass == pass1){
											console.log('Соответсвует шабл.');
										}
										else
										{
											password1.classList.add('invalid');
									   		error2.innerHTML = 'пароли не совподают'
									   		console.log('onblur');
										}
									}
									password1.onfocus = function() {// pattern='\+7\d{10}'
									  if (this.classList.contains('invalid')) {
									    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
									    this.classList.remove('invalid');
									    error2.innerHTML = "";
									  }
									  console.log('onfocus');
									};
								</script>
							</div>
							<div class="form-group">
								<input type='checkbox' name='police'required>Принять <a href=#>пользовательское соглашение</a ><br>
							</div>
							<div class="form-group">
								<input type="submit" name="enter_btn" value="Зарегистрироваться"><br>
							</div>
							<div class="form-group">
								<script src="//ulogin.ru/js/ulogin.js"></script>
								<br><div id="uLogin" data-ulogin="
								display=panel;theme=classic;fields=first_name,last_name;providers=vkontakte,mailru,facebook,google,yandex;redirect_uri=http://pacman/check_in/check_in.php;mobilebuttons=0;
							"></div>
							</div>
							<label class="control-label">
								<a href='../authorization/enter.php'>Войти</a>
							</label><br>
							<?php
								include_once('../connect.php');
								if (!empty($_POST['enter_btn'])){
									$login= $_POST['login'];
									$password = $_POST['password'];
									$nickname = $_POST['nickname'];
									$phone = $_POST['myphone'];
									$password2 = password_hash($password, PASSWORD_DEFAULT);
									$query ="INSERT `users`(`Login`,`Password`,`Nickname`,`Phone`)
											 VALUES ('$login','$password2','$nickname','$phone')
									";
									$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
									mysqli_free_result($result);
									$query = "SELECT * FROM `users`
									WHERE `Login` = '$login'";
									if($result = mysqli_query($link,$query)){
										while ($row = mysqli_fetch_assoc($result)) {
											$id = $row['Id'];
											
										}
									}
									mysqli_free_result($result);
									$date = date("Y-n-j");
									$query ="INSERT `ratings`(`UserId`, `Date`, `Score`)
											 VALUES ('$id','$date',0)
									";
									$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
									mysqli_free_result($result);
									unset($_POST["input_data_btn"]);
									header("location:../index.php");
								}
								else{
									$query ="SELECT * FROM `users`";
									if($result = mysqli_query($link,$query)){
										while ($row = mysqli_fetch_assoc($result)) {
											if ($row['Login'] == $login && password_verify($password,$row['Password'])){
										        print('Извините но аккаунт у вас уже есть');
										    }
										    else{
										    	$s = file_get_contents('http://ulogin.ru/token.php?token=' . $_POST['token'] . '&host=' . $_SERVER['HTTP_HOST']);
										        $user = json_decode($s, true);
										        if($user['network'] == 'google' || $user['network'] == "vkontakte" || $user['network'] == "yandex" || $user['network'] == "mailru" || $user['network'] == "facebook"){
													$login= $user['uid'];
													$nickname = $user['first_name'];
													$password = $user['identity'];
													$password2 = password_hash($password, PASSWORD_DEFAULT);
													$query ="INSERT `users`(`Login`,`Password`,`Nickname`)
															 VALUES ('$login','$password2','$nickname')
													";
													$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
													header("location:../index.php");
										   		}
											}
										}
									}

								}
							mysqli_close($link);
							ob_end_flush();
							?>

						</form>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
	</body>
	<style>
	  	.invalid { border-color: red; }
	 	#error { color: red }
	 	#error1 { color: red }
	 	#error2 { color: red }
	</style>
</html>