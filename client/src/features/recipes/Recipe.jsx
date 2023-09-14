import { useRecipes } from "./useRecipes.js";
import { useUser } from "../authentication/useUser.js";
import RecipeItem from "./RecipeItem.jsx";
import LoadingSpinner from "../../ui/LoadingSpinner.jsx";

const Recipe = () => {
    const { recipes, isLoading: isLoadingRecipe } = useRecipes();
    const { user, isLoading } = useUser();

    if (isLoadingRecipe || isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">All Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recipes.data.recipes.map(recipe => (
                    <RecipeItem key={recipe._id} recipe={recipe} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Recipe;
