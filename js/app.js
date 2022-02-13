/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let theGrid, theScore, gameOver, currentSnake, currentDirection, snakeHead, snakeTail, theTimer


/*------------------------ Cached Element References ------------------------*/
const gridEl = document.querySelector('.grid')
const scoreEl = document.querySelector('#theScore')
const displayTimer = document.querySelector('#displayTime')


/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
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

function init() {
  theGrid = new Array(289).fill(null)
  console.log(theGrid)
  theScore = 0
  gameOver = null
  currentSnake = [190, 191, 192, 193]
  snakeHead = currentSnake[-1]
  currentDirection = 1
  theTimer = 0
}
init()

function render(){
  //render a Snake by checking for a grid's ID to a currentSnake's element
  currentSnake.forEach(snakeCell => theGrid[snakeCell] = 'S')
  console.log(theGrid)
  theGrid.forEach((cell, idx) => {
    if (cell === 'S') {
      cellsEl[idx].className = 'snake'
    } else if (cell === 'F') {
      cellsEl[idx].className = 'fruit'
    }
  })
  //render fruit - can add as an else if for the above but have to style the array as an 'F' from a randomFruit generator function. Render has to be constant while game is in play
  //render score
  //render timer
}
render()

function moveSnake()
  snakeTail = currentSnake[0]
  currentSnake.pop(snakeTail)
  currentSnake.unshift(snakeHead+currentDirection)
//moveSnake function needs to work with the ticker to pop() the tail and unshift() the head
