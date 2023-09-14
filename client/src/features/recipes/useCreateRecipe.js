import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe as createRecipeApi } from "../../services/apiRecipe.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateRecipe = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: createRecipe, isLoading: isCreating } = useMutation({
        mutationFn: recipe => createRecipeApi(recipe),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recipes"],
            });
            toast.success("Recipe successfully created");
            navigate("/home", { replace: true });
        },
        onError: error => {
            alert(error);
        },
    });
    return { createRecipe, isCreating };
};
