import User from "../models/userModel.js";

export const getAllUser = async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        status: "success",
        result: users.length,
        data: {
            users,
        },
    });
};

export const getCurrentUser = async (req, res) => {
    res.status(200).json({
        status: "success",
        isAuthenticated: true,
        data: {
            user: req.user,
        },
    });
};
