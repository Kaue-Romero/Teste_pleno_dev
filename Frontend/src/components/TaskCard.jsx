import { useDispatch, useSelector } from "react-redux";
import {
  cancelEdit,
  deleteTodo,
  saveEdit,
  setEditingText,
  setEditingTextDescription,
  startEditing,
  updateTodoStatus,
} from "../store/todoSlices";

export default function TaskCard({ todo }) {
  const dispatch = useDispatch();

  const editingId = useSelector((state) => state.todo?.editingId);
  const editingText = useSelector((state) => state.todo?.editingText);
  const editingTextDescription = useSelector(
    (state) => state.todo?.editingTextDescription
  );

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") dispatch(saveEdit());
    if (e.key === "Escape") dispatch(cancelEdit());
  };

  return (
    <div
      className={`list-group-item d-flex align-items-center justify-content-between px-3 py-3 rounded shadow-sm mb-2 ${
        todo.completed ? "bg-light text-muted" : "bg-white"
      }`}
    >
      <div className="d-flex align-items-center flex-grow-1 me-3">
        <select
          id={"Status" + todo.id}
          className="form-select form-select-sm w-auto me-3"
          value={todo.status}
          onChange={(e) =>
            dispatch(updateTodoStatus({ id: todo.id, status: e.target.value }))
          }
          title="Change Status"
        >
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="concluded">Concluded</option>
        </select>

        <div className="flex-grow-1">
          {editingId === todo.id ? (
            <div className="d-flex w-100 gap-2 align-items-start">
              <div className="d-flex flex-column flex-grow-1 gap-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder={todo.title}
                  value={editingText}
                  onChange={(e) => dispatch(setEditingText(e.target.value))}
                />
                <input
                  className="form-control"
                  type="text"
                  placeholder={todo.description}
                  value={editingTextDescription}
                  onChange={(e) =>
                    dispatch(setEditingTextDescription(e.target.value))
                  }
                  onKeyDown={handleEditKeyPress}
                />
              </div>

              <div className="d-flex flex-row gap-2 mt-auto">
                <button
                  className="btn btn-success"
                  onClick={() => dispatch(saveEdit())}
                >
                  <i className="bi bi-check"></i>
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => dispatch(cancelEdit())}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-1">
              <>
                <span
                  className={`fw-semibold d-inline-block text-truncate ${
                    todo.completed ? "text-decoration-line-through" : ""
                  }`}
                  style={{ maxWidth: "250px" }}
                  title={todo.title}
                >
                  {todo.title}
                </span>
                <div
                  className={`text-muted ${todo.completed ? "text-decoration-line-through" : ""}`}
                  style={{
                    maxHeight: "200px",
                    maxWidth: "250px",
                    overflowY: "auto",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                    marginBottom: "8px",
                  }}
                  title={todo.description}
                >
                  {todo.description}
                </div>
              </>
              <small className="text-muted">
                Created:{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(
                  (() => {
                    const d = new Date(todo.created_at);
                    return isNaN(d.getTime()) ? new Date() : d;
                  })()
                )}
              </small>
            </div>
          )}
        </div>
      </div>

      {editingId !== todo.id && (
        <div className="btn-group">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() =>
              dispatch(
                startEditing({
                  id: todo.id,
                  text: todo.text,
                  description: todo.description,
                })
              )
            }
            title="Edit"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => dispatch(deleteTodo(todo.id))}
            title="Delete"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
}
