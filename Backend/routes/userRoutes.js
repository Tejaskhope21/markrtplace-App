import express from "express"
import { login, register } from "../controllers/userController.js";

const userRoutes = express.Router();  
router.post("/login", login);
router.post("/register", register);
export default userRoutes;