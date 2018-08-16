import React from "react";
import { connect } from "react-redux";
import List from "./List";
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo
} from "../actions/todos";

class Todos extends React.Component {
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          placeholder="Add Todo"
          ref={input => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List
          toggle={this.toggleItem}
          items={this.props.todos}
          remove={this.removeItem}
        />
      </div>
    );
  }

  addItem = event => {
    event.preventDefault();
    this.props.dispatch(handleAddTodo(
      this.input.value,
      () => this.input.value = ""
    ));
  };

  removeItem = todo => {
    this.props.dispatch(handleDeleteTodo(todo));
  };

  toggleItem = (id) => {
    this.props.dispatch(handleToggleTodo(id));
  };
}

export default connect(state => ({
  todos: state.todos
}))(Todos);