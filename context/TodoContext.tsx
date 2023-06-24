import React, { createContext, useState, useEffect } from "react";
import { getTasks, addTask, editTask, deleteTask } from "./api";
import { Todo } from "./api";

interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (id: string, task: Todo) => void;
  deleteTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
});

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTodos(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTodo = async (todo: Todo) => {
    try {
      const newTodo = await addTask(todo);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTodo = async (id: string, task: Todo) => {
    try {
      await editTask(id, task);
      const updatedTodo = todos.map((todo) => (todo.id === id ? task : todo));
      setTodos(updatedTodo);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTask(id);
      const deletedTodo = todos.filter((todo) => todo.id !== id);
      setTodos(deletedTodo);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
