const W = 400, H = 400;
const BLOCK_W = W / COLS,
      BLOCK_H = H / ROWS;

var color = ['blue', 'green', 'red', 'darkblue', 'darkred', 'aqua', 'black', 'grey'];

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var mineIcon = new Image();
mineIcon.src = 'images/mine-symbol.svg';

var flagIcon = new Image();
flagIcon.src = 'images/flag-symbol.svg';

function modelToView(x, y){
    return{
        x : x * BLOCK_W,
        y : y * BLOCK_H
    };
}

function viewToModel(x, y){
    return{
        x : Math.floor(x / BLOCK_W),
        y : Math.floor(y / BLOCK_H)
    };
}

function renderBlock(x, y){
    var viewCoords = modelToView(x, y);
    
    if(state[x][y] == STATE_CLOSED){
        if (playing == true){

            ctx.fillStyle = '#bbb';
            ctx.strokeStyle = 'black';
            ctx.fillRect(viewCoords.x, viewCoords.y, BLOCK_W, BLOCK_H);
            ctx.strokeRect(viewCoords.x, viewCoords.y, BLOCK_W, BLOCK_H);

        }
        else if(playing == false && board[x][y] == MINE){

            ctx.drawImage(flagIcon, viewCoords.x, viewCoords.y, 40, 40);

        }
    }

    else if (state[x][y] == STATE_OPEN){

        if(0 < board[x][y]){
            ctx.fillStyle = '#ccc';
            ctx.fillRect(viewCoords.x, viewCoords.y, BLOCK_W, BLOCK_H);
            ctx.fillStyle = color[board[x][y] - 1];
            ctx.font = '30px serif';
            ctx.fillText(board[x][y], viewCoords.x + 12, viewCoords.y + BLOCK_H - 10 );
            
        }
        else if(board[x][y] == CLEAR){
            ctx.fillStyle = '#ddd';
            ctx.fillRect(viewCoords.x, viewCoords.y, BLOCK_W, BLOCK_H);
        }
        else {
            ctx.fillStyle = 'black';
            ctx.fillRect(viewCoords.x, viewCoords.y, BLOCK_W, BLOCK_H);
            ctx.drawImage(mineIcon, viewCoords.x, viewCoords.y, 40, 40);
        }        
    }
    
} 

function render(){
    for(var x = 0; x < COLS; ++x){
        for(var y = 0; y < ROWS; ++y){
            renderBlock(x,y);
        }
    }
}

render();



