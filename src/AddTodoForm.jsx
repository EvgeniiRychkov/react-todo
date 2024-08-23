import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import InputWithLabel from './InputWithLabel.jsx'

const AddTodoForm = ({onAddTodo}) => {
  const [todoTitle, setTodoTitle] = React.useState("");
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    setTodoTitle("");
    onAddTodo(todoTitle);
    navigate('/');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <Link to="/">
        <button type="button">Back</button>
      </Link>

      <h1>New Todo List</h1>

      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
        Title:
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTodoForm
