import React from "react";

const TodoList = ({ todos }) => {
  return <div>
    {todos.map((todo, index) => (
        <div key={index}>{todo.title}</div>
    ))}
  </div>;
};

export default TodoList;