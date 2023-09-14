import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../../services/apiRecipe.js";

export const useRecipes = () => {
    const { data: recipes, isLoading } = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    });

    return { recipes, isLoading };
};
