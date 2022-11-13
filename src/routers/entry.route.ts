import express from "express";
import { signUpValidator } from "../middlewares/users.middlewares.js";
import { signInValidator } from "../middlewares/users.middlewares.js";
import { signUp, signIn } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/signup", signUpValidator, signUp);
router.post("/signin", signInValidator, signIn);

export default router;