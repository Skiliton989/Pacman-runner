

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
		<div>Score:<span id="score">0</span></div>
		<input type="submit" name="start" id='start' value="Старт (рестарт)" onclick='Score1(form1)'>
	</form>
	<script  src="app.js"></script>