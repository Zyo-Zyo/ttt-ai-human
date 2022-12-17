const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')
const title = document.querySelector('.title')
title.innerHTML = 'Impossible to Win Tic-Tac-Toe'
const restartBtn = document.querySelector('.restart-btn')
const startBtn = document.querySelector('.start-btn')
const boxWidth = 93.33
const boxHeight = 93.33
let game_board  = initial_state()
let gameOver = false
canvas.style.display = 'none'
const X = 'X'
const O = 'O'
let moves = []
let user 

// layout of clickable game areas
const rects=[{x:0, y:0, width:93.33, height:93.33, position: [0,0]},
             {x:103.33, y:0, width:93.33, height:93.33, position: [0,1]}, 
             {x:203.33, y:0, width:93.33, height:93.33, position: [0,2]},
             {x:0, y:103.33, width:93.33, position: [1,0], height:93.33}, 
             {x:103.33, y:103.33, width:93.33, height:93.33, position: [1,1]}, 
             {x:203.33, y:103.33, width:93.33, height:93.33, position: [1,2]},
             {x:0, y:203.33, width:93.33, height:93.33, position: [2,0]}, 
             {x:103.33, y:203.33, width:93.33, height:93.33, position: [2,1]}, 
             {x:203.33, y:203.33, width:93.33, height:93.33, position: [2,2]}]


function collides(rects, x, y){
// check where tic tac toe board clicked
    let isCollision = false;
    for(let i=0; i < rects.length; i++){
        const left = rects[i].x, right = rects[i].x + rects[i].width
        const top = rects[i].y, bottom = rects[i].y + rects[i].height
        if (right >= x && left <=x && bottom >=y && top <=y ){
            isCollision = rects[i]
        }
    }
    return isCollision
}

function createBoard(){
// create empyt board
    canvas.style.display = 'flex'
    context.fillStyle = '#3D5A80'
    context.fillRect(0,0,canvas.width, canvas.height)
    for(let i=0; i < rects.length; i++){
        context.fillStyle = "rgba(255, 255, 255, 0)";
        context.fillRect(rects[i].x, rects[i].y, rects[i].width, rects[i].height)
    }
    context.fillStyle = '#293241'
    context.fillRect(0, 93.33, 300, 10)
    context.fillRect(0, 193.33, 300, 10)
    context.fillRect(93.33, 0, 10, 300)
    context.fillRect(193.33, 0, 10, 300)
    

}


function drawPlayer(board, rect) {
// draw X or O on board
        if (player(board) === X ? context.fillStyle = '#EE6C4D' :context.fillStyle = '#98C1D9')
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "72px Verdana"
        context.fillText(player(board), (rect.x + boxWidth/2), (rect.y +5+ boxHeight/2))
}



function initial_state() {
// Returns starting state of board
    return [['EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY']]
}
 

function player(board) {
    // returns player who has the next turn on a board
    const x_count = board.reduce(function(a,b) { return a.concat(b) }).filter(player => player === X).length 
    const o_count = board.reduce(function(a,b) { return a.concat(b) }).filter(player => player === O).length 

    if (x_count === 0 && o_count === 0){
        return X
    }
    else if (x_count > o_count) {
        return O
    } else {
        return X
    }
}

function actions(board) {
    // returns set of all possible actions (i, j) available on the board
    const moves = []
    for (let i=0; i < 3; i++){
        for (let j=0; j < 3; j++){
            if (board[i][j] == 'EMPTY'){
                moves.push([i,j])
            }
        }
    }
    return moves
}

function result(board, action) {
    // returns the board that results from making move (i, j) on the board
    const newBoard = board.map(function(arr) {
        return arr.slice()
    })
    newBoard[action[0]][action[1]] = player(board)
    return newBoard
}

function resultOppositePlayer(board, action) {
    // returns the board that results from making move (i, j) on the board
    if (player(board) === X){
        let current_player = O
    } else {
        current_player = X
    }
    const newBoard = board.map(function(arr) {
        return arr.slice()
    })
    newBoard[action[0]][action[1]] = current_player
    return newBoard
}


function winner(board) {
// Returns the winner of the game, if there is one.
if ((board[0][0] === X && board[1][1] === X && board[2][2] === X) ||
    (board[0][2] === X && board[1][1] === X && board[2][0] === X) ||
    (board[0][0] === X && board[0][1] === X && board[0][2] === X) ||   
    (board[1][0] === X && board[1][1] === X && board[1][2] === X) ||
    (board[2][0] === X && board[2][1] === X && board[2][2] === X) ||     
    (board[0][0] === X && board[1][0] === X && board[2][0] === X) ||
    (board[0][1] === X && board[1][1] === X && board[2][1] === X) ||     
    (board[0][2] === X && board[1][2] === X && board[2][2] === X))
    {
        return X
    } else if (
    (board[0][0] === O && board[1][1] === O && board[2][2] === O) ||
    (board[0][2] === O && board[1][1] === O && board[2][0] === O) ||
    (board[0][0] === O && board[0][1] === O && board[0][2] === O) ||   
    (board[1][0] === O && board[1][1] === O && board[1][2] === O) ||
    (board[2][0] === O && board[2][1] === O && board[2][2] === O) ||     
    (board[0][0] === O && board[1][0] === O && board[2][0] === O) ||
    (board[0][1] === O && board[1][1] === O && board[2][1] === O) ||     
    (board[0][2] === O && board[1][2] === O && board[2][2] === O)        
    ){
        return O
    } else {
        return null
    }
}

function terminal(board){
    //  Returns True if game is over, False otherwise.
    const moves_left = board.reduce(function(a,b) { return a.concat(b) }).filter(item => item === 'EMPTY').length ? true : false
    if (winner(board) === X || winner(board) === O || moves_left === false) {
        return true
    } else {
        return false
    }
}

function utility(board){
    // returns 1 is X has won the game, -1 if O has won, 0 otherwise
    if (winner(board) === X){
        return 1
    } else if (winner(board) === O){
        return -1
    } else {
        return 0
    }
}


startBtn.addEventListener('click', () => {
    user = X
    startBtn.style.display = 'none'
    title.innerHTML = `${player(game_board)}'s turn`
    createBoard()

})


restartBtn.addEventListener('click', () => {
    game_board = initial_state()
    createBoard()
    gameOver = false
    restartBtn.style.display = 'none'
    title.innerHTML = `${player(game_board)}'s turn`

})

function bestMove(board) {
    let bestScore = Infinity
    let moves = actions(board)
    let move
    for (let i = 0; i < moves.length; i++){
        let score = minmax(result(board, moves[i]), 0, true)
        if (score < bestScore){
            bestScore = score
            move = moves[i]
        }
        
    }
    return move          
}

function minmax(board, depth, isMaximizing) {
    let finalMove = terminal(board)
    if (finalMove) {
        return utility(board)
    }

    if (isMaximizing) {
        let bestScore = -Infinity
        let moves = actions(board)
        for (let i = 0; i < moves.length; i++){
            let score = minmax(result(board, moves[i]), depth+1, false)
            bestScore = Math.max(score,bestScore)
        }
    return bestScore
    } else {
        let bestScore = Infinity
        let moves = actions(board)
        for (let i = 0; i < moves.length; i++){
            let score = minmax(result(board, moves[i]), depth+1, true)
            bestScore = Math.min(score,bestScore)
        }
    return bestScore

    }
}

function CheckGameOver(board) {
// If gameover display winner and show restart button
     if (terminal(board)){
                gameOver = true
                actions(board).length > 0 ? title.innerHTML =`Winner is ${winner(board)}` :
                title.innerHTML ='Game Over. Tie.'
                gameOver = true
                restartBtn.style.display='block'
            }
}





canvas.addEventListener('click', function(e) {
    const rect = collides(rects, e.offsetX, e.offsetY)
    let currentPlayer = player(game_board)
    if (rect && currentPlayer === user){
        if (game_board[rect.position[0]][rect.position[1]] === 'EMPTY' && !gameOver) {
            drawPlayer(game_board, rect)
            game_board = result(game_board, rect.position)
            console.log(player(game_board))
            title.innerHTML = `${player(game_board)}'s turn`
            CheckGameOver(game_board)
            currentPlayer =player(game_board)
            if(currentPlayer === O && !gameOver){
                let ai_move = bestMove(game_board)
                let aiRect = null
                for (let i = 0; i < rects.length; i++){
                    if (rects[i].position[0] == ai_move[0] && rects[i].position[1] == ai_move[1]){
                        aiRect = rects[i]
                    }
                }     
                setTimeout(()=>{
                    drawPlayer(game_board, aiRect)
                    game_board= result(game_board, ai_move)
                    title.innerHTML = `${player(game_board)}'s turn`
                    CheckGameOver(game_board)

                
                }
                , 500)
                // title.innerHTML = `${player(game_board)}'s turn`
                currentPlayer = X
            }
        }

    } else {
     
    }
}, false)



         