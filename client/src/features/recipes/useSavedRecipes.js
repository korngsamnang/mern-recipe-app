import { useQuery } from "@tanstack/react-query";
import { getSaveRecipes } from "../../services/apiRecipe.js";

export const useSavedRecipes = () => {
    const { data: savedRecipes, isLoading } = useQuery({
        queryKey: ["savedRecipes"],
        queryFn: getSaveRecipes,
    });

    return { savedRecipes, isLoading };
};
