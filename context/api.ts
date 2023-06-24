import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const API_URL = "http://localhost:3001/todos";

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (data: Todo) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const editTask = async (taskId: string, data: Todo) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, {
      title: data.title,
      completed: data.completed,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
