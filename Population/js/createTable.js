//upload database
let dbPopulation = JSON.parse(getRequest());
//init header for table
myTable.appendChild(initThead());
//init basic table
myTable.appendChild(initTbody(dbPopulation));

//send request************************************************************************
function getRequest(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../db/db.json', false);
    xhr.send();
    if(xhr.status !=200) {
        alert(xhr.status + ':' + xhr.statusText);
    }else{
       return xhr.responseText;
    }
}

//Table**************************************************************************************
//filtering by country name or region after selected
function filterTable(elemTable, key, arrValue) {
   let arrOldTable = [].slice.call(elemTable.lastChild.rows);
   let index;
   key == 'Country Name'? index = 0: index = 1;
   let newTbody = document.createElement('tbody');
   for (let i = 0; i < arrValue.length; i++) {
       for (let j = 0; j < arrOldTable.length; j++) {
           if(arrValue[i] == arrOldTable[j].children[index].innerText){
               newTbody.appendChild(arrOldTable[j]);
           }  
       } 
   }
   return newTbody; 
}
//filtering by years after selected
function filterYear(elemTable, db, arrYears) {
    let arrOldTable = [].slice.call(elemTable.lastChild.rows);
    let newTbody = document.createElement('tbody');
    elemTable.firstChild.rows[0].cells[2].parentNode.removeChild(elemTable.firstChild.rows[0].cells[2]);
    for (let y = 0; y < arrYears.length; y++) {
        elemTable.firstChild.rows[0].appendChild(new setCell(arrYears[y]));
    }
    for (let i = 0; i < arrOldTable.length; i++) {
        for (let k = 0; k < db.length; k++) {
            if(arrOldTable[i].cells[0].innerText === db[k]["Country Name"]) {
                let row = document.createElement('tr');
                row.appendChild((arrOldTable[i].cells[0]).cloneNode(true));
                row.appendChild((arrOldTable[i].cells[1]).cloneNode(true));
                for (let j = 0; j < arrYears.length; j++) {
                    row.appendChild(new setCell(db[k]["Population"][arrYears[j]]) );                
                }
                newTbody.appendChild(row);
            }            
        }        
    }
    
    return newTbody;
}
// started initialization header
function initThead() {
    let thead = document.createElement('thead');
    thead.style.fontWeight = 'bold';
    thead.appendChild(new setRow("Country Name ", "Region ", "2015 "));
    let tr = document.createElement('tr');
        thead.appendChild(new setRow(setButtonHeader('select country', 'country'), setButtonHeader('select region', 'region'), setButtonHeader('select year', 'year')));
    thead.appendChild(tr);
    return thead;
}
// started initialization table
function initTbody(db) {
    let tbody = document.createElement('tbody');
    for (let i = 0; i < db.length; i++) {
        if(db[i]["Region"] === "") {
            continue;
        } else {
            tbody.appendChild(setRow(db[i]["Country Name"], 
            db[i]["Region"], db[i]["Population"][2015]));
        } 
    }
    return tbody;
}
// init row for table
function setRow(country, region, year) {
    let row = document.createElement('tr');
        row.appendChild(new setCell(country));
        row.appendChild(new setCell(region));
        row.appendChild(new setCell(year));            
    return row;
}
// init cell for row
function setCell(value) {
    let cell = document.createElement('td');
    cell.innerHTML = value;
    return cell;
}
// sorting row from min to max
function sortedMinmax(elemTable, key){
    let arrTable = [].slice.call(elemTable.lastChild.rows);
    console.log(arrTable);
    console.log(arrTable[0].cells[0].textContent);
    if(key == 0 || key == 1){
        arrTable.sort(function (a, b) {
            if(a.cells[key].textContent > b.cells[key].textContent) return 1;
            if(a.cells[key].textContent < b.cells[key].textContent) return -1;
        });
    } else {
        arrTable.sort(function (a, b) {
            return a.cells[key].textContent - b.cells[key].textContent;
        }); 
        
    }
    console.log(arrTable);
    let tbody = document.createElement('tbody');
    for (let k = 0; k < arrTable.length; k++) {
        tbody.appendChild(arrTable[k]);  
    }
    return tbody;  
}
//sorting row from max to min
function sortedMaxmin(elemTable, key){
    let arrTable = [].slice.call(elemTable.lastChild.rows);
    console.log(arrTable);
    console.log(arrTable[0].cells[0].textContent);
    if(key == 0 || key == 1){
        arrTable.sort(function (a, b) {
            if(a.cells[key].textContent < b.cells[key].textContent) return 1;
            if(a.cells[key].textContent > b.cells[key].textContent) return -1;
        });
    } else {
        arrTable.sort(function (a, b) {
            return b.cells[key].textContent - a.cells[key].textContent;
        }); 
        
    }
    console.log(arrTable);
    let tbody = document.createElement('tbody');
    for (let k = 0; k < arrTable.length; k++) {
        tbody.appendChild(arrTable[k]);  
    }
    return tbody;  
}

//Modal window************************************************************************************ */
//Set shadow-fon---------------------------------------------------------------------
function modalBase(){
    let modalBase = document.createElement('div');
    modalBase.id = 'modalBase';
    modalBase.style.cssText = 'height: 100%;\
        width: 100%;\
        position: absolute;\
        top: 0px;\
        left: 0px;\
        background-color: #808080;\
        opacity: 0.3;\
        z-index: 9000;\ ';
    return modalBase;  
}
//Set table for select with checkbox-----------------------------------------------------
function divSelect(key) {
    let arrTable = [].slice.call(document.getElementById('myTable').lastChild.rows);
    let header = document.createElement('h4');
    header.innerHTML = `${key}`;
    let divSelect = document.createElement('div');
    divSelect.id = 'divSelect';
    divSelect.style.cssText = 'position: absolute;\
    width: 70%;\
    padding: 5px;\
    top: 300px;\
    left: 15%;\
    opacity: 1;\
    background-color: #fff;\
    z-index: 9999;\
    border-radius: 5px;';
    
    let ul = document.createElement('ul');
    let index;
    if(key == 'Country Name') {
        index = 0;
        ul = sortFilter(arrTable, index, 6);
    } else if (key == 'Region') {
        index = 1;
        ul = sortFilter(arrTable, index, 2);
    } else {
        index = 2;
        ul = setSelectYear(4);
    }
    divSelect.appendChild(header);
    divSelect.appendChild(ul);
    divSelect.appendChild(new divControlBut());
    return divSelect;
}
//select only unique names for the selection
function sortFilter(arr, index, column) {
    let ul = document.createElement('ul');
    ul.style.cssText = `list-style: none; column-count: ${column};`;
    let set = new Set();
    for (let i = 0; i < arr.length; i++) {
        set.add(arr[i].children[index].innerText);
                
    }
    for (const value of set) {
        ul.appendChild(new setSelectLi(value));
    }
    return ul;
}
// create years list for select
function setSelectYear(column) {
    let ul = document.createElement('ul');
    ul.style.cssText = `list-style: none; column-count: ${column};`;
    for (let i = 2015; i > 1959; i--) {
        ul.appendChild(new setSelectLi(i));
    }
    return ul;
}
// basic function for create select list
function setSelectLi(value) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    div.className = 'checkbox';
    let label = document.createElement('label');
    let input = document.createElement('input');
    input.type = 'checkbox';
    label.appendChild(input);
    label.innerHTML += value;
    div.appendChild(label);
    li.appendChild(div);
    return li;
}

//Set button---------------------------------------------------------------------
//combines buttons 'send' and 'cancel'
function divControlBut() {
    let div = document.createElement('div');
    div.style.marginLeft = '65%';
    div.appendChild(new setButton('send', 'send'));
    div.appendChild(new setButton('cancel', 'cancel'));
    return div;
}
// initial button
function setButton(value, id){
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.className = 'btn btn-default btn-sm';
    button.style.marginLeft = '5px';
    button.id = id;
    button.innerHTML = value;
    return button;
}
// initial special button for tables control
function setButtonHeader(value, id) {
    let but = `<div class="btn-group btn-group-xs" role"group"><button type="button" class="btn btn-default" id="minmax${id}">\
    <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span></button>\
    <button type="button" class="btn btn-default" id="${id}">${value}</button>\
    <button type="button" class="btn btn-default" id="maxmin${id}">\
    <span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span></button></div>`;
    
    return but;
}


// Listeners************************************************************************
// listeners for tables events
myTable.onclick = function(event) {
    if(event.target.id == "country"){
        document.body.appendChild(new modalBase());
        document.body.appendChild(new divSelect("Country Name"));
        
    }
    if(event.target.id == "region"){
        document.body.appendChild(new modalBase());
        document.body.appendChild(new divSelect("Region"));
    }
    if(event.target.id == "year"){
        document.body.appendChild(new modalBase());
        document.body.appendChild(new divSelect("Year"));
    }
    if(event.target.id == "minmaxcountry" ||  event.target == document.getElementById("minmaxcountry").children[0]){
        myTable.replaceChild(sortedMinmax(myTable, 0),
             myTable.lastChild);
    }
    if(event.target.id == "minmaxregion" || event.target == document.getElementById("minmaxregion").children[0]){
        myTable.replaceChild(sortedMinmax(myTable, 1),
             myTable.lastChild);
    }
    if(event.target.id == "minmaxyear" || event.target == document.getElementById("minmaxyear").children[0]){
        myTable.replaceChild(sortedMinmax(myTable, 2),
             myTable.lastChild);
    }
    if(event.target.id == "maxmincountry" ||  event.target == document.getElementById("maxmincountry").children[0]){
        myTable.replaceChild(sortedMaxmin(myTable, 0),
             myTable.lastChild);
    }
    if(event.target.id == "maxminregion" || event.target == document.getElementById("maxminregion").children[0]){
        myTable.replaceChild(sortedMaxmin(myTable, 1),
             myTable.lastChild);
    }
    if(event.target.id == "maxminyear" || event.target == document.getElementById("maxminyear").children[0]){
        myTable.replaceChild(sortedMaxmin(myTable, 2),
             myTable.lastChild);
    }
   
}


// return select value--------------------------------------------------------
// listeners for select tables
document.onclick = function(event) {
    let div = document.getElementById('divSelect');
    let modal = document.getElementById('modalBase');
    let myTable = document.getElementById('myTable');
    if(event.target.id == 'cancel'){
        div.parentNode.removeChild(div);
        modal.parentNode.removeChild(modal);
    } 
    if(event.target.id == 'send') {
        let arr = [];
        let ul = div.querySelectorAll('ul>li>div>label>input');
        for (let i = 0; i < ul.length; i++) {
            if(ul[i].checked) {
                arr.push(ul[i].parentNode.innerText);
            } 
        }
        if(div.firstChild.innerText === "Country Name" || 
        div.firstChild.innerText === "Region"){
            myTable.replaceChild(filterTable
                (myTable, div.firstChild.innerText, arr), myTable.lastChild);
        } else {
            myTable.replaceChild(filterYear(myTable, dbPopulation, arr),
             myTable.lastChild);
        }
        div.parentNode.removeChild(div);
        modal.parentNode.removeChild(modal);
    }
    if(event.target.id == 'reset'){
        myTable.replaceChild(initTbody(dbPopulation), myTable.lastChild);
    }

}



 //******************************************************************************* */


