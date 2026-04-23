/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setFilter,
} from "../JS/Action/action";

const TaskCard = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.description);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(!isEditing);
    
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <div className={`task-card ${todo.isDone ? "done" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => onToggle(todo.id)}
          className="task-checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="task-edit-input"
            autoFocus
          />
        ) : (
          <span className={`task-text ${todo.isDone ? "completed" : ""}`}>
            {todo.description}
          </span>
        )}
      </div>
      <div className="task-actions">
        <button onClick={handleEdit} className="task-btn edit-btn">
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="task-btn delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default function Todo() { 
  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");

  const { todos, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim() && text.length < 100) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const getFilteredTodos = () => {
    let filtered = todos;

    // Apply status filter
    if (filter === "done") {
      filtered = filtered.filter((todo) => todo.isDone);
    } else if (filter === "pending") {
      filtered = filtered.filter((todo) => !todo.isDone);
    }

    // Apply search filter
    if (searchText.trim()) {
      filtered = filtered.filter((todo) =>
        todo.description.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return filtered;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className="main">
      <h1>Todo App</h1>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <div className="filter-buttons">
          <button
            onClick={() => dispatch(setFilter("all"))}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => dispatch(setFilter("pending"))}
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          >
            Pending ({todos.filter((t) => !t.isDone).length})
          </button>
          <button
            onClick={() => dispatch(setFilter("done"))}
            className={`filter-btn ${filter === "done" ? "active" : ""}`}
          >
            Done ({todos.filter((t) => t.isDone).length})
          </button>
        </div>
      </div>

      {/* Add Todo Section */}
      <div className="add-todo-section">
        <h2>Add New Task</h2>
        <div className="add-todo-inputs">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="todo-input"
            maxLength="100"
          />
          <button
            onClick={handleAddTodo}
            className="add-btn"
            disabled={!text.trim()}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        <h2>Tasks ({filteredTodos.length})</h2>
        {filteredTodos.length === 0 ? (
          <p className="no-tasks">
            {searchText ? "No tasks match your search." : "No tasks to show."}
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              onToggle={(id) => dispatch(toggleTodo(id))}
              onEdit={(id, description) => dispatch(editTodo(id, description))}
              onDelete={(id) => dispatch(deleteTodo(id))}
            />
          ))
        )}
      </div>
    </div>
  );
}
