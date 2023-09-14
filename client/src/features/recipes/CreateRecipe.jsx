import { useState } from "react";

import { useUser } from "../authentication/useUser.js";
import { useCreateRecipe } from "./useCreateRecipe.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

const CreateRecipe = () => {
    const { createRecipe, isCreating } = useCreateRecipe();
    const { user } = useUser();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: user.data.user._id,
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleIngredientChange = (e, index) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe(prevState => ({
            ...prevState,
            ingredients,
        }));
    };

    const addIngredient = () => {
        setRecipe(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, ""],
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        createRecipe(recipe);
    };
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Create Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="ingredients" className="text-gray-600">
                        Ingredients
                    </label>
                    {recipe.ingredients.map((ingredient, index) => (
                        <input
                            type="text"
                            key={index}
                            name="ingredients"
                            value={ingredient}
                            onChange={e => handleIngredientChange(e, index)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                        />
                    ))}
                    <button
                        onClick={addIngredient}
                        type="button"
                        className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    >
                        Add Ingredient
                    </button>
                </div>

                <div>
                    <label htmlFor="instructions" className="text-gray-600">
                        Instructions
                    </label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="imageUrl" className="text-gray-600">
                        Image
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="cookingTime" className="text-gray-600">
                        Cooking Time (minutes)
                    </label>
                    <input
                        type="number"
                        id="cookingTime"
                        name="cookingTime"
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isCreating}
                    className={`px-4 py-2 rounded-md ${
                        isCreating
                            ? "bg-blue-200 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    }`}
                >
                    {isCreating ? <SpinnerMini /> : "Create Recipe"}
                </button>
            </form>
        </div>
    );
};

export default CreateRecipe;
