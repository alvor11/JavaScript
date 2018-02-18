


function sorting(key){
    let arrTable = [].slice.call(myTable.rows);
    arrTable.shift(1);
    console.log(arrTable);
    if(key >1){
       arrTable.sort(function (a, b) {
        return a.cells[key].textContent - b.cells[key].textContent;
    }); 
    }else{
        arrTable.sort(function (a, b) {
            if(a.cells[key].textContent > b.cells[key].textContent) return 1;
            if(a.cells[key].textContent < b.cells[key].textContent) return -1;
        });
    }
    for (let k = 0; k < arrTable.length; k++) {
      document.getElementById('myTable').appendChild(arrTable[k]);
    }   
}

sorting(0);

