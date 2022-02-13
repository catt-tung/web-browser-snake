/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
function createGrid(){
  const theGrid = document.querySelector(".grid")
  for (let i = 0; i <= 288; i++){
    const gridCell = document.createElement('div');
    gridCell.className = 'cell';
    gridCell.id = 'cell' + i;
    // gridCell.innerHTML = i
    theGrid.appendChild(gridCell);
  }
}
createGrid()