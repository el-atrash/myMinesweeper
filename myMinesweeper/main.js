var board = [];
var state = [];
var playing = true;

const CLEAR = 0,
      MINE = -1,
      STATE_CLOSED = 0,
      STATE_OPEN = 1;
      
const ROWS = 10, 
      COLS = 10,
      MINES = 10;

function inBounds(x, y){
    return x >= 0 && x < COLS 
        && y >= 0 && y < ROWS;
}

function deployMines(){
    var count = 0;
    do {
        var x = Math.floor(Math.random() * 10);
        var y = Math.floor(Math.random() * 10);
        if(board[x][y] != MINE){
            board[x][y] = MINE;
            count++;
        }
        
        } while (count < MINES);
}

function markAroundMines(){
    for(var x = 0; x < COLS; ++x){
        for(var y = 0; y < ROWS; ++y){
            if(board[x][y] == MINE){
                for(var dx = -1; dx <= 1; ++dx){
                    for(var dy = -1; dy <= 1; ++dy){
                        if(inBounds(x + dx, y + dy) && board[x + dx][y + dy] != MINE){
                            board[x + dx][y + dy]++;
                        }
                    }
                }
            }
        }
    }
}

function revealLoss(){
    for(var x = 0; x < COLS; ++x){
        for(var y = 0; y < ROWS; ++y){
            if(board[x][y] == MINE){
                state[x][y] = STATE_OPEN;
            }
        }
    }
    render();
}

function openBlock(x, y){
    
    if(board[x][y] == MINE){
        alert('Game Over!');
        playing = false;  
        revealLoss();
    }

    state[x][y] = STATE_OPEN;
    renderBlock(x,y);

    if(board[x][y] == CLEAR){
        for(var dx = -1; dx <= 1; ++dx){
            for(var dy = -1; dy <= 1; ++dy){
                var xx = x + dx,
                    yy = y + dy;
                if(inBounds(xx, yy)){
                    if(state[xx][yy] != STATE_OPEN){
                        openBlock(xx, yy);
                    }
                }
            }
        }
    }
}

function checkState(){
    var CLOSED_BLOCKS = 100;

    for(var x = 0; x < COLS; ++x){
        for(var y = 0; y < ROWS; ++y){
            CLOSED_BLOCKS-=state[x][y];
        }
    }
    
    if(CLOSED_BLOCKS == 10){
        
        playing = false;
        render();
        alert('You Won!');
    }  
}
      
function init(){
    for(var x = 0; x < COLS; ++x){
        board.push([]);
        state.push([]);
        for(var y = 0; y < ROWS; ++y){
            board[x].push(CLEAR);
            state[x].push(STATE_CLOSED);
        }
    }
    deployMines();
    markAroundMines();
}

init();




