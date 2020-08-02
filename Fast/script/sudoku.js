//Variables
var row = 0, col = 0, path = [], solved = false, num = 1, iszero = false;

//Sudoku array variable
var sudokuField = [[0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0]];

function getSudoku() {
    var index1 = 0;
    var index2 = 0;
    $("table[name='sudokutable'] tr td").each(function(){
        var rowData = $(this);
        if(rowData.find(":input").val() != ""){
            sudokuField[index1][index2] = parseInt(rowData.find(":input").val());
            rowData.find(":input").css("background-color","#90ee90");
        }
        else
            sudokuField[index1][index2] = 0;
        index2 += 1;
        if(index2 >= 9){
            index1 += 1;
            index2 = 0;
        }
    });
}
function resetField() {
	for(var i = 0; i < sudokuField.length; i++){
		for(var j = 0; j < sudokuField[i].length; j++)
			sudokuField[i][j] = 0;
	}
	var index1 = 0;
    var index2 = 0;
    $("table[name='sudokutable'] tr td").each(function(){
        var rowData = $(this);
        rowData.find(":input").val("");
		rowData.find(":input").css("background-color","#ffffff");
        index2 += 1;
        if(index2 >= 9){
            index1 += 1;
            index2 = 0;
        }
    });
}
function showSudokuSolved() {
    var index1 = 0;
    var index2 = 0;
    $("table[name='sudokutable'] tr td").each(function(){
        var rowData = $(this);
        rowData.find(":input").val(sudokuField[index1][index2]);
        index2 += 1;
        if(index2 >= 9){
            index1 += 1;
            index2 = 0;
        }
    });
}
function solveSudokuField() {
    while(solved == false){
        if(row >= 9){
            solved = true;
            console.log("SOLVED");
            showSudokuSolved();
            break;
        }
        if(sudokuField[row][col] == 0 || iszero == true){
            sudokuField[row][col] = num;
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
        else
            next();
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

function reset() {
    row = 0;
    col = 0;
    path = [];
    solved = false;
    num = 1;
    iszero = false;
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
    
$("button[name='solvebutton']").click(function(){
    reset();
    getSudoku();
    solveSudokuField();
});

$("button[name='resetbutton']").click(function(){
	resetField();
});