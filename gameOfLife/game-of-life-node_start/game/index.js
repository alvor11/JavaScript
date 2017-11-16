'use strict';

const { createGrid, computeGrid, renderGrid } = require('./grid');

module.exports = ({ size }) => {
    // 1. создать сетку определенного размера с клетками в случайном порядке
    let grid = createGrid(size);
    function play() {
        // 2. высчитать новую сетку на основе текущей
        let newGrid = computeGrid();
        // 3. заменить текущую сетку на новую
        grid = newGrid;
        // 4. вернуть строковое представление новой сетки
        renderGrid(grid);
    }

    return {
        play
    };
};