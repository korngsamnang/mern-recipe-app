import { useLogout } from "../features/authentication/useLogout.js";
import Recipe from "../features/recipes/Recipe.jsx";

const Home = () => {
    return (
        <div>
            <Recipe />
        </div>
    );
};

export default Home;
