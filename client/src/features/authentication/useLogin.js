import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ username, password }) => loginApi(username, password),

        onSuccess: user => {
            console.log(user);
            queryClient.setQueryData(["user"], user);
            navigate("/", { replace: true });
        },
        onError: error => {
            // console.log("ERROR", error);
            // alert(error);
            toast.error(error.message);
        },
    });

    return { login, isLoading };
};
