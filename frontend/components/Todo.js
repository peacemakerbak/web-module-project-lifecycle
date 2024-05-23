import React from 'react';

// Component for a single todo item
export default class Todo extends React.Component {
  render() {
    const { todo, toggleComplete } = this.props;
    
    return (
      <li onClick={() => toggleComplete(todo.id)}>
        {todo.name}
        {todo.completed && ' 🍉'} 
      </li>
    );
  }
}

