document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const width = 28
	let score = 0

//карта пакмана
	var layout = [
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
		4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
		1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
		1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
		1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
		1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
		1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
		1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
		1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
		1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
		1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
		1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
		1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
	]


	const squares = []

	//Legend
	// 0 - точки Pacman'а
	// 1 - стена
	// 2 - логово приведении
	// 3 - энергетическая гранула
	// 4 - пусто

	function createBoard(){
		for(let i = 0; i < Object.keys(layout).length; i++){
			const square = document.createElement('div')
			grid.appendChild(square)
			squares.push(square)

			
			if(layout[i] == 0){
				squares[i].classList.add('pac-dot')
			}
			else if(layout[i] == 1){
				squares[i].classList.add('wall')
			}
			else if(layout[i] == 2){
				squares[i].classList.add('ghost-lair')
			}
			else if(layout[i] == 3){
				squares[i].classList.add('power-pellet')
			}
		}
	}
	createBoard()

	//начальное позиция пакмана

	let pacmanCurentIndex = 490

	squares[pacmanCurentIndex].classList.add("pacman")

	//движение пакмана

	function movePacman(e){

		squares[pacmanCurentIndex].classList.remove("pacman")

		switch(e.keyCode){
			case 37:
				if(pacmanCurentIndex % width !== 0 && !squares[pacmanCurentIndex -1].classList.contains('wall') && !squares[pacmanCurentIndex -1].classList.contains('ghost-lair') )	pacmanCurentIndex -=1

				//проверка, находится ли пакман у левого выхода
				if((pacmanCurentIndex -1) == 363){
					pacmanCurentIndex = 391		
				}

				break
			case 38:
				if(pacmanCurentIndex - width >= 0 && !squares[pacmanCurentIndex -width].classList.contains('wall') && !squares[pacmanCurentIndex -width].classList.contains('ghost-lair')) pacmanCurentIndex -= width

				break
			case 39:
				if(pacmanCurentIndex % width < width - 1 && !squares[pacmanCurentIndex +1].classList.contains('wall') && !squares[pacmanCurentIndex +1].classList.contains('ghost-lair')) pacmanCurentIndex += 1
				
				//проверка, находится ли пакман у правого выхода
				 if((pacmanCurentIndex +1) == 392){
					pacmanCurentIndex = 364		
				}

				break
			case 40:
				if(pacmanCurentIndex + width < width * width && !squares[pacmanCurentIndex +width].classList.contains('wall') && !squares[pacmanCurentIndex +width].classList.contains('ghost-lair')) pacmanCurentIndex += width
				break
		}

		squares[pacmanCurentIndex].classList.add('pacman')

		pacDotEaten()
		powerPelletEaten()
		checkWin()


	}
	document.addEventListener("keyup", movePacman)

	function pacDotEaten(){
		if(squares[pacmanCurentIndex].classList.contains('pac-dot')){
			score++
			scoreDisplay.innerHTML = score
			squares[pacmanCurentIndex].classList.remove('pac-dot')
		}
	}

function powerPelletEaten(){
	if(squares[pacmanCurentIndex].classList.contains('power-pellet')){
		ghosts.forEach(ghost => ghost.isScared = true)
		setTimeout(unScaredGhosts, 10000)
		squares[pacmanCurentIndex].classList.remove('power-pellet')
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
ghosts.forEach(ghost => {
	squares[ghost.currentIndex].classList.add(ghost.className)
	squares[ghost.currentIndex].classList.add('ghost')
})

//рандомное движение привидении
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost){
	const directions = [-1, +1, width, -width]
	let direction = directions[Math.floor(Math.random() * directions.length)]

	ghost.timerId = setInterval(function(){
		if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
			squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
			ghost.currentIndex += direction
			squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
		}
		else direction = directions[Math.floor(Math.random()* directions.length)]

		if(ghost.isScared){
			squares[ghost.currentIndex].classList.add('scared-ghost')
		}

		if(ghost.isScared && squares [ghost.currentIndex].classList.contains('pacman')) {
			squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
			ghost.currentIndex = ghost.startIndex
			squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
		}
		
		checkGameOver()
	}, ghost.speed)
}
// проверка на проигрыш
function checkGameOver(){
	if(squares[pacmanCurentIndex].classList.contains('ghost') && !squares[pacmanCurentIndex].classList.contains('scared-ghost')){
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		document.removeEventListener('keyup', movePacman)
		setTimeout(function(){ alert('Game Over!')}, 500)
	}
}
// проверка на выигрыш
function checkWin(){
	if (score == 234){
		ghosts.forEach(ghost => clearInterval(ghost.timerId))
		document.removeEventListener('keyup',movePacman)
		setTimeout(function(){ alert('You Win!')}, 500)
	}
}







})