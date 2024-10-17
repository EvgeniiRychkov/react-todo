import React from 'react'
import {
  BrowserRouter,
  Link,
  Routes,
  Route
} from "react-router-dom"
import TodoList from './components/TodoList.jsx'
import AddTodoForm from './components/AddTodoForm.jsx'
import TodoDetailForm from './components/TodoDetailForm.jsx'
import './App.css';
import pencilImage from './assets/images/pencil.png';

const url = `${import.meta.env.VITE_RAILS_API_PATH}`

const App = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAscending, setIsAscending] = React.useState(true);

  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);

  React.useEffect(() => {
    fetchData();   
  }, []);

  React.useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
    const sortedTodoList = todoSort(todoList, !isAscending);
    setTodoList(sortedTodoList);
  };

  const todoSort = (todos, asc) => {
    return todos.sort((a, b) => {
      if (asc) {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      } else {
        return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
      }
    });
  }

  const fetchData = async() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    try {
      const response = await fetch(url + '/tasks.json', options);

      if (!response.ok) {
        console.log(response);
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      if (data.current_task_start) {
        setElapsedTime((new Date() - new Date(data.current_task_start)) / 1000);
        setIsRunning(true);
      }
     
      const todos = data.tasks.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.text,
          total_duration: todo.total_duration,
          today_duration: todo.today_duration,
          isCurrent: todo.current,
        }
        
        return newTodo
      });

      const sortedTodoList = todoSort(todos, isAscending);

      setTodoList(sortedTodoList);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message)
    }
  };

  const addTodo = async (newTodoTitle) => {
    const newTodoData = {
      task: {
        text: newTodoTitle,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoData),
    }

    try {
      const response = await fetch(url + '/tasks', options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      const newTodo = {
        id: dataResponse.id,
        title: dataResponse.text,
      }
      setTodoList(todoSort([...todoList, newTodo], isAscending));

    } catch (error) {
      console.log(error.message)
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: 'DELETE',
    }

    try {
      const response = await fetch(`${url}/tasks/${id}`, options);

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

  const startTodo = async (id) => {
    const options = {
      method: 'POST',
    }

    try {
      const response = await fetch(`${url}/tasks/${id}/start`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error.message)
    }

    const updatedTodos = todoList.map(item => {
      return { ...item, isCurrent: item.id === id };
    });
    
    fetchData();
  };

  const stopTodo = async (id) => {
    const options = {
      method: 'POST',
    }

    try {
      const response = await fetch(`${url}/tasks/${id}/stop`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const updatedTodos = todoList.map(item => {
        return { ...item, isCurrent: false };
      });

      fetchData();
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="paper shadow">
        <BrowserRouter>
          <Routes>
            <Route path={import.meta.env.VITE_BASE_PATH} element={
              <>
                <div className="text-end">
                  <button onClick={toggleSortOrder}>
                    Sort: {isAscending ? 'Title (Asc)' : 'Title (Desc)'}
                  </button>
                </div>
                <div className="d-flex align-items-center justify-content-center" style={{ marginBottom: '20px' }}>
                  <img src={pencilImage} alt="Logo" style={{ width: '50px', marginRight: '10px', marginBottom: '10px' }} />
                  <h1 className="text-center">Todo List</h1>
                </div>

                <AddTodoForm onAddTodo={addTodo} />

                {isLoading ? (
                  <p>Loading ...</p>
                ) : (
                  <TodoList 
                    todoList={todoList}
                    elapsedTime={elapsedTime}
                    onRemoveTodo={removeTodo} 
                    onStartTodo={startTodo} 
                    onStopTodo={stopTodo}/>  
                )}  
              </>           
            }/>
            <Route path={`${import.meta.env.VITE_BASE_PATH}/new`} element={
              <AddTodoForm onAddTodo={addTodo} />
            }/>
            <Route path={`${import.meta.env.VITE_BASE_PATH}/todos/:id`} element={
              <TodoDetailForm todoList={todoList}/>
            } />      
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
