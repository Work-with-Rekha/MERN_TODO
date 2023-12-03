import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      todo: req.body.todo,
    });

    const savedTodo = await newTodo.save();
    res.status(200).json({ message: "Todo Created Successfully", todo: savedTodo });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updateTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        todo: req.body.todo,
        isCompleted: req.body.isCompleted,
      },
      { new: true }
    );

    res.status(200).json({ message: "Todo Updated Successfully", todo: updateTodo });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};
