import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoContext } from "../context/todoContext";
import { addTodo, fetchTodos } from "../axios/api";
import TodoList from "../components/TodoList";
import { AuthContext } from "../context/authContext";

function Todo() {
  const [todo, setTodo] = useState("");

  const { setTodos } = useContext(TodoContext);
  const { logout } = useContext(AuthContext);

  async function getFetchedTodos() {
    const { todos } = await fetchTodos();
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

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center  min-h-screen gap-10">
      <div className="w-full flex">
        <h1 className="text-3xl font-bold flex-1 text-center">Todo App</h1>
        <button
          id="myButton"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-5"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-10 flex-col mx-96">
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

export default Todo;
