import { axiosApi } from ".";
import { toast } from "react-toastify";
import { Todo, User } from "../types/global_type";

async function fetchTodos() {
  try {
    const token = String(localStorage.getItem("access_token"));
    const cleanToken = token?.replace(/"/g, "");
    const response = await axiosApi.get("/todo/todos", {
      headers: {
        Authorization: "Bearer " + cleanToken,
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
    const token = String(localStorage.getItem("access_token"));
    const cleanToken = token?.replace(/"/g, "");
    const response = await axiosApi.post(
      "/todo/create",
      JSON.stringify(todoBody),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cleanToken,
        },
      }
    );

    toast.success(response?.data?.message);
  } catch (error: any) {
    handleError(error);
  }
}

async function updateCheckBox(
  todo: string,
  isCompleted: boolean,
  todoId: string
) {
  try {
    const token = String(localStorage.getItem("access_token"));
    const cleanToken = token?.replace(/"/g, "");

    const updatedTodo = {
      todo: todo,
      isCompleted: isCompleted,
    };
    const response = await axiosApi.put(
      `/todo/update/${todoId}`,
      JSON.stringify(updatedTodo),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cleanToken,
        },
      }
    );
    toast.success(response?.data?.message);
  } catch (error: any) {
    handleError(error);
  }
}

async function updateTodo(todo: string, isCompleted: boolean, todoId: string) {
  try {
    const token = String(localStorage.getItem("access_token"));
    const cleanToken = token?.replace(/"/g, "");

    const updatedTodo = {
      todo: todo,
      isCompleted: isCompleted,
    };
    const response = await axiosApi.put(
      `/todo/update/${todoId}`,
      JSON.stringify(updatedTodo),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cleanToken,
        },
      }
    );
    toast.success(response?.data?.message);
  } catch (error: any) {
    handleError(error);
  }
}

async function deleteTodo(todoId: string) {
  try {
    const token = String(localStorage.getItem("access_token"));
    const cleanToken = token?.replace(/"/g, "");

    const response = await axiosApi.delete(`/todo/delete/${todoId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cleanToken,
      },
    });

    toast.success(response?.data?.message);
  } catch (error) {
    handleError(error);
  }
}

async function registerUser(user: User) {
  try {
    const response = await axiosApi.post(
      "/user/register",
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success(response?.data?.message);
  } catch (error) {
    handleError(error);
  }
}

function handleError(error: any) {
  if (error.response && error.response.status === 400) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.response?.data?.message);
  }
}

async function loginUser(user: Partial<User>) {
  try {
    const response = await axiosApi.post("/user/login", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
}

export {
  fetchTodos,
  addTodo,
  updateCheckBox,
  deleteTodo,
  updateTodo,
  registerUser,
  loginUser,
};

// try {
//   const todoBody = {
//     todo: todo,
//   };

//   const response = await axiosApi.post("/create", JSON.stringify(todoBody), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = response.data;

//   // const res = await fetch("/create", {
//   //   method: "POST",
//   //   body: JSON.stringify(todoBody),
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // });

//   // const data = await res.json();

//   console.log(data);

//   setTodo("");
// } catch (error) {
//   console.log("frontend", error);
// }
