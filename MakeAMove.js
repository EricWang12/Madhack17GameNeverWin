var userChoice = [];
var userChose = [];
var xArray =[];
var oArray = [];
var count = 0;
var t;
var userMoved = false;
var refreshTime = 200;
var winList = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];




function init(){
    userChoice = [];
    userChose = [];
    xArray = [];
    oArray = [];
    count = 0;
    userMoved = false;
    document.body.innerHTML = '';
    clearTimeout(t);
    createNewTable();
    start();


}

function start(){
    // if ( userMoved == true){
    //     MakeAMove();
    //     userMoved = false;
    // }
    //document.getElementById("window").innerHTML = xArray;

    //alert("HHH");
    var finished = false;
    if(xArray.length>=3) {
        i = win();
        if (i !=0 ) {

            clearTimeout(t);
            if (i < 0) {
                alert("O WIN!");
            } else {

                alert("X WIN!");
            }
            init();
            finished = true
        }
        if(xArray.length > 4 || oArray.length >4){
            clearTimeout(t);
            alert("DRAW!!!");
            init();
            finished = true;
        }
    }
    // result();

    MakeAMove();

    if(!finished) {
        t = setTimeout(start, refreshTime);
    }
}
function stop(){
    clearTimeout(t);
}

function nouse(){

}

function MakeAMove() {

    if(count % 2 == 0){
        return;
    }
    var I = Math.floor(Math.random()*9) + '';
    while (document.getElementById(I).innerHTML !=''){
        I = Math.floor(Math.random()*9) + '';
    }
    document.getElementById(I).innerHTML = 'O';

    oArray.push(I);
    count = 0;

}


function MoveFirst(){




}

function win(){
    if(xArray.length < 3 && oArray.length < 3){
        return;
    }
    for(i = 0; i < winList.length; i++){
        var Xwin = true;
        var Owin = true;
        for(j = 0; j < 3; j++) {
            if (xArray.indexOf('' + winList[i][j]) == -1) {
                Xwin = false;
                break;

            }
        }
        for(j = 0; j < 3; j++) {
            if(oArray.indexOf(''+winList[i][j]) == -1){
                Owin = false;
                break;
            }

        }
        if(Xwin == true){
            return 1;
        }else if(Owin == true){
            return -1;
        }
    }
    return 0;
}



function createNewTable() {

    var table = document.createElement("DIV");
    table.setAttribute("id", "background");
    table.setAttribute("class", "background");
    document.body.appendChild(table);
    var top = table.style.top;
    var left = table.style.left;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            var slot = document.createElement("DIV");
            slot.setAttribute("id",  ''+(3 * i + j));
            slot.setAttribute("class", "slot");
            slot.onclick = function () {
                 if (this.innerHTML != '' /*|| userMoved == true*/){
                    return;
                }
                // var I = parseInt(this.id);
                // userChoice =  [(I-(I%3))/3,I%3];
                if (count % 2 == 0) {
                    this.innerHTML = "X";
                    count = 1;
                    xArray.push(this.id);
                }
                // } else {
                //     this.innerHTML = "O";
                //     count = 0;
                //     oArray.push(this.id);
                //     oArray.push(MakeAMove());
                // }

                userMoved = true;
                userChose.push(userChose);

            };
            slot.style.top = top + i * 230 + 'px';
            slot.style.left = left + j * 230 + 'px';

            table.appendChild(slot);
        }
    }


}