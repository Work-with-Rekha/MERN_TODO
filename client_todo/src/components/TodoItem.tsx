import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteTodo, updateCheckBox, updateTodo } from "../axios/api";

type TodoItemProps = {
  todo: string;
  _id: string;
  isCompleted: boolean;
  getFetchedTodos: () => void;
};

const TodoItem = ({
  _id,
  isCompleted,
  todo,
  getFetchedTodos,
}: TodoItemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const contentRef = useRef<HTMLParagraphElement>(null);

  const handleCheckedTodo = async (
    e: BaseSyntheticEvent,
    todo: string,
    todoId: string
  ) => {
    await updateCheckBox(todo, e.target.checked, todoId).then(() => {
      getFetchedTodos();
    });
  };

  const handleTodoDeletion = async (todoId: string) => {
    await deleteTodo(todoId).then(() => {
      getFetchedTodos();
    });
  };

  useEffect(() => {
    if (isEditable && contentRef.current) {
      contentRef.current?.focus();
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditable]);

  const editContent = () => {
    setIsEditable(true);
  };

  const saveUpdatedTodo = async () => {
    await updateTodo(todo, isCompleted, _id).then(() => {
      getFetchedTodos();
      setIsEditable(false);
    });
  };

  return (
    <li className="flex justify-start ">
      <div className="flex gap-2 flex-1">
        <input
          type="checkbox"
          onChange={(e) => handleCheckedTodo(e, todo, _id)}
          checked={isCompleted}
        />
        <p
          ref={contentRef}
          contentEditable={isEditable}
          className={isCompleted ? "line-through" : ""}
        >
          {todo}
        </p>
      </div>
      <div className="flex gap-5">
        {isEditable ? (
          <button onClick={saveUpdatedTodo}>Save</button>
        ) : (
          <button onClick={editContent}>
            <MdEdit />
          </button>
        )}
        <button onClick={() => handleTodoDeletion(_id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
