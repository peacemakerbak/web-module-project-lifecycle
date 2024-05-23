import React from 'react';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos';

// main App component that holds state and functions to manipulate todos..
export default class App extends React.Component {
  state = {
    todos: [],
    hideCompleted: false  
  };

  // FETCH request to get todos when the component mounts
  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
          if (data && data.data) {
              this.setState({ todos: data.data });
          }
      })
      .catch(err => console.error('Error fetching todos:', err));
  }

  // Function to add a new todo to the list
  addTodo = (newTodo) => {
    fetch(URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(todo => this.setState({ todos: [...this.state.todos, todo] }))
    .catch(err => console.error('Error adding todo:', err));
  };

  // Function to toggle the completed status of a todo in the list
  toggleComplete = (id) => {
    fetch(`${URL}/${id}`, { method: 'PATCH' })
      .then(response => response.json())
      .then(updatedTodo => {
        this.setState({
          todos: this.state.todos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        });
      })
      .catch(err => console.error('Error toggling todo:', err));
  };

  // Function to toggle the visibility of completed todos 
  toggleHideCompleted = () => {
    this.setState(prevState => ({
      hideCompleted: !prevState.hideCompleted
    }));
  };

  render() {
    const { todos, hideCompleted } = this.state;
    const visibleTodos = hideCompleted ? todos.filter(todo => !todo.completed) : todos;

    return (
      <div>
        <TodoList todos={visibleTodos} toggleComplete={this.toggleComplete} />
        <Form 
          addTodo={this.addTodo} 
          toggleHideCompleted={this.toggleHideCompleted}
          hideCompleted={hideCompleted}
        />
      </div>
    );
  }
}
