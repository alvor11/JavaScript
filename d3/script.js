var svg = d3.select('body').append('svg')

svg
    .append('text')
    .text('click here')
    .attr('x', 50)
    .attr('y', 50)

var events = []
svg.on('click', function () {
    events.push(d3.event)
    if (events.length > 5) events.shift()
    var circles = svg.selectAll('circle')
        .data(events, function (e) { return e.timeStamp })
        .attr('fill', 'gray')
    circles
        .enter()
        .append('circle')
        .attr('cx', function (d) { return d.x || d.pageX })
        .attr('cy', function (d) { return d.y || d.pageY })
        .attr('fill', 'red')
        .attr('r', 0) // Начальное значение
        .transition()
        .duration(1000) // Длительность перехода от начального значения к конечному
        .attr('r', 10) // Конечное значение
    circles
        .exit()
        .transition()
        .attr('r', 0)
        .remove()
})