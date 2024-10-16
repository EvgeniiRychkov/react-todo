import React from 'react'

import styles from './TodoListItem.module.css';
import TimeFormatter from './TimeFormatter.jsx';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TodoListItem = ({item, elapsedTime, onRemoveTodo, onStartTodo, onStopTodo}) => {
  return (
    <tr>
      <td className='title-column'>
        <Link to={`${import.meta.env.VITE_BASE_PATH}/todos/${item.id}`}> 
          {item.title}
        </Link>
      </td>
      <td><TimeFormatter seconds={Number(item.total_duration)} /></td>
      <td><TimeFormatter seconds={Number(item.today_duration)} /></td>
      <td className='button-column'>
        {item.isCurrent ? (
          <button type="button" className={`btn btn-primary ${styles.stopButton}`} onClick={() => onStopTodo(item.id)}>
            <TimeFormatter seconds={elapsedTime} />
          </button>
        ) : (
          <button type="button" className="btn btn-light" onClick={() => onStartTodo(item.id)}>
            <i className="bi bi-stopwatch"></i>
          </button>
        )}
      </td>
      <td className='delete-column button-column'>
        <button type="button" className={`btn ${styles.pinkButton}`} onClick={() => onRemoveTodo(item.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onStartTodo: PropTypes.func.isRequired,
  onStopTodo: PropTypes.func.isRequired,
};
  
export default TodoListItem