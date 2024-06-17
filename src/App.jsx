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

function App() {
  return (
    <div>
      <h1>Todo List</h1>

      <ul>
        {todoList.map(function (item) {
          return (
            <li key={item.id}>{item.title}</li>
          );
        })}
      </ul>
    </div>
  )
}

export default App
