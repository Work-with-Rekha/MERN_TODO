import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./models/todo.js";
import todoRouter from "./routes/todo.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongodb_url = process.env.MONGODB_URL;
mongoose
  .connect(mongodb_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api", todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
