import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide recipe name"],
    },
    ingredients: [
        {
            type: String,
            require: [true, "Please provide some ingredients"],
        },
    ],
    instructions: {
        type: String,
        require: [true, "Please provide instructions"],
    },
    imageUrl: {
        type: String,
        require: [true, "Please provide an image"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    cookingTime: {
        type: Number,
        required: [true, "Please provide cooking time (mn)"],
    },
    userOwner: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Recipe must belong to a user!"],
    },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
