var score = 0

function Score1(obj){
		obj.score1.value = score
	}
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const width = 28
	
	let kol = 0
	let kol2 = 0
	let l = 0
//карта пакмана
	var layout = [
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,
		1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
		1,3,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,3,1,
		1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
		1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,
		1,4,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,4,1,
		1,4,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,4,1,
		1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,
		1,1,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,1,1,
		1,1,1,1,1,1,4,1,1,4,4,4,4,4,4,4,4,4,4,1,1,4,1,1,1,1,1,1,
		1,1,1,1,1,1,4,1,1,4,4,4,4,4,4,4,4,4,4,1,1,4,1,1,1,1,1,1,
		1,1,1,1,1,1,4,1,1,4,4,4,4,4,4,4,4,4,4,1,1,4,1,1,1,1,1,1,
		4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
		1,1,1,1,1,1,4,1,1,4,4,4,4,4,4,4,4,4,4,1,1,4,1,1,1,1,1,1,
		1,1,1,1,1,1,4,1,1,4,4,4,4,4,4,4,4,4,4,1,1,4,1,1,1,1,1,1,
		1,1,1,1,1,1,4,1,1,4,4,4,4,4,4,4,4,4,4,1,1,4,1,1,1,1,1,1,
		1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,
		1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
		1,4,1,1,1,1,4,1,1,1,1,1,4,1,1,4,1,1,1,1,1,4,1,1,1,1,4,1,
		1,3,4,4,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,4,4,3,1,
		1,1,1,4,1,1,4,1,1,4,1,1,1,1,1,1,1,1,4,1,1,4,1,1,4,1,1,1,
		1,1,1,4,1,1,4,1,1,4,1,1,1,1,1,1,1,1,4,1,1,4,1,1,4,1,1,1,
		1,4,4,4,4,4,4,1,1,4,4,4,4,1,1,4,4,4,4,1,1,4,4,4,4,4,4,1,
		1,4,1,1,1,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,4,1,
		1,4,1,1,1,1,1,1,1,1,1,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,4,1,
		1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
	]


	const squares = []
	let pp = []
	//Legend
	// 1 - стена
	// 2 - логово приведении
	// 3 - энергетическая гранула
	// 4 - пусто

	function createBoard(){
		for(let i = 0; i < Object.keys(layout).length; i++){
			const square = document.createElement('div')
			grid.appendChild(square)
			squares.push(square)

			if(layout[i] == 1){
				squares[i].classList.add('wall')
			}
			else if(layout[i] == 2){
				squares[i].classList.add('ghost-lair')
			}
			else if(layout[i] == 3){
				pp[kol2] = i
				kol2++
			}
			if(layout[i] == 4 || layout[i] == 3){
				squares[i].classList.add('fog-of-war')
			}
		}
	}
	let kol1 = 4
	createBoard()


	//начальное позиция пакмана

	let pacmanCurentIndex = 490

	squares[pacmanCurentIndex].classList.add("pacman")

	//движение пакмана

	function movePacman(e){

		squares[pacmanCurentIndex].classList.remove("pacman")

		switch(e.keyCode){
			case 65:
				if(pacmanCurentIndex % width !== 0 && !squares[pacmanCurentIndex -1].classList.contains('wall') && !squares[pacmanCurentIndex -1].classList.contains('ghost-lair') )	pacmanCurentIndex -=1
					
				//проверка, находится ли пакман у левого выхода
				if((pacmanCurentIndex -1) == 363){
					pacmanCurentIndex = 391		
				}

				break
			case 87:
				if(pacmanCurentIndex - width >= 0 && !squares[pacmanCurentIndex -width].classList.contains('wall') && !squares[pacmanCurentIndex -width].classList.contains('ghost-lair')) pacmanCurentIndex -= width

				break
			case 68:
				if(pacmanCurentIndex % width < width - 1 && !squares[pacmanCurentIndex +1].classList.contains('wall') && !squares[pacmanCurentIndex +1].classList.contains('ghost-lair')) pacmanCurentIndex += 1
				
				//проверка, находится ли пакман у правого выхода
				 if((pacmanCurentIndex +1) == 392){
					pacmanCurentIndex = 364		
				}

				break
			case 83:
				if(pacmanCurentIndex + width < width * width && !squares[pacmanCurentIndex +width].classList.contains('wall') && !squares[pacmanCurentIndex +width].classList.contains('ghost-lair')) pacmanCurentIndex += width
				break
		}

		squares[pacmanCurentIndex].classList.add('pacman')

		powerPelletEaten()
	}
	document.addEventListener("keyup", movePacman)


	function Score(){
		kol++
		if(kol == 20){
			score++
			scoreDisplay.innerHTML = score
			kol = 0
		}
	}

	function renderDistance(ghost){
		let left,right,up,down,up_left,up_right,down_left,down_right
		let k1 = 0, k2 = 0, k3 = 0, k4 = 0, k5 = 0, k6 = 0, k7 = 0, k8 = 0
		const d = 3
		for(let i = 0; i < Object.keys(layout).length; i++){
			if(layout[i] == 4 || layout[i] == 3){
				squares[i].classList.add('fog-of-war')
			}
		}
		for(let i = 0; i < kol2; i++){
				squares[pp[i]].classList.remove('power-pellet')
		}
		for(let i = 1; i < d; i++){
			if(pacmanCurentIndex % width -i !== 0 && !squares[pacmanCurentIndex -i].classList.contains('wall') && k1 == 0){
				left = pacmanCurentIndex -i
				for(let j = 0; j < kol2; j++){
					if(	left == pp[j]){
						squares[left].classList.add('power-pellet') 
						l = j
					}
				}
				if(ghost.currentIndex == left)
					squares[left].classList.add(ghost.className, 'ghost')

				squares[left].classList.remove('fog-of-war')

			}
			else
				k1++
			
			
			if(pacmanCurentIndex % width < width - i && !squares[pacmanCurentIndex +i].classList.contains('wall') && k2 == 0){
				right = pacmanCurentIndex +i
				for(let j = 0; j < kol2; j++)
					if(right == pp[j]) {
						squares[right].classList.add('power-pellet')
						l = j
					}
				if(ghost.currentIndex == right)
					squares[right].classList.add(ghost.className, 'ghost')

				squares[right].classList.remove('fog-of-war')
			}
			else
				k2++
			if(pacmanCurentIndex - width * i >= 0 && !squares[pacmanCurentIndex -width * i].classList.contains('wall') && k3 == 0){
				up = pacmanCurentIndex - width*i
				for(let j = 0; j < kol2; j++)
					if(up == pp[j]) {
						squares[up].classList.add('power-pellet')
						l = j
					}

				if(ghost.currentIndex == up)
					squares[up].classList.add(ghost.className, 'ghost')

				squares[up].classList.remove('fog-of-war')
				
			}
			else
				k3++
			if(pacmanCurentIndex + width * i < width * width && !squares[pacmanCurentIndex + width * i].classList.contains('wall') && k4 == 0){
				down = pacmanCurentIndex + width*i
				for(let j = 0; j < kol2; j++)
					if(	down == pp[j]){
						squares[down].classList.add('power-pellet')
						l = j
					}
				if(ghost.currentIndex == down)
					squares[down].classList.add(ghost.className, 'ghost')

				squares[down].classList.remove('fog-of-war')
			}
			else
				k4++

			if(pacmanCurentIndex - width *i - i >= 0 && !squares[pacmanCurentIndex -width * i - i].classList.contains('wall') && k5 == 0){
				up_left = pacmanCurentIndex - width * i - i
				for(let j = 0; j < kol2; j++)
					if(up_left == pp[j]) {
						squares[up_left].classList.add('power-pellet')
						l = j
					}
				if(ghost.currentIndex == up_left)
					squares[up_left].classList.add(ghost.className, 'ghost')


				squares[up_left].classList.remove('fog-of-war')
				
			}
			else
				k5++

			if(pacmanCurentIndex - width * i + i >= 0 && !squares[pacmanCurentIndex -width * i + i].classList.contains('wall') && k6 == 0 ){
				up_right = pacmanCurentIndex - width * i + i
				for(let j = 0; j < kol2; j++)
					if(up_right == pp[j]) {
						squares[up_right].classList.add('power-pellet')
						l = j
					}
				if(ghost.currentIndex == up_right)
					squares[up_right].classList.add(ghost.className, 'ghost')
				squares[up_right].classList.remove('fog-of-war')
				
			}
			else
				k6++

			if(pacmanCurentIndex + width * i - i < width * width && !squares[pacmanCurentIndex +width *i - i].classList.contains('wall') && k7 == 0){
				down_left = pacmanCurentIndex + width * i - i
				for(let j = 0; j < kol2; j++)
					if(	down_left == pp[j]){
						squares[down_left].classList.add('power-pellet')
						l = j
					}
				if(ghost.currentIndex == down_left)
					squares[down_left].classList.add(ghost.className, 'ghost')

				squares[down_left].classList.remove('fog-of-war')
			}
			else
				k7++

			if(pacmanCurentIndex + width * i + i < width * width && !squares[pacmanCurentIndex + width * i + i].classList.contains('wall') && k8 == 0){
				down_right = pacmanCurentIndex + width * i + i
				for(let j = 0; j < kol2; j++)
					if(	down_right == pp[j]){
						squares[down_right].classList.add('power-pellet')
						l = j
					}
				if(ghost.currentIndex == down_right)
					squares[down_right].classList.add(ghost.className, 'ghost')

				squares[down_right].classList.remove('fog-of-war')
			}
			else
				k8++

		}
		
	}
		

	function powerPelletEaten(){
		if(squares[pacmanCurentIndex].classList.contains('power-pellet')){
			ghosts.forEach(ghost => ghost.isScared = true)
			setTimeout(unScaredGhosts, 10000)
			squares[pacmanCurentIndex].classList.remove('power-pellet')
			pp.splice(l,1)
			kol2 -= 1
		}
	}

	function unScaredGhosts(){
		ghosts.forEach(ghost => ghost.isScared = false )
	}

	//создание шаблона приведении 
	class Ghost{
		constructor(className, startIndex, speed){
			this.className = className
			this.startIndex = startIndex
			this.speed = speed
			this.currentIndex = startIndex
			this.timerId = NaN
			this.isScared = false
		}
	}

	var ghosts = [
		new Ghost('Blinky', 348, 250),
		new Ghost('Pinky', 376, 400),
		new Ghost('Inky', 351, 300,),
		new Ghost('Clyde', 379, 500)
	]

//рисуем своих привидении
	// ghosts.forEach(ghost => {
	// 	squares[ghost.currentIndex].classList.add(ghost.className)
	// 	squares[ghost.currentIndex].classList.add('ghost')
	// })

//движение привидении
	ghosts.forEach(ghost => moveGhost(ghost))

	function moveGhost(ghost){
		const directions = [-1, +1, width, -width]
		let direction = directions[Math.floor(Math.random() * directions.length)]
		ghost.timerId = setInterval(function(){
			Score()
			setTimeout(squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost'),500)
			if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
				ghost.currentIndex += direction
			}
			else direction = directions[Math.floor(Math.random()* directions.length)]
			renderDistance(ghost)
			// if(ghost.isScared){
			// 	squares[ghost.currentIndex].classList.add('scared-ghost')
			// }

			if(ghost.isScared && squares [ghost.currentIndex].classList.contains('pacman')) {
				squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
				ghost.currentIndex = ghost.startIndex
				squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
			}
			checkGameOver(ghost)
		}, ghost.speed)
	}
	// проверка на проигрыш
	function checkGameOver(ghost){
		if(pacmanCurentIndex == ghost.currentIndex && !squares[pacmanCurentIndex].classList.contains('scared-ghost')){
			ghosts.forEach(ghost => clearInterval(ghost.timerId))
			document.removeEventListener('keyup', movePacman)
			setTimeout(function(){ alert('Game Over!')}, 500)
		}
	}









})