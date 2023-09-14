import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe as deleteRecipeApi } from "../../services/apiRecipe.js";
import toast from "react-hot-toast";

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteRecipe, isLoading: isDeleting } = useMutation({
        mutationFn: deleteRecipeApi,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["recipes"],
            });
            toast.success("Recipe successfully deleted");
        },
        onError: error => console.log(error),
    });

    return { deleteRecipe, isDeleting };
};
