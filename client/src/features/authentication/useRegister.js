import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRegister = () => {
    const navigate = useNavigate();
    const { mutate: register, isLoading } = useMutation({
        mutationFn: ({ username, password }) => registerApi(username, password),

        onSuccess: () => {
            // queryClient.setQueryData(["user"], user);
            navigate("/login", { replace: true });
            toast.success("Register successful");
        },
        onError: error => {
            // console.log("ERROR", error);
            // alert(error);
            toast.error(error.message);
        },
    });

    return { register, isLoading };
};
