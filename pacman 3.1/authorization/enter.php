<?php
	ob_start();
	session_start();
	include_once('../header_not_autorization.php');

?>
<div class="container" style="margin-top:100px">
    <main role="main" class="pb-3">
		<div class="row justify-content-center">
			<div class="col-md-4">
        		<div class="card">
        			<div class="card-header text-center"><h3>Вход</h3></div>
        			<div class="card-body">
        				<form method="post">
        					<div class="form-group">
								<input type="text" name="login" placeholder="Введите логин" class="form-control" value="<?php echo $_POST['login']; ?>" required>
							</div>
							<div class="form-group">
								<input type="password" name="password" placeholder="Введите пароль" class="form-control" value="<?php echo $_POST['password']; ?>" required>
							</div>
							<div class="form-group">
								<input type="submit" name="enter_btn" value="Войти"  class="btn btn-primary btn-block mt-3">
							</div>
							<div class="form-group">
								<script src="//ulogin.ru/js/ulogin.js"></script>
								<div id="uLogin" data-ulogin="display=panel;theme=classic;fields=first_name,last_name;providers=vkontakte,google,yandex,mailru,facebook;redirect_uri=http://pacman/authorization/enter.php;mobilebuttons=0;"></div>
							</div>
							<label class="control-label">
								<a href='../check_in/check_in.php'>Зарегистрироваться</a>
							</label><br>
							<?php
								include_once('../connect.php');
								if (!empty($_POST['enter_btn'])){
									$login= $_POST['login'];
									$password = $_POST['password'];
									$query = "SELECT `Login`,`Password`,`Nickname`, `Token`,`Id`, `Phone` FROM `users`
									WHERE `Login` = '$login'";
									if($result = mysqli_query($link,$query)){
										while ($row = mysqli_fetch_assoc($result)) {
											if (password_verify($password,$row['Password'])){
												$bytes = openssl_random_pseudo_bytes(12, $cstrong);
													$token   = bin2hex($bytes);
													$_SESSION['token'] = $token;
													$_SESSION['nickname'] = $row['Nickname'];
													$_SESSION['login'] = $row['Login'];
													$_SESSION['phone'] = $row['Phone'];
													$QueryAlter="
													UPDATE  `users`
													SET `Token` = '$token'
													WHERE `Login` = '$login'
													";
													$result = mysqli_query($link, $QueryAlter) or die("Ошибка " .mysqli_error($link));
													$result1 = mysqli_query($link, $query);
													mysqli_free_result($result1);
													header("location:/personal_account_of_users/users.php");
											}
										}
									}
								}
								else{
									$s = file_get_contents('http://ulogin.ru/token.php?token=' . $_POST['token'] . '&host=' . $_SERVER['HTTP_HOST']);
		       						$user = json_decode($s, true);
		       						if($user['network'] == 'google' || $user['network'] == "vkontakte" || $user['network'] == "yandex" || $user['network'] == "mailru" || $user['network'] == "facebook"){
			        					$login = $user['uid'];
										$password = $user['identity'];
										$query = "SELECT * FROM `users`
										WHERE `Login` = '$login'";
										if($result = mysqli_query($link,$query)){
											while ($row = mysqli_fetch_assoc($result)) {
												if (password_verify($password,$row['Password'])){
													$bytes = openssl_random_pseudo_bytes(12, $cstrong);
														$token   = bin2hex($bytes);
														$_SESSION['token'] = $token;
														$_SESSION['nickname'] = $row['Nickname'];
														$_SESSION['login'] = $row['Login'];
														$QueryAlter="
														UPDATE  `users`
														SET `Token` = '$token'
														WHERE `Login` = '$login'
														";
														$result = mysqli_query($link, $QueryAlter) or die("Ошибка " .mysqli_error($link));
														header("location:/personal_account_of_users/users.php");
												}
											}
										}
									}
								}
							?>
								</form>
							</div>
						</div>
					</div>
				</div>
       	 	</main>
    	</div>
	</body>
</html>
<?php
	mysqli_close($link);
	ob_end_flush();
?>