import express from "express";
import {
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getSavedRecipes,
    savedRecipe,
} from "../controllers/recipeController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllRecipes);
router.route("/").patch(protect, savedRecipe);
router.route("/").post(protect, createRecipe);
router.route("/saved").get(protect, getSavedRecipes);

router.route("/:id").delete(protect, deleteRecipe);

export default router;
