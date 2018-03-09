const rectWidth = 20;
    const height = 600;
    const data = getYearPop('myTable');
    function getYearPop(elem){
        let myTable = document.getElementById(elem);
        //let svg = document.getElementById('svg');
        let data = [];
        for (let i = 0; i < myTable.lastChild.rows.length; i++) {
            console.log((myTable.lastChild.rows[i].cells[2].innerText) / 100000);
            //svg.appendChild(document.createElement('rect'));
            data.push((myTable.lastChild.rows[i].cells[2].innerText) / 10000);
        }
        return data;     
    }
   
        
        
    let svg = document.getElementById('svg');
    for (let i = 0; i < data.length; i++) {
        svg.appendChild(document.createElement('rect'));  
    }
    const rect = d3.selectAll('rect')
    	.data(data)
    	.attr('x', function(d, i) {return i * rectWidth})
    	.attr('y', 600)
    	.attr('width', rectWidth)
    	.attr('height', function(d) {return d})
    	.attr('fill', 'blue')
    	.attr('stroke', '#fff');