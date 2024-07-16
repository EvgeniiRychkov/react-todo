import TodoListItem from './TodoListItem.jsx'

const TodoList = ({todoList}) => (
  <ul>
    {todoList.map(item => ( <TodoListItem key={item.id} item={item} /> ))}
  </ul>
)
  
export default TodoList