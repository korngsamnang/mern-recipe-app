import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { createSendToken } from "../utils/createSendToken.js";

export const register = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        return next(new AppError("User already exists", 401));
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
    });
    //Remove the password from the output
    newUser.password = undefined;

    res.status(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

export const login = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
        return next(new AppError("Please provide name and password!", 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect username or password", 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});
// export const protect = catchAsync(async (req, res, next) => {
//     let token;
//     token = req.cookies.jwt;
//     if (token) {
//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.userId);
//             console.log(req.user);
//             next();
//         } catch (err) {
//             res.status(401);
//             throw new Error("Not authorized, invalid token");
//         }
//     } else {
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// });

export const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    // 2) Verification token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

export const logout = (req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(Date.now() + 10 * 1000),
        withCredentials: true,
        sameSite: "None",
        httpOnly: true,
        secure: true,
    });
    res.status(200).json({ status: "success" });
};
