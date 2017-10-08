var count = 0;
var userChoice = [];
var userChose = [];
var xArray =[];
var oArray = [];
var userMoved = false;
var refreshTime = 30;





function init(){
    document.body.innerHTML = '';
    // var newElement = document.createElement("IMG");
    // newElement.setAttribute("src", "./uwmadison.jpg");
    createNewTable();
    // result();
    start();


}

function start(){
    // if ( userMoved == true){
    //     MakeAMove();
    //     userMoved = false;
    // }
    //document.getElementById("window").innerHTML = xArray;

    alert("HHH");
    if (document.getElementById("0").innerHTML == "X" && document.getElementById("1").innerHTML == "X"
        && document.getElementById("2").innerHTML == "X") {
        // clearTimeout(t);
        alert("X WIN!");
        //init();
    }
    // result();

    t=setTimeout(start(), refreshTime);

}

function MakeAMove() {


}


function MoveFirst(){




}


// function result() {
//     if (xArray[0][0]==xArray[0][1] && xArray[0][0] == xArray[0][2]) {
//         // clearTimeout(t);
//         alert("X WIN!");
//         init();
//     }
// }


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
                var I = parseInt(this.id);
                userChoice =  [(I-(I%3))/3,I%3];
                if (count % 2 == 0) {
                    this.innerHTML = "X";
                    count = 1;
                    xArray.push(userChoice);
                } else {
                    this.innerHTML = "O";
                    count = 0;
                    oArray.push(userChoice);
                }
                userChoice =  [i,j];
                userMoved = true;
                userChose.push(userChose);

            };
            slot.style.top = top + i * 230 + 'px';
            slot.style.left = left + j * 230 + 'px';

            table.appendChild(slot);
        }
    }
    var window = document.createElement("DIV");
    window.setAttribute("class", "window");
    window.setAttribute("id", "window");
    window.style.top = top +   690 + 'px';
    document.body.appendChild(window);


}