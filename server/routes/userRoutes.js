import express from "express";
import { getAllUser, getCurrentUser } from "../controllers/userController.js";
import {
    login,
    logout,
    protect,
    register,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllUser);
router.route("/current").get(protect, getCurrentUser);

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
