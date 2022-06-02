/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let theGrid, theScore, gameOver, currentSnake, currentDirection, snakeHead, snakeTail, tickerIntervalId, currentFruit, min, sec, millisec, snakeBody, theSpeed, theWidth

// timerIntervalId, seconds, endTime, min, sec

let theTicker = 0

/*------------------------ Cached Element References ------------------------*/
const gridEl = document.querySelector('.grid')
const scoreEl = document.querySelector('#theScore')
const displayTimer = document.querySelector('#displayTime')
const resetBtn = document.querySelector('.reset')
const squaresEl = document.querySelector('#squaresTravelled')
const msgEl = document.getElementById('theMessage')
const up = document.getElementById('up')
const down = document.getElementById('down')
const left = document.getElementById('left')
const right = document.getElementById('right')

/*----------------------------- Event Listeners -----------------------------*/
resetBtn.addEventListener('click', clearGrid) 


/*-------------------------------- Functions --------------------------------*/
//create a grid for the snake to travel on
function createGridCells(){
  for (let i = 0; i <= 288; i++){
    const gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridCell.id = 'cell' + i;
    // gridCell.innerHTML = i;
    gridEl.appendChild(gridCell);
  }
}
createGridCells()

//anywhere under the createGridCells (maybe put that at the constant eventually), cache the cells as references
const cellsEl = document.querySelectorAll('.cell')

//a start game message
function gameMessage(){
  if (theTicker === 0) {
    msgEl.innerHTML = "Press space or any arrow key to start"
  } else if (gameOver === null) {
    msgEl.innerHTML = "Eat apples!"
  } else if (gameOver === 1) {
    msgEl.innerHTML = `You ate ${currentSnake.length - 4} apples while travelling ${theTicker} squares!`
  }
}
gameMessage()

//Any arrow key or spacebar to start function
document.addEventListener('keydown', (e) => {
  if (
    (gameOver === 1 || theTicker === 0) &&
    (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === ' ') 
    ) {
      startGame()
  }
})

function startGame() {
  clearGrid()
  init()
  tickerEl()
  tick()
  newFruit()
}

//create initialization function
function init() {
  theScore = 0;
  currentFruit = 0;
  gameOver = null; //gameOver will have null, 0, or 1
  currentSnake = [193, 192, 191, 190];
  currentDirection = 1;
  theTicker = 0;
  theWidth = 17;
}


//create a render function to render the snake 
function renderSnake(){
  //render a Snake by checking for a cell's ID to a currentSnake's element, add classlist of snake to it
  currentSnake.forEach(snakeCell => cellsEl[snakeCell].classList.add('snake'))
}

function moveSnake(){
  snakeHead = currentSnake[0];
  snakeTail = currentSnake[currentSnake.length - 1];
  if (currentSnake[0] === currentFruit){
    currentSnake.push(snakeTail);
    cellsEl[snakeTail].classList.add('snake');
    newFruit()
  } else if (currentSnake[0] - theWidth <= 0 && currentDirection === -theWidth) {
    currentSnake.pop();
    cellsEl[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + 272)
  } else if (currentSnake[0] % theWidth === 16 && currentDirection === 1){ 
    currentSnake.pop();
    cellsEl[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] - 16);
  } else if (currentSnake[0] + theWidth >= 289 && currentDirection === theWidth) { 
    currentSnake.pop();
    cellsEl[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] - 272);
  } else if (currentSnake[0] % theWidth === 0 && currentDirection === -1) { 
    currentSnake.pop();
    cellsEl[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + 16);
  } else {
    currentSnake.pop();
    cellsEl[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + currentDirection);
  }
}
//moveSnake function needs to work with the ticker to pop() the tail and unshift() the head

//event listeners for directional change
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && (currentDirection === -1 || currentDirection === 1)){
    currentDirection = -theWidth
  };
  if (event.key === 'ArrowDown' && (currentDirection === -1 || currentDirection === 1)){
    currentDirection = theWidth
  };
  if (event.key === 'ArrowLeft' && (currentDirection === -theWidth || currentDirection === theWidth)){
    currentDirection = -1
  };
  if (event.key === 'ArrowRight' && (currentDirection === -theWidth || currentDirection === theWidth)){
    currentDirection = 1
  }
})

//event listeners for directional change for mobile/on screen arrows
up.addEventListener("click", () => {
  if (currentDirection === -1 || currentDirection === 1) {
    currentDirection = -theWidth
  } else {
    return
  }
})

down.addEventListener("click", () => {
  if (currentDirection === -1 || currentDirection === 1) {
    currentDirection = theWidth
  } else {
    return
  }
})

left.addEventListener("click", () => {
  if (currentDirection === theWidth || currentDirection === -theWidth) {
    currentDirection = -1
  } else {
    return
  }
})

right.addEventListener("click", () => {
  if (currentDirection === theWidth || currentDirection === -theWidth) {
    currentDirection = 1
  } else {
    return
  }
})

//create a timer to run and move the snake
function tickerEl(){
  if (tickerIntervalId){
    theTicker = 0;
    clearInterval(tickerIntervalId);
  }
  theSpeed = 250
  tickerIntervalId = setInterval(tick, theSpeed);
}

function tick(){
  theTicker ++;
  moveSnake();
  renderSnake();
  increaseSpeed();
  hitSelf();
  if (gameOver === 1){
    clearInterval(tickerIntervalId);
    gameOver = 1;
    resetBtn.removeAttribute("hidden");
  }
  displayTravel();
  displayScore();
  gameMessage();
}

//display squares travelled and the score
function displayTravel(){
  squaresEl.innerText = theTicker
}

function displayScore(){
  theScore = currentSnake.length - 4;
  scoreEl.innerText = theScore
}

//generate fruit function
function newFruitCell(){
  return Math.floor(Math.random() * (288 - 0)) + 0;
}
//only render the fruit if it is not part of the snake
function newFruit(){
  //currentFruit is in init function as 0, remove any fruit cell at the beginning so when called it can remove the previous one
  cellsEl[currentFruit].classList.remove('fruit');
  currentFruit = newFruitCell()
  if (currentFruit === 0){
    return newFruit();
  } else if (currentSnake.includes(currentFruit)) {
      return newFruit();
  } else {
      cellsEl[currentFruit].classList.add('fruit')}
}

  //hitSelf function is trying to loop through the snake from the second element to see if it hits itself
  //sometimes seems buggy (think there is a delay when it actually renders) Other way is to check if the cell has classList snake but will probably have the same problem
function hitSelf(){
  for (let i = 1; i <= currentSnake.length; i++){
    if (currentSnake[0] === currentSnake[i]){
      gameOver = 1
    }
  }
}

function clearGrid(){
  for (let i = 0; i <= 288; i++){
    cellsEl[i].classList.remove('snake', 'fruit')
  }
  squaresEl.innerText = "0"
  scoreEl.innerText = "0"
  theTicker = 0
  gameMessage()
  resetBtn.setAttribute("hidden", true)
}

//function to increase the speed every 100 squares travelled until 50
function increaseSpeed(){
  if (theTicker > 0 && theSpeed > 30 && theTicker % 100 === 0){
    theSpeed = theSpeed - 10
  } else if (theSpeed === 30) {
    return
  }  
}


