//Get canvas element and set it to 2D
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
//Set tiles size
var tile_width = c.width/9;
var tile_height = c.height/9;
//Variables
var row = 0, col = 0, path = [], solved = false, num = 1, iszero = false;

//Sudoku array variable
var sudokuField = [[5,3,0,0,7,0,0,0,0],
                   [6,0,0,1,9,5,0,0,0],
                   [0,9,8,0,0,0,0,6,0],
                   [8,0,0,0,6,0,0,0,3],
                   [4,0,0,8,0,3,0,0,1],
                   [7,0,0,0,2,0,0,0,6],
                   [0,6,0,0,0,0,2,8,0],
                   [0,0,0,4,1,9,0,0,5],
                   [0,0,0,0,8,0,0,7,9]];

function drawSudokuField() {
    //Clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    //Draw the case
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "black";
    ctx.moveTo(0,0);
    ctx.lineTo(c.width, 0);
    ctx.lineTo(c.width, c.height);
    ctx.lineTo(0, c.height);
    ctx.lineTo(0,0);
    ctx.stroke();
    //Draw vertical lines
    var help = 1;
    for(i = 0; i < 8; i++) {
        if(help != 3 && help != 6) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.moveTo(help * tile_width, 0);
            ctx.lineTo(help * tile_width, c.height);
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.moveTo(help * tile_width, 0);
            ctx.lineTo(help * tile_width, c.height);
            ctx.stroke();
        }
        help += 1;
    }
    //Draw horizontal lines
    var help = 1;
    for(i = 0; i < 8; i++) {
        if(help != 3 && help != 6) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.moveTo(0, help * tile_height);
            ctx.lineTo(c.width, help * tile_height);
            ctx.stroke();
        }
        else {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.moveTo(0, help * tile_height);
            ctx.lineTo(c.width, help * tile_height);
            ctx.stroke();
        }
        help += 1;
    }
    //Numbers
    ctx.font = "30px Arial";
    for(var i = 0; i < sudokuField.length; i++)
        for(var j = 0; j < sudokuField[i].length; j++)
            if(sudokuField[i][j] != 0)
                ctx.fillText(sudokuField[i][j], j * tile_width + 5, i * tile_height + 30);
}
function solveSudokuField() {
    if(row >= 9){
        solved = true;
        console.log("SOLVED");
    }
    if(solved == false){
        if(sudokuField[row][col] == 0 || iszero == true){
            sudokuField[row][col] = num;
            drawSudokuField();
            if(checkRow(row, col) && checkCol(row, col) && checkBox(row, col)){
                iszero = false;
                path.push([row, col, num]);
                num = 1;
                next();
            }
            else if(num == 9){
                iszero = true;
                backtrack();
            }
            else{
                iszero = true;
                num += 1;
            }
        }
        else{
            next();
        }
        sleep(0);
    }
}

function checkRow(row, col) {
    for(var i = 0; i < sudokuField[row].length; i++){
        if(col != i){
            if(sudokuField[row][i] == sudokuField[row][col])
                return false;
        }
    }
    return true;
}
function checkCol(row, col) {
    for(var i = 0; i < sudokuField.length; i++){
        if(row != i){
            if(sudokuField[i][col] == sudokuField[row][col])
                return false;
        }
    }
    return true;
}
function checkBox(row, col) {
    for(var i = Math.floor(row/3) * 3; i < Math.floor(row/3) * 3 + 3; i++){
        for(var j = Math.floor(col/3) * 3; j < Math.floor(col/3) * 3 + 3; j++){
            if(row != i && col != j){
                if(sudokuField[i][j] == sudokuField[row][col])
                    return false;
            }
        }
    }
    return true;
}

function next() {
    if(col < 8)
        col += 1;
    else{
        col = 0;
        row += 1;
    }
}
function backtrack() {
    sudokuField[row][col] = 0;
    row = path[path.length-1][0];
    col = path[path.length-1][1];
    num = path[path.length-1][2] + 1;
    path.pop();
    if(num > 9)
        backtrack();
}
function sleep(delay) {
    setTimeout(function(){solveSudokuField();}, delay);
}
    
drawSudokuField();
solveSudokuField();