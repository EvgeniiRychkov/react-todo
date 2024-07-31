import TodoListItem from './TodoListItem.jsx'

const TodoList = ({todoList, onRemoveTodo}) => (
  <ul>
    {todoList.map(item => (
      <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} /> 
    ))}
  </ul>
)
  
export default TodoList