import React, { useState, useRef, useEffect, useContext } from "react";
import Dropdown from "./Dropdown";
import { Todo } from "../context/api";
import { TodoContext } from "../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { editTodo, deleteTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);
  const editRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (editRef.current && !editRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    editTodo(todo.id, { ...todo, title: text });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggleCompletion = () => {
    editTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  const dropdownOptions = [
    { label: "Edit", onClick: () => setIsEditing(true) },
    { label: "Delete", onClick: handleDelete, className: "delete-option" },
  ];

  return (
    <li>
      {!isEditing ? (
        <div className="task-container">
          <div className="todo">
            <input
              className="checkbox-completed"
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleCompletion}
            />
            <span className={todo.completed ? "title-completed" : ""}>
              {todo.title}
            </span>
          </div>
          <div>
            <Dropdown options={dropdownOptions} />
          </div>
        </div>
      ) : (
        <>
          <div ref={editRef}>
            <form className="form-container" onSubmit={handleEdit}>
              <input
                className="input-field"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="btn-save" type="submit">
                Save
              </button>
            </form>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
