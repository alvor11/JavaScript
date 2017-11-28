class Cell {
    constructor({ element, row, col, alive = false }) {
        // опредлить свойства
        this.element = element;
        this.row = row;
        this.col = col;
        this.alive = alive;
        // доинициализировать свойства в методе `init`
        this.init();
    }

    get alive() {
        // вернуть состояние клетки
        return this.alive;
    }

    set alive(value) {
        // обвновить состояние клетки
        value? this.alive = true: this.alive = false;
        // если клетка жива, присвоить класс `alive`
        // в противном случае убрать класс `alive`
    }

    init() {
        // элементу присвоить класс `cell`
        // если клетка жива присвоить ей класс `alive`
        // подписаться на событие `click` у элемента
    }

    handleClick(event) {
        // при нажатии на клетку изменить ее состояние
    }
}