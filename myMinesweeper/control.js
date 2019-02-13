var MOUSE_LEFT = 1,
    MOUSE_RIGHT = 3;

canvas.addEventListener('click', function (e) {

    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    var modelCoords = viewToModel(x, y);

    document.getElementById('position').innerHTML = '[X : ' + x + '][Y : ' + y + ']';

    document.getElementById('modPosition').innerHTML = '[X : ' + modelCoords.x + '][Y : ' + modelCoords.y + ']';

    if (playing == false) {
        return;
    }
    
    openBlock(modelCoords.x, modelCoords.y);
    checkState();
    
    return false;


});

canvas.addEventListener('contextmenu', function(e){
    e.preventDefault();
    return false;
})

var btn = document.getElementById('restart');
btn.addEventListener('click', function(){
    board = [];
    state = [];
    playing = true;
    init();
    render();
})
