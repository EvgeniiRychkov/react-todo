import React from 'react'
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from "react-router-dom"
import TodoList from './components/TodoList.jsx'
import AddTodoForm from './components/AddTodoForm.jsx'
import styles from './App.module.css';
import './App.css';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

const App = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  const fetchData = async() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title
        }

        return newTodo
      });

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message)
    }
  };

  React.useEffect(() => {
    fetchData();  
  }, []);

  const addTodo = async (newTodoTitle) => {
    const newTodoData = {
      fields: {
        title: newTodoTitle,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(newTodoData),
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      const newTodo = {
        id: dataResponse.id,
        title: dataResponse.fields.title
      }
      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(error.message)
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    }

    try {
      const response = await fetch(`${url}/${id}`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const newTodoList = todoList.filter(
        (todo) => id !== todo.id
      );
    
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={import.meta.env.VITE_BASE_PATH} element={
          <>
            <h1>Todo List</h1>

            <Link to={`${import.meta.env.VITE_BASE_PATH}/new`}> 
              <button className={styles.addTodoButton}>Add New</button>
            </Link>

            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>  
            )}
          </>
        }/>
        <Route path={`${import.meta.env.VITE_BASE_PATH}/new`} element={
            <AddTodoForm onAddTodo={addTodo} />
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
