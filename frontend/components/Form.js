import React from 'react';

export default class Form extends React.Component {
  state = {
    inputValue: ''  
  };

  // Updates state as user types in the input field
  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  // submitting the new todo
  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.inputValue.trim()) return;
    const newTodo = { name: this.state.inputValue, completed: false };
    this.props.addTodo(newTodo);
    this.setState({ inputValue: '' });  // ability to clear input field after submission
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="enter list here"
        />
        <button type="submit">Add To List</button>
        <button type="button" onClick={this.props.toggleHideCompleted}>
          {this.props.hideCompleted ? "Show Completed" : "Hide Completed"}
        </button>
      </form>
    );
  }
}
