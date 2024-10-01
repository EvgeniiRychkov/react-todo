import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types'

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

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};
  
export default TodoListItem