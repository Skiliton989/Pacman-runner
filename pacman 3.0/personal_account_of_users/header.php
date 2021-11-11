
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="../bootstrap.css">
		<link rel="stylesheet" type="text/css" href="../style.css">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Личный кабинет <?php echo $_SESSION['nickname']; ?> </title>
	</head>
	<body>
		<header>
			<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
		    	<div class="container-fluid">
			    <a class="navbar-brand" href="../personal_account_of_users/users.php"><?php echo $_SESSION['nickname']; ?></a>
			    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>
			    <div class="collapse navbar-collapse">
			      <ul class="nav nav-tabs" id="myTab" role="tablist">
			        <li class="nav-item" role="profile">
			        	<a class="nav-link" href="../profile/profile.php">Профиль</a>
			        </li>
			      	<li class="nav-item">
			        	<a class="nav-link" href="../ratings/ratings.php">Рейтинг</a>
			        </li>	
			      </ul>
			    </div>
			    	<form method="post">
			    		<input type="submit" name="exit" value="Выход">
					</form>
			</div>
		</nav>
		</header>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
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