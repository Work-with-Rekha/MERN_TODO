import React, { createContext, useState } from "react";
import { Todo } from "../types/global_type";

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoContext = createContext<{
  todos: Todo[] | [];
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | []>>;
}>({
  todos: [],
  setTodos: () => {},
});

const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        setTodos: setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
