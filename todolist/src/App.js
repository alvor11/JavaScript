import React from 'react';
import PropTypes from 'prop-types';


import Header from './components/Header';
import Todo from './components/Todo';

function App(props) {
    console.log(props);
    return (
        <main>
            <Header title={props.title} />
            <section className="todo-list">
            {props.todos.map(todo =>
                <Todo title={todo.title} completed={todo.completed} />)

            }
                
            </section>
        </main>
    )
}

App.propTypes = {
    title: PropTypes.string
};

App.defaultProps = {
    title: 'Todo list'
};

export default App;