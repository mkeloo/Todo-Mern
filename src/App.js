import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/'; // use axios to make a GET request to the API_URL

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    GetTodo();
    console.log(todos);
  }, [newTodo]);

  const GetTodo = async () => {
    try {
      const response = await fetch(API_URL + 'todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await fetch(API_URL + 'todo/complete/' + id, {
        method: 'PUT',
      });
      const data = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(API_URL + 'todo/delete/' + id, {
        method: 'DELETE',
      });
      const data = await response.json();
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL + 'todo/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo('');
      setPopupActive(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="main">
      <div className="App">
        <h1>Welcome, Mickey</h1>
        <h4>Your Tasks</h4>

        {todos.length > 0 ? (
          <div className="todos">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className={'todo ' + (todo.complete ? 'is-complete' : '')}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
                <div
                  className="delete-todo"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo._id);
                  }}
                >
                  X
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-todo">Create a New Task</div>
        )}
        <div className="addPopup" onClick={() => setPopupActive(true)}>
          +
        </div>
        {popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}>
              x
            </div>
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default App;
