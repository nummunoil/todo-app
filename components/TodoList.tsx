import React, { useContext, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TaskFilter from "./TaskFilter";
import { Todo } from "../context/api";
import { TodoContext } from "../context/TodoContext";

const TodoList: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const [filter, setFilter] = useState<string>("all");
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  useEffect(() => {
    const applyFilter = () => {
      let filteredTasks: Todo[] = [];

      if (filter === "all") {
        filteredTasks = todos;
      } else {
        const isCompleted = filter === "completed";
        filteredTasks = todos.filter((task) => task.completed === isCompleted);
      }

      setTodoList(filteredTasks);
    };

    applyFilter();
  }, [todos, filter]);

  const handleFilterChange = (selectedStatus: string) => {
    setFilter(selectedStatus);
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const progress = (completedTodos.length / todos.length) * 100;

  return (
    <div className="todo-list">
      <div className="summary-box">
        <h3>Progress</h3>
        <div className="percent-bar">
          <div
            className="progress"
            style={{ width: `${progress ? progress : 0}%` }}
          ></div>
        </div>
        <h5>{completedTodos.length} Completed</h5>
      </div>
      <div className="task-label">
        <h3>Tasks</h3>
        <TaskFilter onFilterChange={handleFilterChange} />
      </div>
      <ul className="tasks">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      <TodoForm />
    </div>
  );
};

export default TodoList;
