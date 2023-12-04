import { Todo } from "../types/global_type";
import { useContext } from "react";
import { TodoContext } from "../context/todoContext";
import TodoItem from "./TodoItem";

type TodoListProps = {
  getFetchedTodos: () => void;
};

const TodoList = ({ getFetchedTodos }: TodoListProps) => {
  const { todos } = useContext(TodoContext);

  return (
    <ul className="mx-20">
      {todos?.length > 0 &&
        todos?.map((todoObj: Todo) => {
          const { _id, todo, isCompleted } = todoObj;
          return (
            <TodoItem key={_id} getFetchedTodos={getFetchedTodos} _id={_id} todo={todo} isCompleted={isCompleted} />
          );
        })}
    </ul>
  );
};

export default TodoList;
