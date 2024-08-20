import React from 'react'
import InputWithLabel from './InputWithLabel.jsx'

const AddTodoForm = ({onAddTodo}) => {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    setTodoTitle("");
    onAddTodo(todoTitle);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
        Title:
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTodoForm
