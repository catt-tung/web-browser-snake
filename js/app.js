/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let theGrid, theScore, gameOver, currentSnake, currentDirection, snakeHead, snakeTail, theTimer, timerIntervalId


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
  theGrid = new Array(289).fill(null)
  console.log(theGrid)
  theScore = 0
  gameOver = null
  currentSnake = [193, 192, 191, 190]

  currentDirection = 1
  theTimer = 0
}
init()

//create a render function to render the snake and fruit
function renderSnake(){
  //render a Snake by checking for a grid's ID to a currentSnake's element
  currentSnake.forEach(snakeCell => theGrid[snakeCell] = 'S')
  console.log(theGrid)
  theGrid.forEach((cell, idx) => {
    if (cell === 'S') {
      cellsEl[idx].classList = 'snake'
    // } else if (cell === null) {
    //   cellsEl[idx].className.remove('snake')
    }
  })
}
//create a timer to run and move the snake
function moveSnake(){
  snakeHead = currentSnake[0]
  snakeTail = currentSnake[currentSnake.length - 1]
  currentSnake.pop()
  cellsEl[snakeTail].classList.remove('snake')
  currentSnake.unshift(snakeHead + currentDirection)
  console.log(currentSnake)
}
//moveSnake function needs to work with the ticker to pop() the tail and unshift() the head

function timerEl(){
  if (timerIntervalId){
    theTimer = 0
    clearInterval(timerIntervalId)
  }
  timerIntervalId = setInterval(tick, 1000)
}
timerEl()

function tick(){
  console.log(theTimer)
  theTimer ++
  moveSnake()
  renderSnake()
  console.log(currentSnake)
  if (theTimer === 5){
    clearInterval(timerIntervalId)
  }
}
tick()

//check if something is crossing a snake so we can use it in rendering a new fruit and later with the gameOver for if the snake head hits the snake body 
function checkSnake(parameter){
  if (currentSnake.includes(parameter)) {
    return true
  }
}


//generate fruit function
//start with a random cell
function newFruitCell(){
  return Math.floor(Math.random() * (288 - 0)) + 0;
}

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
