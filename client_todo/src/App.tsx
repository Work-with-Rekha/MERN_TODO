import "./App.css";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { TodoContext } from "./context/todoContext";
import { addTodo, fetchTodos } from "./axios/api";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState("");

  const { setTodos } = useContext(TodoContext);

  async function getFetchedTodos() {
    const todos = await fetchTodos();
    setTodos(todos);
  }

  useEffect(() => {
    getFetchedTodos();
  }, []);

  const handleInput = (e: BaseSyntheticEvent) => {
    setTodo(e.target.value);
  };

  const addTodoHandler = async () => {
    if (!todo.trim()) {
      toast.error("Todo is required");
      setTodo("");
      return;
    }

    const todoBody = {
      todo: todo.trim(),
    };

    await addTodo(todoBody).then(() => {
      setTodo("");
      getFetchedTodos();
    });
  };

  return (
    <div className="flex flex-col items-center mx-96 min-h-screen gap-10">
      <h1 className="text-3xl font-bold ">Todo App</h1>

      {/* Todo Input */}
      <div className="flex gap-3">
        <input className="border border-1 border-black rounded" type="text" onChange={handleInput} value={todo} />
        <button
          id="myButton"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTodoHandler}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full">
        <TodoList getFetchedTodos={getFetchedTodos} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

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
