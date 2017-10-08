var userChoice = [];
var userChose = [];
var xArray =[];
var oArray = [];
var count = 0;
var t;
var pos;
var userMoved = false;
var conf;
var refreshTime = 200;
var winList = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var corner = ['0', '2', '6', '8'];
var edge = ['1', '3', '5', '7'];
var subtract = [-1, 1];
var MoveList = ['0','2','6','8','4','4','0','2','6','8','4','4','0','2','6','8','4','4','1','3','5','7'];
var AScore = 0;
var HScore = 0;


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
    conf = confirm("DO YOU WANT TO PLAY FIRST?");
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

    if(!conf) {
        MoveFirst();
    }else {
        MoveSecond();
    }
    //MakeAMove();
    if(!finished) {
        t = setTimeout(start, refreshTime);
    }
}

function MakeAMove() {

    if(count % 2 == 0){
        return;
    }
    if(block()){
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

function WriteO(id){
    if(document.getElementById(id).innerHTML !=''|| count !=1) {

        return false;
    }else{
        document.getElementById(id).innerHTML = 'O';
        oArray.push(id);
        count = 0;
        return true;
    }
}function WriteX(id){
    if(document.getElementById(id).innerHTML !=''|| count !=0) {

        return false;
    }else{
        document.getElementById(id).innerHTML = 'X';
        xArray.push(id);
        count = 1;
        return true;
    }
}



function MoveFirst(){
    if(count == 1){
        return;
    }
    if(blockX()){
        return;
    }
    if (xArray.length == 0){

        pos = MoveList[Math.floor(Math.random()*22)]
        WriteX(pos);
        return;
    }else if(xArray.length == 1 ){
        if(corner.indexOf(pos) != -1){
            if(edge.indexOf(oArray[0]) != -1){
                WriteX('4');
                return;
            }
        }

    }
    while(!WriteX('' + corner[Math.floor(Math.random()*4)])){
        if(xArray.length >= 3 && WriteX( edge[Math.floor(Math.random()*4)])){
            break;
        }
    }




}



function MoveSecond(){
    if(count == 0){
        return;
    }
    if(block()){
        return;
    }
    // first round
    if (xArray.length == 1) {
        // first piece is in center
        if (xArray[0] == 4) {
            while(!WriteO('' + corner[Math.floor(Math.random()*4)]));
            return;
        }
        // first piece is on corner

        if (corner.indexOf(xArray[0]) != -1) {
            WriteO("4");
            return;
        }
        // first piece is on edge
        else{
            var i = parseInt(xArray[0]);
            if(xArray[0]=='1' || xArray[0] == '7'){
                while(!WriteO(''+ (i + subtract[Math.floor(Math.random()*2)])));
            }else{
                while(!WriteO(''+ (i + 3*subtract[Math.floor(Math.random()*2)])));
            }
            return;
        }
    }else{
        if (corner.indexOf(xArray[1]) != -1 && corner.indexOf(xArray[0]) != -1 && oArray.length == 1) {
            while (!WriteO('' + edge[Math.floor(Math.random() * 4)])) ;
            return
        }else if (edge.indexOf((xArray[0])!=-1) && xArray.length == 2){
            WriteO('4');
            return;
        }
        while(WriteO(corner[Math.floor(Math.random()*4)]));
    }


    // second round
    //
    // if(xArray.length == 2){
    //     if (corner.indexOf(xArray[0]) != -1) {
    //         if (corner.indexOf(xArray[1]) != -1) {
    //
    //         }
    //     }
    // }




}


function block(){
    if(xArray.length < 2){
        return false;
    }
    var C, B, index, BNeededx, BNeededY;
    var needBlock = false;
    for(i = 0; i < winList.length; i++) {
        C = 0;
        B = 0;
        index = 0;
        for (j = 0; j < 3; j++) {
            if (oArray.indexOf('' + winList[i][j]) != -1) {
                C++
            }else if (xArray.indexOf('' + winList[i][j]) != -1) {
                B++;
            } else {
                index = j;
            }
        }
        if (C > 1) {
            if (WriteO('' + winList[i][index])) {
                return true;
            }
        }
        if (B > 1 && C == 0) {
            needBlock = true;
            BNeededx= i;
            BNeededY = index;
        }
    }

    if (needBlock){

        if (WriteO(''+winList[BNeededx][BNeededY])){
                return true;
        }
    }
    return false;
}
function blockX(){
    if(xArray.length < 2){
        return false;
    }
    var C, B, index, BNeededx, BNeededY;
    var needBlock = false;
    for(i = 0; i < winList.length; i++) {
        C = 0;
        B = 0;
        index = 0;
        for (j = 0; j < 3; j++) {
            if (xArray.indexOf('' + winList[i][j]) != -1) {
                C++
            }else if (oArray.indexOf('' + winList[i][j]) != -1) {
                B++;
            } else {
                index = j;
            }
        }
        if (C > 1) {
            if (WriteX('' + winList[i][index])) {
                return true;
            }
        }
        if (B > 1 && C == 0) {
            needBlock = true;
            BNeededx= i;
            BNeededY = index;
        }
    }

    if (needBlock){

        if (WriteX(''+winList[BNeededx][BNeededY])){
                return true;
        }
    }
    return false;
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
            if(conf) {
                HScore;
                document.getElementById('HumanScore').innerHTML = '' + HScore;
            }else{
                AScore+=1;
                document.getElementById('AIScore').innerHTML = '' + AScore;
            }
            return 1;
        }else if(Owin == true){
            if(!conf) {
                HScore+=1;
                document.getElementById('HumanScore').innerHTML = '' + HScore;
            }else{
                AScore+=1;
                document.getElementById('AIScore').innerHTML = '' + AScore;
            }
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
                else {
                    this.innerHTML = "O";
                    count = 0;
                    oArray.push(this.id);

                }

                userMoved = true;
                userChose.push(userChose);

            };
            slot.style.top = top + i * 230 + 'px';
            slot.style.left = left + j * 230 + 'px';

            table.appendChild(slot);
        }
    }
    var ai = document.createElement("DIV");
    ai.setAttribute("id", "AI");
    ai.setAttribute("class", "slot");
    ai.style.top = top + 'px';
    ai.style.left = left  - 230 + 'px';
    ai.innerHTML = "AI";
    table.appendChild(ai);
    var ais = document.createElement("DIV");
    ais.setAttribute("id", "AIScore");
    ais.setAttribute("class", "slot");
    ais.style.top = top + 230 +'px';
    ais.style.left = left  - 230 + 'px';
    ais.innerHTML = AScore;
    table.appendChild(ais);
    var human = document.createElement("DIV");
    human.setAttribute("id", "Human");
    human.setAttribute("class", "slot");
    human.style.top = top + 'px';
    human.style.left = left  + 690 + 'px';
    human.innerHTML = "P";
    table.appendChild(human);
    var hms = document.createElement("DIV");
    hms.setAttribute("id", "HumanScore");
    hms.setAttribute("class", "slot");
    hms.style.top = top + 230 + 'px';
    hms.style.left = left  + 690 + 'px';
    hms.innerHTML = HScore;
    table.appendChild(hms);

}