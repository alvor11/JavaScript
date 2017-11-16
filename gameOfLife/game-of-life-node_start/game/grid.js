'use strict';

/**
 * Создает объект клетки
 * @param {number} row - Индекс ряда
 * @param {number} col - Индекс колонки
 * @param {boolean} [alive=false] - Живая ли клетка
 * @returns {{row: number, col: number, alive: boolean}} Объект клетки со свойствами row, col и alive
 */
function createCell(row, col, alive = false) {
    // вернуть объект сетки
    return {row: row, col: col, alive: alive};
}

/**
 * Считает количество соседей вокруг клекти
 * @param {[[{row: number, col: number, alive: boolean}]]} grid - Сетка
 * @param {{row: number, col: number, alive: boolean}} cell - Клетка
 * @returns {number} - Количество соседей
 */
function countNeighbors(grid, cell) {
    // начнем с нуля
    let count = 0;
    let i = cell.row;
    let j = cell.col;
    // +1 если сверху есть живая клетка
    if(j - 1 >= 0){
        if(grid[i][j - 1].alive) ++count; 
    } 
    // +1 если сверху слева есть живая клетка
    if(j - 1 >= 0 && i - 1 >= 0){
        if(grid[i - 1][j - 1].alive) ++count; 
    }
    // +1 если сверху справа есть живая клетка
    if(j - 1 >= 0 && i + 1 <= grid.length){
        if(grid[i + 1][j - 1].alive) ++count; 
    }
    // +1 если слева есть живая клетка
    if(i - 1 >= 0){
        if(grid[i - 1][j].alive) ++count; 
    }
    // +1 если справа есть живая клетка
    if(i + 1 <= grid.length){
        if(grid[i + 1][j].alive) ++count; 
    }
    // +1 если снизу есть живая клетка
    if(j + 1 <= grid[0].length){
        if(grid[i][j + 1].alive) ++count; 
    } 
    // +1 если снизу слева есть живая клетка
    if(j + 1 <= grid[0].length && i - 1 >= 0){
        if(grid[i - 1][j + 1].alive) ++count; 
    } 
    // +1 если снизу справа есть живая клетка
    if(j + 1 <= grid[0].length && i + 1 <= grid.length){
        if(grid[i + 1][j + 1].alive) ++count; 
    } 
    // вернуть количество соседей
    return count;
}

/**
 * Создает сетку
 * @param {number} size - Размер сетки
 * @param {boolean} [randomize=false] - Случайное определение состояния клеток в сетке
 * @returns {[[{row: number, col: number, alive: boolean}]]} - Сетка
 */
function createGrid(size, randomize = false) {
    // создать массив определенного размера (new Array(size))
    const array = [];
    for (var i = 0; i < size; i++) {
        // внутри массива создать еще массивы
        array[i] = [];
        for (var j = 0; j < size; j++) {
            // в каждый элемент массива поместить клетку
            // либо в разнобой (50% что клетка жива, 50% что клетка мертва)
           function random (){
                if (Math.floor(Math.random() * 10) > 5){
                return true;
              } else return false; }
            // либо начальное состояние (клетка мертва) 
            array[i][j] = createCell(i, j, random());
        }  
    }
    // вернуть сетку
    return array;
}

/**
 * Высчитывает новую сетку с новым поколением клеток согласно правилам игры
 * @param {[[{row: number, col: number, alive: boolean}]]} grid - Сетка
 * @returns {[[{row: number, col: number, alive: boolean}]]} - Новая сетка
 */
function computeGrid(grid) {
    // создать новую сетку
    let newGrid = grid;
    // взяв одну клетку текущей сетки
        // посчитать количество соседей
        // изменить состояние клетки в новой сетке согласно правилам игры
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            let temp = countNeighbors(grid, grid[i][j]);
            if(grid[i][j].alive == true && temp < 2 && temp > 3) newGrid[i][j].alive = false;
            if(grid[i][j].alive == false && temp == 3) newGrid[i][j].alive = true;    
        }
        
    }
    // вернуть новую сетку
    return newGrid;
}

/**
 * Формирует строковое представление сетки
 * @param {[[{row: number, col: number, alive: boolean}]]} grid - Сетка
 * @returns {string} - Строковое представление сетки
 */
function renderGrid(grid) {
    // начнем с пустой строки
    let string = ``;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
        let temp =  cba[3][2].alive ? `#`: ` `;
        string += `[${temp}]`;    
        }
        string += '\n';
    }
    
    // взяв одну клетку
        // если клетка жива добавить '* ' (звездочка пробел) в строку
        // иначе добавить '  ' (два пробела)
        // если клетка последняя в ряду, перейти на следующую строку (\r\n)

    // вернуть готовую строку
    return string;
}

module.exports = {
    createCell,
    countNeighbors,
    createGrid,
    computeGrid,
    renderGrid
};