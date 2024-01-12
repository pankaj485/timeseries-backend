import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
const multer = require("multer");
import path from "path";

import bodyParser from "body-parser";
import { PG_GET, PG_CONNECT, PG_POST } from "./controllers/pg.controller";
import {
  QUEST_CONNECT,
  QUEST_EMPTY_TABLE,
  QUEST_GET,
  QUEST_GET_CSV,
  QUEST_UPLOAD_CSV,
} from "./controllers/quest.controller";
import { multerStorageConfig } from "./utils/multer.util";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

const storage = multerStorageConfig(); // get configurations related to multer file uploads
const upload = multer({ storage });

app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Express + TypeScript Server</h1>");
  res.end();
});

app.get("/pg/get", PG_GET);

app.get("/pg/post", PG_POST);

app.get("/quest/get", QUEST_GET);

app.get("/quest/get/csv", QUEST_GET_CSV);

app.post("/quest/upload/csv", upload.single("csvfile"), QUEST_UPLOAD_CSV);

app.get("/quest/clear/csv", upload.single("csvfile"), QUEST_EMPTY_TABLE);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  // PG_CONNECT();
  QUEST_CONNECT();
});
