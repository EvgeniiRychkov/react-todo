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

function TodoList() {
  return (
    <ul>
      {todoList.map(function (item) {
        return (
          <li key={item.id}>{item.title}</li>
        );
      })}
    </ul>
  )
}
  
export default TodoList