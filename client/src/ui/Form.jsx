import SpinnerMini from "./SpinnerMini.jsx";

const Form = ({
    username,
    setUsername,
    password,
    setPassword,
    label,
    onSubmit,
    isLoading,
}) => {
    return (
        <div className="w-full sm:w-1/2 mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">{label}</h2>
                <div className="flex flex-col">
                    <label htmlFor="username" className="text-gray-600">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-600">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    {isLoading ? <SpinnerMini /> : label}
                </button>
            </form>
            {/*{isLoading && (*/}
            {/*    <div className="text-center mt-4">*/}
            {/*        <h1 className="text-xl font-semibold">Loading...</h1>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default Form;
