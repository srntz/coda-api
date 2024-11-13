import express from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";

import {UnifiedControllerRouter} from "./controllers/index.controller.js";

dotenv.config();
const app = express();

app.use(cookieParser());

app.use("/", new UnifiedControllerRouter().getRouter())

app.listen(3000, () => {console.log("listening on port 3000!")});
