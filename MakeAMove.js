var count = 0;
var whenClick =  function(t) {
    if (count % 2 == 0) {
        t.innerHTML = "X";
        count = 1;
    } else {
        t.innerHTML = "O";
        count = 0;
    }


}

function init(x){
    document.body.innerHTML = '';
    // var newElement = document.createElement("IMG");
    // newElement.setAttribute("src", "./uwmadison.jpg");
    createNewTable();
}


function MakeAMove() {

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
            slot.setAttribute("id", "slot" + (3 * i + j));
            slot.setAttribute("class", "slot");
            slot.onclick = function () {

                if (count % 2 == 0) {
                    this.innerHTML = "X";
                    count = 1;
                } else {
                    this.innerHTML = "O";
                    count = 0;
                }
            };
            slot.style.top = top + i * 230 + 'px';
            slot.style.left = left + j * 230 + 'px';

            table.appendChild(slot);
        }
    }


}