'use strict';

const { createGrid, computeGrid, renderGrid } = require('./grid');

module.exports = ({ size }) => {
    let grid = createGrid(size, true);

    function play() {
        let nextGrid = computeGrid(grid);

        grid = nextGrid;

        return renderGrid(nextGrid);
    }

    return {
        play
    };
};