import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1/users",
    withCredentials: true,
});

export const register = async (username, password) => {
    try {
        const { data } = await api.post("/register", {
            username,
            password,
        });
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};
export const login = async (username, password) => {
    try {
        // console.log(password, username);
        const { data } = await api.post("/login", {
            username,
            password,
        });
        return data;
    } catch (err) {
        // err.response.data.message
        // console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};

export const logout = async () => {
    try {
        const { data } = await api.get("/logout");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const { data } = await api.get("/current");
        return data;
    } catch (err) {
        throw new Error(err?.response?.data?.message);
    }
};
