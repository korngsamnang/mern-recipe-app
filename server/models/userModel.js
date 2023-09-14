import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please provide username"],
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        require: [true, "Please provide a password"],
        select: false,
    },
    savedRecipes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Recipe",
            default: [],
        },
    ],
});

userSchema.pre("save", async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    //Delete passwordConfirm field
    // this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
