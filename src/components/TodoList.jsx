import TodoListItem from './TodoListItem.jsx'
import PropTypes from 'prop-types'

const TodoList = ({todoList, elapsedTime, onRemoveTodo, onStartTodo, onStopTodo}) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Duration</th>
        <th>Duration today</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        {todoList.map(item => (
          <TodoListItem 
            key={item.id}
            item={item} 
            elapsedTime={elapsedTime}
            onRemoveTodo={onRemoveTodo} 
            onStartTodo={onStartTodo} 
            onStopTodo={onStopTodo}/> 
        ))}
    </tbody>
  </table>
)

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onStartTodo: PropTypes.func.isRequired,
  onStopTodo: PropTypes.func.isRequired,
};
  
export default TodoList