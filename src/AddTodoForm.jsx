import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import InputWithLabel from './InputWithLabel.jsx'
import styles from './AddTodoForm.module.css'

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
    navigate(import.meta.env.VITE_BASE_PATH);
  }

  return (
    <>
      <h1>New Todo List</h1>

      <Link to={import.meta.env.VITE_BASE_PATH}>
        <button className={styles.backButton} type="button">Back</button>
      </Link>

      <form onSubmit={handleAddTodo}>
        <div className={styles.container}>
          <InputWithLabel todoTitle={todoTitle} handleTitleChange={handleTitleChange}>
            Title:
          </InputWithLabel>
          <button className={styles.addTodoButton} type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default AddTodoForm
