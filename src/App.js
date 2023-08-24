import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoLists';
import mockData from './mockData';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);

  function onChange(e) {
    const value = e.target.value;
    setNewTodo(value);
  }

  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      completed: false,
    };
    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json())
    .then((result) => {
      setTodos(todos.concat({...result, id: value.id}));
      setSaving(false);
    });
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos').then((response) => 
        response.json()
      );
      setTodos(response.slice(0, 5));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function updateTodo(id) {
    const newList = todos.map((todoItem) => {
      if(todoItem.id === id) {
        const updateItem = { ...todoItem, completed: !todoItem.completed};
        return updateItem
      }
      return todoItem;
    });
    setTodos(newList);
  }

  return (
    <div className='App'>
      {isLoading ? "Loading" : <TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo}/>}
      <div className='add-todo-form'>
        {saving ? ("Saving") : (
          <form onSubmit={addTodo}>
            <input type='text' onChange={onChange} />
            <button type='submit'>Add new todo</button>
          </form>
        ) }
      </div>
    </div>
  );
}

export default App;
