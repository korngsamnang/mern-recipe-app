import fs from "fs";
import mongoose from "mongoose";
import "dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";

const db = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(() => console.log("DB connection successful"));

//READ JSON FILE
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const recipes = JSON.parse(
    fs.readFileSync(`${__dirname}/recipes.json`, "utf-8")
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

//IMPORT DATA INTO DB

const importData = async () => {
    try {
        await User.create(users, { validateBeforeSave: false });
        await Recipe.create(recipes);
        console.log("Data successfully loaded!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Recipe.deleteMany();
        console.log("Data successfully deleted!");
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

console.log(process.argv);
