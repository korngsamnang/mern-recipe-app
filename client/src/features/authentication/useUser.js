import { getCurrentUser } from "../../services/apiAuth.js";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    return { isLoading, user, isAuthenticated: user?.isAuthenticated };
};
