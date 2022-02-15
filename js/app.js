/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let theGrid, theScore, gameOver, currentSnake, currentDirection, snakeHead, snakeTail, theTimer, timerIntervalId, currentFruit, min, sec, millisec

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
    // console.log(gridEl.id)
  }
}
createGridCells()

//anywhere under the createGridCells (maybe put that at the constant eventually), cache the cells as references
const cellsEl = document.querySelectorAll('.cell')
console.log(cellsEl)

//create initialization function
function init() {
  theScore = 0;
  currentFruit = 0;
  gameOver = null;
  currentSnake = [193, 192, 191, 190];
  currentDirection = 1;
  theTimer = 0;
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
    currentSnake.unshift(snakeHead + currentDirection);
    console.log(currentSnake);
  }
}
//moveSnake function needs to work with the ticker to pop() the tail and unshift() the head

//create a timer to run and move the snake
function timerEl(){
  if (timerIntervalId){
    theTimer = 0;
    clearInterval(timerIntervalId);
  }
  timerIntervalId = setInterval(tick, 1000);
}
timerEl()

function tick(){
  console.log(theTimer);
  theTimer ++;
  moveSnake();
  renderSnake();
  console.log(currentSnake);
  if (theTimer === 8){
    clearInterval(timerIntervalId);
  }
  displayTimeElapsed()
}
tick()

function displayTimeElapsed(){
  min = Math.floor(theTimer / 60);
  sec = theTimer % 60;
  millisec = theTimer / 1000;
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
