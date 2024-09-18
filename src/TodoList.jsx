import TodoListItem from './TodoListItem.jsx'
import styles from './TodoList.module.css';

const TodoList = ({todoList, onRemoveTodo}) => (
  <ul>
    {todoList.map(item => (
      <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} /> 
    ))}
  </ul>
)
  
export default TodoList