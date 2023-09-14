import { useState } from "react";
import Form from "../../ui/Form.jsx";
import { useLogin } from "./useLogin.js";
import { useCookies } from "react-cookie";

const LoginForm = () => {
    const [username, setUsername] = useState("user1");
    const [password, setPassword] = useState("test1234");

    const { login, isLoading } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username || !password) return;
        login(
            { username, password },
            {
                onSettled: () => {
                    setUsername("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
};

export default LoginForm;
