import { useSavedRecipes } from "./useSavedRecipes.js";
import LoadingSpinner from "../../ui/LoadingSpinner.jsx";

const SavedRecipe = () => {
    const { savedRecipes, isLoading: isLoadingSavedRecipes } =
        useSavedRecipes();

    if (isLoadingSavedRecipes) return <LoadingSpinner />;

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Saved Recipes</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 list-none">
                {savedRecipes.data.savedRecipes.map(recipe => (
                    <li
                        key={recipe._id}
                        className="border border-gray-300 p-4 rounded-lg shadow-md"
                    >
                        <h1 className="text-xl font-semibold mb-2">
                            {recipe.name}
                        </h1>
                        <p className="text-gray-700 mb-2">
                            {recipe.instructions}
                        </p>
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            className="w-full h-auto rounded-md"
                        />
                        <p className="text-gray-700 mt-2">
                            Cooking Time: {recipe.cookingTime} (minutes)
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedRecipe;
