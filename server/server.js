import app from "./app.js";
import mongoose from "mongoose";

const db = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(() => {
    console.log("DB connection successful");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});
