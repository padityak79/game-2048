
const restart = document.querySelector('.btn__restart');
const reverse = document.querySelector('.btn__reverse');
var prevScore;
var gameGrid = Array(4).fill(undefined).map(() => Array(4).fill(undefined));
var gameGridPrevious = Array(4).fill(undefined).map(() => Array(4).fill(undefined));
var size;
function addGrid() {

    var gridX= floor(random(0,4));
    var gridY= floor(random(0,4));
    
    while(gameGrid[gridX][gridY].isAssigned()) {
        var gridX= floor(random(0,4));
        var gridY= floor(random(0,4));
    }

    document.querySelector('.display-menu output').value = parseInt(document.querySelector('.display-menu output').value) + gameGrid[gridX][gridY].setValue(); 
    
}

function isover() {
    for( var i=0; i < 4; i++) {
        for( var j=0; j < 4; j++) {
            if(!gameGrid[i][j].isAssigned()) return false;
        }
    }
    for( var i=0; i < 4; i++) {
        for( var j=0; j < 3; j++) {
            if(gameGrid[i][j].ifMerge(gameGrid[i][j+1].valueOf())) return false;
        }
    }
    for( var j=0; j < 4; j++) {
        for( var i=0; i < 3; i++) {
            if(gameGrid[i][j].ifMerge(gameGrid[i+1][j].valueOf())) return false;
        }
    }
    return true;
}

function iswon() {
    for( var i=0; i < 4; i++) {
        for( var j=0; j < 4; j++) {
            if(gameGrid[i][j].valueOf() === 2048) return true;
        }
    }
    return false;
}

function setup() {
    createCanvas(600,600);
    size = height / 4;
    for( var i=0;i<4;i++) {
        for(var j=0;j< 4; j++) {
            var gridBox= new grid(j * size, i*size, size);
            gameGrid[i][j]= gridBox;
        }
    }

    for( var i=0;i<4;i++) {
        for(var j=0;j< 4; j++) {
            var gridBox= new grid(j * size, i*size, size);
            gameGridPrevious[i][j]= gridBox;
        }
    }

    addGrid();
    
}

function keyPressed() {

    var gameOver = isover();
    if(!gameOver) {

        for( var i=0; i< 4; i++) {
            for( var j=0; j<4; j++) {
                gameGridPrevious[i][j].resetValue();
                if(gameGrid[i][j].isAssigned()) {
                    gameGridPrevious[i][j].setValue(gameGrid[i][j].valueOf()); 
                }
            }
        }
    
        prevScore = parseInt(document.querySelector('.display-menu output').value);
        
        var ifShift = undefined;
    
        if(keyCode === UP_ARROW){
            
            for( var j = 0; j < 4; j++){
                var vacantPos = 0;
                
                for( var i = 0; i < 4; i++){
                    
                    if( !gameGrid[i][j].isAssigned() ) {
                        continue;
                    }
                    pos = 1;
                    while(i+pos < 4) {
                        if(gameGrid[i+pos][j].valueOf()){
                            if ( gameGrid[i][j].ifMerge(gameGrid[i+pos][j].valueOf())){
                                document.querySelector('.display-menu output').value = parseInt(document.querySelector('.display-menu output').value) + gameGrid[i][j].setValue(gameGrid[i][j].valueOf() + gameGrid[i+pos][j].valueOf());
                                gameGrid[i+pos][j].resetValue();
                                while ( gameGrid[vacantPos][j].isAssigned() && vacantPos < i) {
                                    vacantPos++;
                                }
                                if(vacantPos < i) {
                                    gameGrid[vacantPos][j].setValue(gameGrid[i][j].valueOf());
                                    gameGrid[i][j].resetValue();
                                    ifShift = true;
                                    while ( gameGrid[vacantPos][j].isAssigned() && vacantPos < 3) {
                                        vacantPos++;
                                    }
                                }else {
                                    while ( gameGrid[vacantPos][j].isAssigned() && vacantPos < 3) {
                                        vacantPos++;
                                    }
                                    ifShift = true;
                                }
                                pos = 0;
                            }
    
                            break;
                        }
                        pos++;
                    }
    
                    if(pos === 0) {
                        continue;
                    }
                    
                    while ( gameGrid[vacantPos][j].isAssigned() && vacantPos < i) {
                        vacantPos++;
                    }
                    if( i > vacantPos) {
                        gameGrid[vacantPos][j].setValue(gameGrid[i][j].valueOf());
                        ifShift = true;
                        gameGrid[i][j].resetValue();
                        vacantPos++;
                    }
    
                }
    
            }
        } else if(keyCode === DOWN_ARROW){
            for( var j = 0; j < 4; j++){
                var vacantPos = 3;
                for( var i = 3; i >= 0; i--){
                    
                    if( !gameGrid[i][j].isAssigned()){
                        continue;
                    }
                    pos = -1;
                    while(i+pos >= 0 ) {
                        if(gameGrid[i+pos][j].valueOf()){
                            if ( gameGrid[i][j].ifMerge(gameGrid[i+pos][j].valueOf())){
                                document.querySelector('.display-menu output').value = parseInt(document.querySelector('.display-menu output').value) + gameGrid[i][j].setValue(gameGrid[i][j].valueOf() + gameGrid[i+pos][j].valueOf());
                                gameGrid[i+pos][j].resetValue();
                                while( gameGrid[vacantPos][j].isAssigned() && vacantPos > i){
                                    vacantPos--;  
                                }
                                if(i<vacantPos ) {
                                    gameGrid[vacantPos][j].setValue(gameGrid[i][j].valueOf());
                                    gameGrid[i][j].resetValue();
                                    
                                    ifShift = true;
                                    while( gameGrid[vacantPos][j].isAssigned() && vacantPos >= 1){
                                        vacantPos--;  
                                    }
                                }else {
                                    while( gameGrid[vacantPos][j].isAssigned() && vacantPos >= 1){
                                        vacantPos--;  
                                    }
                                    ifShift = true;
                                } 
                                pos = 0;   
                            }
                            break;
                        }                    
                        pos--;
                    }
    
                    if(pos === 0) {
                        continue;
                    }
    
                    while( gameGrid[vacantPos][j].isAssigned() && vacantPos > i){
                        vacantPos--;  
                    }
                    if(vacantPos > i){
                        gameGrid[vacantPos][j].setValue(gameGrid[i][j].valueOf());
                        ifShift = true;
                        gameGrid[i][j].resetValue();
                        vacantPos--;
                    }
                    
                }
    
            }
        } else if(keyCode === LEFT_ARROW){
            for( var i = 0; i < 4; i++){
                var vacantPos = 0;
                for( var j = 0; j < 4; j++){
                    
                    if( !gameGrid[i][j].isAssigned() ) {
                        continue;
                    }
    
                    pos = 1;
                    while(j+pos < 4) {
                        if(gameGrid[i][j+pos].valueOf()){
                            if ( gameGrid[i][j].ifMerge(gameGrid[i][j+pos].valueOf())){
                                document.querySelector('.display-menu output').value = parseInt(document.querySelector('.display-menu output').value) + gameGrid[i][j].setValue(gameGrid[i][j].valueOf() + gameGrid[i][j+pos].valueOf());
                                gameGrid[i][j+pos].resetValue();
                                while( gameGrid[i][vacantPos].isAssigned() && vacantPos < j) {
                                    vacantPos++;
                                }
                                if(j>vacantPos && !gameGrid[i][vacantPos].valueOf()) {
                                    gameGrid[i][vacantPos].setValue(gameGrid[i][j].valueOf());
                                    gameGrid[i][j].resetValue();
                                    
                                    ifShift = true;
                                    while( gameGrid[i][vacantPos].isAssigned() && vacantPos < 3) {
                                        vacantPos++;
                                    }
                                } else {
                                    while( gameGrid[i][vacantPos].isAssigned() && vacantPos < 3) {
                                        vacantPos++;
                                    }
                                    ifShift = true;
                                }
                                pos = 0;
                            }
                            break;
                        }
                        pos++;
                    }
    
                    if(pos === 0) {
                        continue;
                    }
    
                    while( gameGrid[i][vacantPos].isAssigned() && vacantPos < j) {
                        vacantPos++;
                    }
    
                    if( j > vacantPos) {
                        gameGrid[i][vacantPos].setValue(gameGrid[i][j].valueOf());
                        ifShift = true;
                        gameGrid[i][j].resetValue();
                        vacantPos++;
                    }
                }
    
            }
        } else if(keyCode === RIGHT_ARROW){
            for( var i = 0; i < 4; i++){
                var vacantPos = 3;
                for( var j = 3; j >= 0; j--){
                    
                    if( !gameGrid[i][j].isAssigned()){
                        continue;
                    }
    
                    var pos = -1;
    
                    while(j+pos >= 0) {
                        if(gameGrid[i][j+pos].valueOf()){
                            if ( gameGrid[i][j].ifMerge(gameGrid[i][j+pos].valueOf())){
                                document.querySelector('.display-menu output').value = parseInt(document.querySelector('.display-menu output').value) + gameGrid[i][j].setValue(gameGrid[i][j].valueOf() + gameGrid[i][j+pos].valueOf());
                                gameGrid[i][j+pos].resetValue();
                                while( gameGrid[i][vacantPos].isAssigned() && vacantPos > j){
                                    vacantPos--;  
                                }
                                if(vacantPos > j) {
                                    
                                    gameGrid[i][vacantPos].setValue(gameGrid[i][j].valueOf());
                                    gameGrid[i][j].resetValue();
                                    
                                    ifShift = true;
                                    while( gameGrid[i][vacantPos].isAssigned() && vacantPos >= 1){
                                        vacantPos--;  
                                    }
                                } else {
                                    while( gameGrid[i][vacantPos].isAssigned() && vacantPos >= 1){
                                        vacantPos--;  
                                    }
                                    
                                    ifShift = true;
                                }
                                pos = 0;
                            }
                            break;
                        }
                        pos--;
                    }
    
                    if(pos === 0) {
                        continue;
                    }
                    while( gameGrid[i][vacantPos].isAssigned() && vacantPos > j){
                        vacantPos--;  
                    }
                    if(vacantPos > j){
                        gameGrid[i][vacantPos].setValue(gameGrid[i][j].valueOf());
                        ifShift = true;
                        gameGrid[i][j].resetValue();
                        vacantPos--;
                    }
                    
                }
    
            }
        } 
    
        if( ifShift) addGrid();
    }
    
}

reverse.addEventListener('click', ()=>{
    document.querySelector('.display-menu output').value = prevScore;
    for( var i=0; i< 4; i++) {
        for( var j=0; j<4; j++) {
            gameGrid[i][j].resetValue();
            if(gameGridPrevious[i][j].isAssigned()) {
                gameGrid[i][j].setValue(gameGridPrevious[i][j].valueOf()); 
            }
        }
    }
});

restart.addEventListener('click', ()=> {

    gameGrid = Array(4).fill(undefined).map(()=> Array(4).fill(undefined));

    for( var i=0;i<4;i++) {
        for(var j=0;j< 4; j++) {
            var gridBox= new grid(j * size, i*size, size);
            gameGrid[i][j]= gridBox;
        }
    }

    for( var i=0;i<4;i++) {
        for(var j=0;j< 4; j++) {
            var gridBox= new grid(j * size, i*size, size);
            gameGridPrevious[i][j]= gridBox;
        }
    }
    prevScore = 0;
    document.querySelector('.display-menu output').value = 0;
    addGrid();
});

function draw() {
    background(255);
    for( var i=0;i<4;i++) {
        for(var j=0;j< 4; j++) {
            gameGrid[i][j].show();
        }
    } 
    if(isover()){
        document.querySelector('.gameover').style.opacity = "0.92";
    } else {
        document.querySelector('.gameover').style.opacity = "0";
    } 
    if(iswon()){
        document.querySelector('.gamewon').style.opacity = "0.92";
    } else {
        document.querySelector('.gamewon').style.opacity = "0";
    }
}

