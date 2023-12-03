import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js";

const router = express.Router();

router.post("/create", createTodo);

router.get("/todos", getAllTodos);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

const todoRouter = router;
export default todoRouter;
