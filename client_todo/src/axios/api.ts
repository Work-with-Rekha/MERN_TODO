import { axiosApi } from ".";
import { toast } from "react-toastify";
import { Todo } from "../types/global_type";

async function fetchTodos() {
  try {
    const response = await axiosApi.get("/todos", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response?.data;
  } catch (error: any) {
    handleError(error);
  }
}

async function addTodo(todoBody: Partial<Todo>) {
  try {
    const response = await axiosApi.post("/create", JSON.stringify(todoBody), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(response?.data?.message);
  } catch (error: any) {
    handleError(error);
  }
}

async function updateCheckBox(todo: string, isCompleted: boolean, todoId: string) {
  try {
    const updatedTodo = {
      todo: todo,
      isCompleted: isCompleted,
    };
    const response = await axiosApi.put(`/update/${todoId}`, JSON.stringify(updatedTodo), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response?.data?.message);
  } catch (error: any) {
    handleError(error);
  }
}

async function updateTodo(todo: string, isCompleted: boolean, todoId: string) {
  try {
    const updatedTodo = {
      todo: todo,
      isCompleted: isCompleted,
    };
    const response = await axiosApi.put(`/update/${todoId}`, JSON.stringify(updatedTodo), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response?.data?.message);
  } catch (error: any) {
    handleError(error);
  }
}

async function deleteTodo(todoId: string) {
  try {
    const response = await axiosApi.delete(`/delete/${todoId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(response?.data?.message);
  } catch (error) {}
}

function handleError(error: any) {
  if (error.response && error.response.status === 400) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.response.data.message);
  }
}

export { fetchTodos, addTodo, updateCheckBox, deleteTodo, updateTodo };
