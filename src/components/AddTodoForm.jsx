import React from 'react'
import InputWithLabel from './InputWithLabel.jsx'
import PropTypes from 'prop-types'

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
    <div className='mb-4' >
      <form onSubmit={handleAddTodo}>
        <div className="row align-items-center">    
          <InputWithLabel title={todoTitle} handleTitleChange={handleTitleChange} inputID='todoTitle'>
            New Todo:
          </InputWithLabel>
          <div className="col-auto">
            <button className="btn btn-success" type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};


export default AddTodoForm
