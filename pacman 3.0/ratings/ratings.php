<?php
	session_start();
	ob_start();
	include_once('../personal_account_of_users/header.php');

?>
<div class='center2'>
	<table>
		<tr>
			<td>Место</td>
			<td>Никнейм</td>
			<td>Счет</td>
		</tr>
	<?php
		$place = 1;
		$kol = 0;
		include_once('../connect.php');
		$query = "SELECT * FROM `users`";
		if($result = mysqli_query($link,$query)){
			while ($row = mysqli_fetch_assoc($result)){
				$id[$kol] = $row['Id'];
				$nickname[$kol] = $row['Nickname'];
				$kol++;

			}
			mysqli_free_result($result);
		}
		$kol2 = 0;
		$query = "SELECT * FROM `ratings` ORDER BY `Score` DESC";
		if($result = mysqli_query($link,$query)){
			while ($row = mysqli_fetch_assoc($result)){
			
				?>
				<tr>
					<td>
						<input type="text" name="place" size="1" value="<?php
						print($place);
						$place++;
						?>" readonly>
					</td>
					<td>
						<input type="text" name="nickname" value="<?php
						for($i = 0; $i < $kol; $i++){
							if ($id[$i] == $row['UserId']){
								print($nickname[$i]);
							}
								
						}
						?>" readonly>
					</td>
					<td>
						<input type="text" name="score" size="1" value="<?php
							print($row['Score']);
						?>" readonly>
						<?php
						?>
					</td>
				</tr>
			<?php
			}
			mysqli_free_result($result);
		}
			
			?>
	</table>
</div>