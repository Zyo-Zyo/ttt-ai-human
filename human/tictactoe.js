
// I think a neater way will be to have one.
// IE: xTurn is true then X false O.
var xTurn = false;
var oTurn = false;
var winner = "";
var spotTaken = [[-1,-1,-1],[-1,-1,-1],[-1,-1-1]];
var spotsRemaining = 9;
var gameActive = false;
//var playButton = document.getElementById("play"); //disabled = true;
var _listener = function(){
    var point = getCursorPosition(canvas, event);
    if(gameActive){
      draw(point[0],point[1]);
    }
    if(gameActive && endGame()){
      // endGame() already called to do test.
      // endGame() calls win() to determine winner
      // deactivate game
      gameActive = false;
      // deactivateListener however, suspect it's not working
      // Hence testing for gameActive first, because if it
      // returns false it will not test endGame() and not print
      // who the winner is again... work around for the event listener
      // not working ...
      deactivateListener();
      enablePlayButton();
    }
}

function load(){
  clearBoard();
  drawBoard();
  activateListener();
}

function playButton(){
  if(gameActive == false){
    resetSpotTaken();
    clearBoard();
    drawBoard();
    // for now X always goes first
    xTurn = true;
    oTurn = false;
    gameActive = true;
    winner = "";
    printWinner(winner);
    disablePlayButton();
    //activateListener();
  }
}

function enablePlayButton(){
  document.getElementById("play").disabled = false;
}

function disablePlayButton(){
  document.getElementById("play").disabled = true;
}

function activateListener(){
  const canvas = document.querySelector('canvas');
  canvas.addEventListener('mousedown', _listener);
}

/*
 * This doesn't seem to work correclty I suspect
 * It's because the events do not belong to
 * eachother, but why -- the canvas? No idea.
 */
function deactivateListener(){
  const canvas = document.querySelector('canvas');
  canvas.removeEventListener('mousedown', _listener, true);
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y);
    var point = [x, y];
    return point;
}

function resetSpotTaken(){
  for(i = 0; i < spotTaken.length; i++){
    for(j = 0; j < 3; j++){
      spotTaken[i][j] = -1;
    }
  }
  spotsRemaining = 9;
}

function clearBoard(){
  this.canvas = document.getElementById('display');
  this.context = this.canvas.getContext('2d');
  this.context.font = "bold 12px Arial";
  this.context.clearRect(0, 0, 500, 500);
}

function drawBoard(){
  // get the canvas
  var canvas = document.getElementById('display');
  // create canvas rendering context
  var ctx = canvas.getContext('2d');
  // get canvas dementions
  var width = canvas.width;
  var height = canvas.height;
  // start to draw out the lines
  ctx.beginPath();
  // leftmost vertical line
  ctx.moveTo(width/3,0);
  ctx.lineTo(width/3,height);
  // rightmost vertical line
  ctx.moveTo((width/3)*2,0);
  ctx.lineTo((width/3)*2,height);
  // top horizontal line
  ctx.moveTo(0,height/3);
  ctx.lineTo(width,height/3);
  // bottom horizontal line
  ctx.moveTo(0,(height/3)*2);
  ctx.lineTo(width,(height/3)*2);
  // draw
  ctx.stroke();
}

function draw(x,y){
  // find the row
  var row = findRow(y);
  // find the column
  var col = findCol(x);
  // are we drawing an X or O
  var x_o = "";
  if(xTurn){
    x_o = "X";
    oTurn = true;
    xTurn = false;
  }else if (oTurn){
    x_o = "O";
    xTurn = true;
    oTurn = false;
  }
  if(spotAvailable(row,col)){
    spotTaken[row-1][col-1] = x_o;
    spotsRemaining -= 1;
  }else{
    // throw an error saying illegal turn.
    return;
  }

  // get the canvas ...
  var canvas = document.getElementById('display');
  // get the canvas rendering
  var ctx = canvas.getContext('2d');
  // start
  ctx.beginPath();
  // font stuff
  ctx.font = "70px Arial";

  if(col===1){
    if(row===1){
      ctx.fillText(x_o,56,110);
      return;
    }
    if(row===2){
      ctx.fillText(x_o,56,275);
      return;
    }
    if(row===3){
      ctx.fillText(x_o,56,430);
      return;
    }

  }

  if(col===2){
    if(row===1){
      ctx.fillText(x_o,225,110);
      return;
    }
    if(row===2){
      ctx.fillText(x_o,225,275);
      return;
    }
    if(row===3){
      ctx.fillText(x_o,225,430);
      return;
    }
  }

  if(col===3){
    if(row===1){
      ctx.fillText(x_o,385,110);
      return;
    }
    if(row===2){
      ctx.fillText(x_o,385,275);
      return;
    }
    if(row===3){
      ctx.fillText(x_o,385,430);
    }
  }
  //console.log("In draw() x: " + x + " y: " + y);
}

function findRow(y){
  if(y<165){
    //console.log("findRow(): 1");
    return 1;
  }
  if(y>164 && y<330){
    //console.log("findRow(): 2");
    return 2;
  }
  if(y>329){
    //console.log("findRow(): 3");
    return 3;
  }
}

function findCol(x){
  if(x < 165){
    //console.log("findCol(): 1");
    return 1;
  }
  if(x>164 && x<330){
    //console.log("findCol(): 2");
    return 2;
  }
  if(x>329){
    //console.log("findCol(): 3");
    return 3;
  }
}

function spotAvailable(row,col){
  return (spotTaken[row-1][col-1] === -1);
}

function endGame(){
  if(win()){
    console.log("The winner is: " + winner);
    printWinner(winner);
    gameActive = false;
    return true;
  }
  if(spotsRemaining < 1){
    winner = "TIE";
    console.log("IT'S A TIE!");
    printWinner(winner);
    gameActive = false;
    return true;
  }
  return false;
}

function printWinner(winner){

  var winneris = "";
  if(winner === "TIE"){
    winneris = "IT'S A TIE, TRY AGAIN!"
  }else if(winner === ""){
    winneris = "";
  }else{
    winneris = winner + " IS THE WINNER!";
  }
  document.getElementById("winner").innerHTML = winneris;
}

function win(){
  // This is just a not smart 'is there a winner'
  // will add WHO the winner is after.
  // There are 3 main ways to win
  // 1: all the same in a row
  // 2: all the same in a col
  // 3: all the same in a diag

  if(checkRows()){
    return true;
  }
  if(checkCols()){
    return true;
  }
  if(checkDiags()){
    return true;
  }
  else{
    return false;
  }
}

function checkRows(){
  var result = false;
  for(i = 0; i < spotTaken.length; i++){
    if(spotTaken[i][0] == -1 || spotTaken[i][1] == -1 || spotTaken[i][2] == -1){
      result = false;
    }else{
      result = ((spotTaken[i][0] === spotTaken[i][1]) &&
                (spotTaken[i][0] === spotTaken[i][2]));
    }
    if(result){
      winner = spotTaken[i][0];
      break;
    }
  }
  return result;
}

function checkCols(){
  var result = false;
  for(i = 0; i < spotTaken.length; i++){
    if(spotTaken[0][i] == -1 || spotTaken[1][i] == -1 || spotTaken[2][i] == -1){
      result = false;
    }else{
      result = ((spotTaken[0][i] === spotTaken[1][i]) &&
                (spotTaken[0][i] === spotTaken[2][i]));
    }
    if(result){
      winner = spotTaken[0][i];
      break;
    }
  }
  return result;
}

function checkDiags(){
  var result = false;
  // Top left / bottom right diag test
  if(spotTaken[0][0] == -1 || spotTaken[1][1] == -1 || spotTaken[2][2] == -1){
     result = false;
  }else{
     result = ((spotTaken[0][0] === spotTaken[1][1]) &&
               (spotTaken[0][0] === spotTaken[2][2]));
  }
  if(result){
    winner = spotTaken[0][0];
    return result;
  }

  // Top right / bottom left diag test
  if(spotTaken[0][2] == -1 || spotTaken[1][1] == -1 || spotTaken[2][0] == -1){
     result = false;
  }else{
     result = ((spotTaken[0][2] === spotTaken[1][1]) &&
               (spotTaken[0][2] === spotTaken[2][0]));
  }
  if(result){
    winner = spotTaken[0][2];
  }
  return result;
}
