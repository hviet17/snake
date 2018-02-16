var direction = 'right';
var scores = 0;
var moveTheSnake;
function spawnBait(){
	var pos = Math.floor(Math.random() * 100);
	var squares = document.querySelectorAll('#board .row>div');
	while (squares[pos].classList.contains('snake','bait')){
		pos = Math.floor(Math.random() * 10);
	}
	squares[pos].classList.add('bait');
}
function checkKey(e){
	e = e || window.event;
    	if (e.keyCode == '38') {
		if (direction == 'down') return;
        	direction = 'up';
    	}
    	else if (e.keyCode == '40') {
		if (direction == 'up') return;
        		direction = 'down';
    	}
   	 else if (e.keyCode == '37') {
		if (direction == 'right') return;
     		direction = 'left';
    	}
    	else if (e.keyCode == '39') {
		if (direction == 'left') return;
       		direction = 'right';
    	}
}
function getIndex(element){
	var parent = element.parentElement;
	var squares  = parent.childNodes;
	for(var i = 0; i< squares.length; i++){
		if(squares[i] === element) return i;
	}
	return '';
}
function moveSnake (){
	try {
		var snake = document.querySelectorAll('div.snake');
		var head = document.querySelector('div.snake[data-i="0"]');
		var bait = document.querySelector('div.bait');
		var currentRow = head.parentElement;
		var index = getIndex(document.querySelector('div.snake[data-i="0"]')); 

		var nextRow;
		head.classList.remove('head');
		if (direction == 'up'){
			nextRow = currentRow.previousElementSibling || document.querySelector('#board .row:last-child');
			nextRow.querySelectorAll('div')[index ].classList.add('snake');
			nextRow.querySelectorAll('div')[index ].dataset.i = 0;
		}
		else if (direction == 'down'){
			nextRow = currentRow.nextElementSibling || document.querySelector('#board .row:first-child');
			nextRow.querySelectorAll('div')[index ].classList.add('snake');
			nextRow.querySelectorAll('div')[index ].dataset.i = 0;
		}
		else if (direction == 'left'){
			index = index > 0 ? (index -1) : currentRow.querySelectorAll('div.row div').length - 1;
			currentRow.querySelectorAll('div')[index].classList.add('snake');
			currentRow.querySelectorAll('div')[index].dataset.i = 0;
		}
		else if (direction == 'right'){
			index = index < currentRow.querySelectorAll('div.row div').length - 1 ? (index +1) : 0;
			currentRow.querySelectorAll('div')[index].classList.add('snake');
			currentRow.querySelectorAll('div')[index].dataset.i = 0;
		}
		for (var i = 0; i<snake.length; i++){
			snake[i].dataset.i = parseInt(snake[i].dataset.i) + 1;
		}

		if (bait.dataset.i == 0){
			scores++;
			bait.classList.remove('bait');
			spawnBait();
		}else{
			document.querySelector('div.snake[data-i="'+snake.length+'"]').classList.remove('snake');
		}
	}catch(e){
		alert('Game Over! Your Scores: ' + scores);
		clearInterval(moveTheSnake);
	}
}
function initBoard(){
	var board = '';
	for (var i = 0; i < 10; i++){
		board += '<div class="row">';
		for (var j = 0;j <10; j++){
			if (i == 0 && j <2){
				board += '<div class="snake" data-i="'+(j%2?0:1)+'"></div>';
			}else{
				board += '<div></div>';
			}
		}	
		board += '</div>';
	}
	document.getElementById('board').innerHTML = board;	
	spawnBait();
	document.onkeydown = checkKey;
	moveSnake();
	moveTheSnake = setInterval(moveSnake, 300);
}