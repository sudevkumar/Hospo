import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { db } from "./db/db.js";
import MessageRouter from "./router/messages.js";
import UserRouter from "./router/user.js";
import AppoinmentRouter from "./router/appoinment.js";
import { error } from "./middleware/error.js";

const app = express();
config({ path: "./.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/appointment", AppoinmentRouter);

db();

app.use(error);

export default app;
