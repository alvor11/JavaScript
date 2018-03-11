import React from 'react';
import Checkbox from './Checkbox';
import Button from './Button';

function Todo(props) {
    return (
        <div className={`todo${props.completed ? ' completed' : ''}`}>
            <Checkbox checked={props.completed} />
            <span className="todo-title">{props.title}</span>
            <Button className="delete icon" icon='delete' />
        </div>
    );
}

export default Todo;