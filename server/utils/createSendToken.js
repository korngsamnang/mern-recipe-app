import jwt from "jsonwebtoken";

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const maxAge = 3 * 24 * 60 * 60;
export const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        // expires: new Date(
        //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        // ),
        withCredentials: true,
        sameSite: "None",
        httpOnly: true,
        secure: true,
        maxAge: maxAge * 1000,
    });

    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        isAuthenticated: true,
        data: {
            user,
        },
    });
};
