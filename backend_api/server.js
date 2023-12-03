import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const todos = [
  {
    id: "1",
    todo: "Eat",
    isCompleted: false,
  },
  {
    id: "2",
    todo: "Learn React.js",
    isCompleted: false,
  },
  {
    id: "3",
    todo: "Toilet",
    isCompleted: true,
  },
];

app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
