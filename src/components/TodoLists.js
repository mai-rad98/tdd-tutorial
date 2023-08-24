import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, removeHandler, updateTodo }) => {
  return <div>
    {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} removeHandler={removeHandler} updateTodo={updateTodo} />
    ))}
  </div>;
};

export default TodoList;