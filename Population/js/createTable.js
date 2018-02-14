
//let dbPop = require('./dbPopulation.json');

let newTr = document.createElement('tr');
function year(){
    let teg;
    for (let i = 1960; i < 2016; i++) {
        teg = teg + '<th>' + i + '</th>';   
    }
    return teg;
}

newTr.innerHTML ='<th>Country</th><th>Region</th>' + year();

myTable.appendChild(newTr);


function createTd() {
    let myTd = document.createElement('td');
    myTd.innerHTML = 2 + 3;
    return myTd;
}

function createTr(size, createTd) {
    let myTr = document.createElement('tr');
    for (let i = 0; i < size; i++) {
         myTr.appendChild(new createTd);
    }
    return myTr;
}

function createTable (size) {
    let myTable = document.createElement('table');
    for (let i = 0; i < size; i++) {
        myTable.appendChild(new createTr(size, createTd));
        
    }
    return myTable;
}

//myTable.appendChild(createTable(20));