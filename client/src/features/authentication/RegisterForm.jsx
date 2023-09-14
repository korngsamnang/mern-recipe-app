import { useState } from "react";
import Form from "../../ui/Form.jsx";
import { register } from "../../services/apiAuth.js";
import { useRegister } from "./useRegister.js";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { register, isLoading } = useRegister();

    const handleSubmit = e => {
        e.preventDefault();
        if (!username || !password) return;
        register({ username, password });
    };
    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
};

export default RegisterForm;
