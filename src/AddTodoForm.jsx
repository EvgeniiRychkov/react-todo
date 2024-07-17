import React from 'react'

const AddTodoForm = ({onAddTodo}) => {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    setTodoTitle("");
    onAddTodo({title: todoTitle, id: Date.now()});
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input id="todoTitle" name="title" type="text" value={todoTitle} onChange={handleTitleChange}/>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTodoForm
