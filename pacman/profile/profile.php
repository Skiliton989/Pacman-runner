<?php
	session_start();
	ob_start();
	include_once('header.php');
?>
		<div class = 'center2'>
			<form method="post" name="form1">
				Никнейм <input type="text" name="nickname" value='<?php
				echo $_SESSION['nickname'];
				  ?>' readonly ><br>
				Телефон <input type="text" name="myphone" value='<?php
				echo $_SESSION['phone'];
				 ?>' readonly>
			</form>
		</div>
	</body>
</html>