import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./components/TaskCard";
import { addTodo, cancelEdit, saveEdit, setTodos } from "./store/todoSlices";
import { getAllItems } from "./utils/axiosInstance";
import useToastChildrenChange from "./components/ToastChildrenChange";

const App = () => {
  const dispatch = useDispatch();
  const { todos, editingId, editingText, filter } = useSelector(
    (state) => state.todo
  );
  const [newTodo, setNewTodo] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  useToastChildrenChange(() => {
    console.log("Toast children changed");
    handleRefresh();
  });

  useEffect(() => {
    (async () => {
      try {
        const items = await getAllItems();
        dispatch(setTodos(items.data));
        console.log("Fetched todo items:", items);
      } catch (error) {
        console.error("Error fetching todo items:", error);
      }
    })();
  }, []);

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    dispatch(
      addTodo({
        text: newTodo,
        description: newTodoDescription,
      })
    );
    setNewTodo("");
    setNewTodoDescription("");
  };

  const handleRefresh = async () => {
    try {
      dispatch(setTodos([]));
      const items = await getAllItems();
      dispatch(setTodos(items.data));
    } catch (error) {}
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") dispatch(saveEdit());
    if (e.key === "Escape") dispatch(cancelEdit());
  };

  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo) =>
        filter === "all"
          ? true
          : filter === "active"
            ? !todo.completed
            : todo.completed
      )
    : [];

  return (
    <div className="container bg-white p-4 rounded-3 shadow">
      <Toaster />
      <h2 className="text-center mb-4 text-dark">My Todo List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Description (optional)"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button className="btn btn-primary mb-3" onClick={handleAdd}>
          <i className="bi bi-plus"></i> Add
        </button>
        <button className="btn btn-secondary mb-3" onClick={handleRefresh}>
          <i className="bi bi-arrow-repeat"></i> Refresh
        </button>
      </div>

      <div>
        {todos && todos.length === 0 ? (
          <div>
            <span className="text-center text-muted">No tasks available.</span>
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              editingId={editingId}
              editingText={editingText}
              handleEditKeyPress={handleEditKeyPress}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
