<?php
session_start();
	ob_start();
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Pacman</title>
	<link rel="stylesheet" type="text/css" href="style.css"></link>

</head>
<body>
	<form method="post" name='form1'>
		<div class="grid"></div>
		<div>Score:<div id="score">0</div></div>
		<input type="text" name="score1" id='score1' value="0" style="display: none;">
		<input type="submit" name="start" id='start' value="Старт (рестарт)" onclick='Score1(form1)'>
	</form>
	<script  src="app.js"></script>
	<?php

		include_once('../connect.php');
		$login = $_SESSION['login'];
		$score = $_POST['score1'];
		$query = "SELECT * FROM `users`
		WHERE `Login` = '$login'";
		if($result = mysqli_query($link,$query)){
			while ($row = mysqli_fetch_assoc($result)) {
				$id = $row['Id'];
				
			}
		}
		$query1 = "SELECT * FROM `ratings`
		WHERE `Id` = '$id'";
		if($result = mysqli_query($link,$query)){
			while ($row = mysqli_fetch_assoc($result)) {
				if ($score > $row['Score']){
					$query2 = "UPDATE `ratings`
					SET `Score` = '$score'
					WHERE `UserId` = '$id'
		        	";
					$result = mysqli_query($link, $query2) or die("Ошибка " .mysqli_error($link));
				}
				
			}
		}
		
	?>

