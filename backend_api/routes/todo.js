import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.js";
import verifyToken from "../auth/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createTodo);

router.get("/todos", verifyToken, getAllTodos);

router.put("/update/:id", verifyToken, updateTodo);

router.delete("/delete/:id", verifyToken, deleteTodo);

const todoRouter = router;
export default todoRouter;
