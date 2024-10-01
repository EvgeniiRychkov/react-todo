import TodoListItem from './TodoListItem.jsx'
import styles from './TodoList.module.css';
import PropTypes from 'prop-types'

const TodoList = ({todoList, onRemoveTodo}) => (
  <ul>
    {todoList.map(item => (
      <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} /> 
    ))}
  </ul>
)

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};
  
export default TodoList