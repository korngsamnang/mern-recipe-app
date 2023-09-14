import Recipe from "../models/recipeModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.find({});

    res.status(200).json({
        status: "success",
        result: recipes.length,
        data: {
            recipes,
        },
    });
};

export const getSavedRecipes = catchAsync(async (req, res) => {
    console.log();
    const savedRecipes = await Recipe.find({
        _id: { $in: req.user.savedRecipes },
    });
    res.status(200).json({
        status: "success",
        data: {
            savedRecipes,
        },
    });
});

//
// router.get("/savedRecipesId/:userID", async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.params.userID);
//         res.json({ savedRecipes: user.savedRecipes });
//     } catch (err) {
//         res.json(err);
//     }
// });

export const savedRecipe = catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.body.recipeId);
    const { user } = req;

    user.savedRecipes.push(recipe);
    await user.save();

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

export const createRecipe = catchAsync(async (req, res) => {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            recipe: newRecipe,
        },
    });
});

export const deleteRecipe = catchAsync(async (req, res, next) => {
    const doc = await Recipe.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});
