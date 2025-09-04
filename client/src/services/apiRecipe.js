import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1/recipes",
    withCredentials: true,
});

export const getRecipes = async () => {
    try {
        const { data } = await api.get("/");
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};

export const savedRecipe = async (recipeId) => {
    try {
        const { data } = await api.patch("/", { recipeId });
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};
export const createRecipe = async (recipe) => {
    try {
        const { data } = await api.post("/", recipe);
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};

export const getSaveRecipes = async () => {
    try {
        const { data } = await api.get("/saved");
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};

export const deleteRecipe = async (recipeId) => {
    try {
        const { data } = await api.delete(`/${recipeId}`);
        return data;
    } catch (err) {
        console.log(err);
        throw new Error(err?.response?.data?.message);
    }
};
