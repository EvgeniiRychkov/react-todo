import styles from './TodoListItem.module.css';

const TodoListItem = ({item, onRemoveTodo}) => (
  <>
    <li className = {styles.listItem}>
      <div>{item.title}</div>
      <button type="button" className={styles.deleteTodoButton} onClick={() => onRemoveTodo(item.id)}>
        Remove
      </button>
    </li>
  </>
)
  
export default TodoListItem