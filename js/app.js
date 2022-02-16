/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let theGrid, theScore, gameOver, currentSnake, currentDirection, snakeHead, snakeTail, theTicker, timerIntervalId, currentFruit, min, sec, millisec, snakeBody, theSpeed, theWidth

/*------------------------ Cached Element References ------------------------*/
const gridEl = document.querySelector('.grid')
const scoreEl = document.querySelector('#theScore')
const displayTimer = document.querySelector('#displayTime')


/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
//create a grid for the snake to travel on
function createGridCells(){
  for (let i = 0; i <= 288; i++){
    const gridCell = document.createElement('div');
    gridCell.classList.add('cell');
    gridCell.id = 'cell' + i;
    gridCell.innerHTML = i;
    gridEl.appendChild(gridCell);
  }
}
createGridCells()

//anywhere under the createGridCells (maybe put that at the constant eventually), cache the cells as references
const cellsEl = document.querySelectorAll('.cell')

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
init()

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
  } else {
    currentSnake.pop();
    cellsEl[snakeTail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + currentDirection);
    console.log(currentSnake);
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


//create a timer to run and move the snake
function tickerEl(){
  if (timerIntervalId){
    theTicker = 0;
    clearInterval(timerIntervalId);
  }
  theSpeed = 500
  timerIntervalId = setInterval(tick, theSpeed);
}
tickerEl()


function tick(){
  console.log(theTicker);
  theTicker ++;
  moveSnake();
  renderSnake();
  hitWalls();
  hitSelf();
  console.log(currentSnake);
  console.log(currentSnake[0]);
  if (theTicker === 70 || gameOver === 1){
    clearInterval(timerIntervalId);
  }
  displayTimeElapsed()
  displayScore()
}
tick()

function displayTimeElapsed(){
  min = Math.floor(theTicker / 60);
  sec = theTicker % 60;
  millisec = theTicker / 1000;
  displayTimer.innerText = `${min}:${sec}`;
}


//Fruit generation 
//generate fruit function

function newFruitCell(){
  return Math.floor(Math.random() * (288 - 0)) + 0;
}
//only render the fruit if it is not part of the snake
function newFruit(){
  //currentFruit is in init function as 0, remove any fruit cell at the beginning so when called it can remove the previous one
  cellsEl[currentFruit].classList.remove('fruit');
  currentFruit = newFruitCell()
  if (currentSnake.includes(currentFruit)) {
      return newFruit();
    } else {
      cellsEl[currentFruit].classList.add('fruit')}
  console.log(currentFruit)
}
newFruit()

function getsFood(){
  //if the snakeHead === currentFruit, remove currentFruit and generate a new fruit. Call this function in the move snake function?
  if (currentSnake[0] === currentFruit){
    currentSnake.push(snakeTail);
    cellsEl[snakeTail].classList.add('snake');
    newFruit()
  }
}
//for now I will keep this getsFood function here as a reference and not call on it - but it is embedded in the moveSnake function so that we can make use of the snakeTail

//gameOver conditions
// if snakeHead === walls, if snakeHead === snakeBody
//gameOver = 1
//will have to use the width of the board since I only have access to the cells 
function hitWalls() {
  //first try it with direction === 1
  if (currentSnake[0] % theWidth === 16 && currentDirection === 1) {
    gameOver = 0
  }

  if (gameOver === 0){
    setTimeout(watchHitWalls, theSpeed);
  }
  //conditional for up
  if (currentSnake[0] - theWidth <= 0 && currentDirection === -theWidth && currentSnake.some(snakeCell => snakeCell === currentSnake[0] - theWidth)) {
    return currentSnake[0] + 
  }
  //conditional for down
  if (currentSnake[0] + theWidth >= 289 && currentDirection === theWidth){
    gameOver = 1
  }
  console.log('gameOver' + gameOver)
}

function watchHitWalls(){
  moveSnake();
  if (currentSnake[0] % theWidth === 0 && currentDirection === 1) 
    //code here the other direction conditions with ||
    {
    gameOver = 1
    cellsEl[snakeTail].classList.add('snake')
    } else {
      gameOver = null
    }
    console.log('realGameOver' + gameOver)
  }

  //hitSelf function is trying to loop through the snake from the second element to see if it hits itself
  //sometimes seems buggy but have to test it more. Other way is to check if the cell has classList snake
function hitSelf(){
  for (let i = 1; i <= currentSnake.length; i++){
    if (currentSnake[0] + currentDirection === currentSnake[i]){
      gameOver = 1
    }
    console.log('hitSelf' + gameOver)
  }
}

function displayScore(){
  theScore = currentSnake.length - 4;
  scoreEl.innerText = theScore
}