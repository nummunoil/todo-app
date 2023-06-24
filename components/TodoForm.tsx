import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../context/TodoContext";
import { Todo } from "../context/api";

const TodoForm: React.FC = () => {
  const { addTodo } = useContext(TodoContext);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const newTodo: Todo = {
      id: uuidv4(),
      title: text,
      completed: false,
    };

    addTodo(newTodo);
    setText("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        placeholder="Add your todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default TodoForm;
