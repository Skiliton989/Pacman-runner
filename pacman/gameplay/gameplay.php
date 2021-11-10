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
	<link rel="import" href="function_score.php">

</head>
<body>
	<form method="post">
	<div class="grid"></div>

	<div>Score:<div id="score">0</div></div>
	<script src="app.js" charset="utf-8"></script>
	</form>
</body>
</html>

<?php

	include_once('../connect.php');
	$login = $_SESSION['login'];
	$score = $_POST["Score"];
	print "$score";
	// $query = "SELECT * FROM `users`
	// WHERE `Login` = '$login'";
	// if($result = mysqli_query($link,$query)){
	// 	while ($row = mysqli_fetch_assoc($result)) {
	// 		$query1 = "UPDATE `ratings`
	// 		SET `Score` = '$score'
	// 		";
	// 		$result = mysqli_query($link, $query1) or die("Ошибка " .mysqli_error($link));
	// 	}
	// }
?>