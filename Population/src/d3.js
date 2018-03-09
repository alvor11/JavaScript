'use strict';

var rectWidth = 20;
var height = 600;
var data = getYearPop('myTable');
function getYearPop(elem) {
    var myTable = document.getElementById(elem);
    //let svg = document.getElementById('svg');
    var data = [];
    for (var i = 0; i < myTable.lastChild.rows.length; i++) {
        console.log(myTable.lastChild.rows[i].cells[2].innerText / 100000);
        //svg.appendChild(document.createElement('rect'));
        data.push(myTable.lastChild.rows[i].cells[2].innerText / 10000);
    }
    return data;
}

var svg = document.getElementById('svg');
for (var i = 0; i < data.length; i++) {
    svg.appendChild(document.createElement('rect'));
}
var rect = d3.selectAll('rect').data(data).attr('x', function (d, i) {
    return i * rectWidth;
}).attr('y', 600).attr('width', rectWidth).attr('height', function (d) {
    return d;
}).attr('fill', 'blue').attr('stroke', '#fff');