import TodoListItem from './TodoListItem.jsx'

const todoList = [
  {
    id: 1,
    title: 'Complete assignment',
  },
  {
    id: 2,
    title: 'Сall for interview',
  },
  {
    id: 3,
    title: 'Feed the cats',
  },
];

const TodoList = () => (
  <ul>
    {todoList.map(item => ( <TodoListItem key={item.id} item={item} /> ))}
  </ul>
)
  
export default TodoList