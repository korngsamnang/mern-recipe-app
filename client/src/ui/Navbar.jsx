import { Link } from "react-router-dom";
import { useUser } from "../features/authentication/useUser.js";
import { useLogout } from "../features/authentication/useLogout.js";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useUser();

    return (
        <div className="bg-blue-500 p-4">
            <div className="container mx-auto max-w-5xl flex justify-between items-center">
                <Link to="/home" className="text-white text-lg font-semibold">
                    Home
                </Link>
                <div className="space-x-4">
                    <Link to="/create-recipe" className="text-white">
                        Create
                    </Link>
                    <Link to="/saved-recipes" className="text-white">
                        Saved
                    </Link>
                    {user ? (
                        <button onClick={logout} className="text-white">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-white">
                                Login
                            </Link>
                            <Link to="/register" className="text-white">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
