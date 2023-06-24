import React from "react";
import TodoList from "../components/TodoList";
import { TodoProvider } from "../context/TodoContext";

const IndexPage: React.FC = () => {
  return (
    <div className="container">
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </div>
  );
};

export default IndexPage;
