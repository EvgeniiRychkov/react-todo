import React from 'react'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'

const App = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) =>
      setTimeout(
        () => resolve({ data: {
          todoList: JSON.parse(localStorage.getItem('savedTodoList')),
        } }),
        2000
      )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(
      (todo) => id !== todo.id
    );
  
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={addTodo} />

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>  
      )}   
    </>
  )
}

export default App
