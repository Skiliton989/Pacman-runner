<DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../style.css">
		<title>Личный кабинет <?php echo $_SESSION['nickname']; ?> </title>
	</head>
	<body>
		<header class='center1'>
			<div class="center2">
				Pacman runner
				<div class='right2'>
					<form method="post">
					<div class='right2'>
						<input type="submit" name="exit" value="Выход">
					</div>
				</form>
			</div>
		</header>
		<?php
			include_once('../connect.php');
			if(!empty($_POST['exit'])){
				$bytes = openssl_random_pseudo_bytes(12, $cstrong);
				$token   = bin2hex($bytes);
				$login = $_SESSION['login'];
				$QueryAlter="
				UPDATE  `users`
				SET `Token` = '$token'
				WHERE `Login` = '$login'
				";
				$result = mysqli_query($link, $QueryAlter) or die("Ошибка " .mysqli_error($link));
				unset($_POST['exit']);
				header("location:/index.php");
			}
			?>