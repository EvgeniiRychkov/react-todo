import React from 'react'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'

const App = () => {
  const [newTodo, setNewTodo] = React.useState('');

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={setNewTodo} />

      <p>{newTodo}</p>

      <TodoList />  
    </div>
  )
}

export default App
