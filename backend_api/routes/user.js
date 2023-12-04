import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

const userRouter = router;
export default userRouter;
