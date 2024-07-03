const AddTodoForm = (props) => {
  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = event.target.title.value;
    event.target.reset();
    
    props.onAddTodo(todoTitle);
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input id="todoTitle" name="title" type="text" />
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTodoForm
