import React from 'react'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'

const App = () => {
  const [todoList, setTodoList] = React.useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList}/>  
    </div>
  )
}

export default App
