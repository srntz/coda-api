import express from "express";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from 'cors'

import {UnifiedControllerRouter} from "./controllers/index.controller.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

app.use(cookieParser());

app.use("/", new UnifiedControllerRouter().getRouter())

app.listen(4111, () => {console.log("listening on port 4111!")});

export default app
