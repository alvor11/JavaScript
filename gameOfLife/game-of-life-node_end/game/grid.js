'use strict';

/**
 * Создает объект клетки
 * @param {number} row - Индекс ряда
 * @param {number} col - Индекс колонки
 * @param {boolean} [alive=false] - Живая ли клетка
 * @returns {{row: number, col: number, alive: boolean}} Объект клетки со свойствами row, col и alive
 */
function createCell(row, col, alive = false) {
    return { row, col, alive };
}

/**
 * Считает количество соседей вокруг клекти
 * @param {[[{row: number, col: number, alive: boolean}]]} grid - Сетка
 * @param {{row: number, col: number, alive: boolean}} cell - Клетка
 * @returns {number} - Количество соседей
 */
function countNeighbors(grid, cell) {
    let rows = grid.length;
    let cols = grid[0].length;
    let { row, col } = cell;
    let count = 0;

    if (row - 1 >= 0) { // top
        if (grid[row - 1][col].alive) count += 1;
    }

    if (row - 1 >= 0 && col - 1 >= 0) { // top left
        if (grid[row - 1][col - 1].alive) count += 1;
    }

    if (row - 1 >= 0 && col + 1 < cols) { // top right
        if (grid[row - 1][col + 1].alive) count += 1;
    }

    if (col - 1 >= 0) { // left
        if (grid[row][col - 1].alive) count += 1;
    }

    if (col + 1 < cols) { // right
        if (grid[row][col + 1].alive) count += 1;
    }

    if (row + 1 < rows) { // bottom
        if (grid[row + 1][col].alive) count += 1;
    }

    if (row + 1 < rows && col - 1 >= 0) { // bottom left
        if (grid[row + 1][col - 1].alive) count += 1;
    }

    if (row + 1 < rows && col + 1 < cols) { // bottom right
        if (grid[row + 1][col + 1].alive) count += 1;
    }

    return count;
}

/**
 * Создает сетку
 * @param {number} size - Размер сетки
 * @param {boolean} [randomize=false] - Случайное определение состояния клеток в сетке
 * @returns {[[{row: number, col: number, alive: boolean}]]} - Сетка
 */
function createGrid(size, randomize = false) {
    let grid = new Array(size);

    for (let r = 0; r < size; r++) {
        grid[r] = new Array(size);

        for (let c = 0; c < size; c++) {
            if (randomize) {
                let isLive = Math.random() < .5;

                grid[r][c] = createCell(r, c, isLive);
            } else {
                grid[r][c] = createCell(r, c);
            }
        }
    }

    return grid;
}

/**
 * Высчитывает новую сетку с новым поколением клеток согласно правилам игры
 * @param {[[{row: number, col: number, alive: boolean}]]} grid - Сетка
 * @returns {[[{row: number, col: number, alive: boolean}]]} - Новая сетка
 */
function computeGrid(grid) {
    let nextGrid = createGrid(grid.length);

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid.length; c++) {
            let cell = grid[r][c];
            let numNeighbors = countNeighbors(grid, cell);
            
            if (cell.alive) {
                if (numNeighbors < 2) { // cell dies
                    nextGrid[r][c].alive = false;
                } else if (numNeighbors === 2 || numNeighbors === 3) { // cell lives
                    nextGrid[r][c].alive = true;
                } else if (numNeighbors > 3) { // cell dies
                    nextGrid[r][c].alive = false;
                }
            } else {
                if (numNeighbors === 3) {
                    nextGrid[r][c].alive = true; // cell becomes alive
                }
            }
        }
    }

    return nextGrid;
}

/**
 * Формирует строковое представление сетки
 * @param {[[{row: number, col: number, alive: boolean}]]} grid - Сетка
 * @returns {string} - Строковое представление сетки
 */
function renderGrid(grid) {
    let output = '';

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let cell = grid[i][j];

            if (cell.alive) {
                output += '* ';
            } else {
                output += '  ';
            }

            if (cell.col === grid.length - 1) {
                output += '\r\n';
            }
        }
    }

    return output;
}

module.exports = {
    createCell,
    countNeighbors,
    createGrid,
    computeGrid,
    renderGrid
};