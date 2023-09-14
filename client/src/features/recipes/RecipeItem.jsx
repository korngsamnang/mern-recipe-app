import { useSavedRecipe } from "./useSavedRecipe.js";
import { useDeleteRecipe } from "./useDeleteRecipe.js";
import { useEffect, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

const RecipeItem = ({ recipe, user }) => {
    const { savedRecipe, isLoading: isSavingRecipe } = useSavedRecipe();
    const { deleteRecipe, isDeleting } = useDeleteRecipe();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(user.data.user.savedRecipes.includes(recipe._id));
    }, [user, recipe._id]);

    const handleSaveRecipe = async () => {
        try {
            await savedRecipe(recipe._id);
            setIsSaved(true); // Update the local state immediately after saving
        } catch (error) {
            console.error("Error saving recipe:", error);
        }
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-semibold mb-2">{recipe.name}</h1>
            <div className="mb-2">
                <button
                    onClick={() => handleSaveRecipe()}
                    disabled={isSaved || isSavingRecipe}
                    className={`px-4 py-2 rounded-md ${
                        isSavingRecipe
                            ? "bg-blue-200 text-gray-600 cursor-not-allowed"
                            : isSaved
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    {isSavingRecipe ? (
                        <SpinnerMini />
                    ) : isSaved ? (
                        "Saved"
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
            <p className="text-gray-700 mb-2">{recipe.instructions}</p>
            <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-auto rounded-md"
            />
            <p className="text-gray-700 mt-2">
                Cooking Time: {recipe.cookingTime} (minutes)
            </p>
            <button
                onClick={() => deleteRecipe(recipe._id)}
                disabled={isDeleting}
                className={`mt-2 px-4 py-2 rounded-md bg-red-500 text-white ${
                    isDeleting ? "cursor-not-allowed" : "hover:bg-red-600"
                }`}
            >
                {isDeleting ? <SpinnerMini /> : "Delete"}
            </button>
        </div>
    );
};

export default RecipeItem;
