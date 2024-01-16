import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";
import AppError from "./utils/AppError.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const app = express();

app.set("trust proxy", 1);

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(
    // Production
    cors({
        origin: ["https://mern-recipe.netlify.app", "http://localhost:5173"],
        method: ["GET", "POST"],
        credentials: true,
    })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/recipes", recipeRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
