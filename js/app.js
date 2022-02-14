/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let theGrid, theScore, gameOver, currentSnake, currentDirection, snakeHead, snakeTail, theTimer, timerIntervalId, currentFruit

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
    gridCell.className = 'cell';
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
  currentSnake.forEach(snakeCell => cellsEl[snakeCell].classList = 'snake')
}

function moveSnake(){
  snakeHead = currentSnake[0];
  snakeTail = currentSnake[currentSnake.length - 1];
  currentSnake.pop();
  cellsEl[snakeTail].classList.remove('snake');
  currentSnake.unshift(snakeHead + currentDirection);
  console.log(currentSnake);
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
  if (theTimer === 6){
    clearInterval(timerIntervalId);
  }
}
tick()

//Fruit generation 
//check if cells are available
function checkSnake(parameter){
  if (currentSnake.includes(parameter)) {
    return true
  }
}


//generate fruit function

function newFruitCell(){
  return Math.floor(Math.random() * (288 - 0)) + 0;
}

function newFruit(){
  //currentFruit is in init function as 0, remove any fruit cell at the beginning so when called it can remove the previous one
  cellsEl[currentFruit].classList.remove('fruit');
  currentFruit = newFruitCell()
  if (currentSnake.includes(currentFruit)) {
      return newFruit();
    } else {
      cellsEl[currentFruit].classList = 'fruit'}
  console.log(currentFruit)
}
newFruit()


//only render the fruit if it is not already part of the snake
function renderNewFruit(){
  let currentFruit = newFruitCell()
  while (checkSnake(currentFruit) !== true){
    cellsEl[currentFruit].className = 'fruit'
  }
}

function getsFood(){
  //if the snakeHead === currentFruit, remove currentFruit and generate a new fruit. Call this function in the move snake function? Or push the tail on 
}
