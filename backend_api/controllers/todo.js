import Todo from "../models/todo.js";
import User from "../models/user.js";

export const createTodo = async (req, res) => {
  try {
    if (!req.body.todo) {
      return res.status(400).json({ message: "Todo is required" });
    }

    const userId = req.userId;

    const newTodo = new Todo({
      todo: req.body.todo,
      createdBy: userId,
    });
    const savedTodo = await newTodo.save();

    const user = await User.findById(userId);
    user.todos.push(savedTodo._id);
    await user.save();

    res.status(200).json({ message: "Todo Created Successfully", todo: savedTodo });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is passed in the URL
    const user = await User.findById(userId).populate("todos"); // 'todos' refers to the todos array in the User schema

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.userId;

    const updateTodo = await Todo.findOneAndUpdate(
      {
        _id: todoId,
        createdBy: userId,
      },
      {
        todo: req.body.todo,
        isCompleted: req.body.isCompleted,
      },
      { new: true }
    );

    if (!updateTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo Updated Successfully", todo: updateTodo });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.params.id;

    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, createdBy: userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Issue", error });
  }
};
