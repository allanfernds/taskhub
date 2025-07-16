import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
