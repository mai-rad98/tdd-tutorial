import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoLists';
import mockData from './mockData';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos').then((response) => 
        response.json()
      );
      setTodos(response.slice(0, 5));
    }
    fetchData();
  }, []);

  return (
    <TodoList todos={todos} />
  );
}

export default App;
