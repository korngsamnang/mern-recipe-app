import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savedRecipe as savedRecipeApi } from "../../services/apiRecipe.js";
import toast from "react-hot-toast";

export const useSavedRecipe = () => {
    const queryClient = useQueryClient();
    const { mutate: savedRecipe, isLoading } = useMutation({
        mutationFn: recipeId => savedRecipeApi(recipeId),
        onSuccess: async () => {
            // Invalidate the user query to force a refresh
            queryClient.invalidateQueries({
                queryKey: ["user"], // Update with the correct query key for user data
            });
            // Invalidate the recipes query as well if needed
            queryClient.invalidateQueries({
                queryKey: ["recipes"],
            });
            toast.success("Recipe successfully saved");
        },
        onError: error => {
            alert(error);
        },
    });

    return { savedRecipe, isLoading };
};
