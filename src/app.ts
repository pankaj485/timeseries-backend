import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors");
const multer = require("multer");
import path from "path";

import bodyParser from "body-parser";
import { PG_GET, PG_CONNECT, PG_POST } from "./controllers/pg.controller";
import { QUEST_CONNECT, QUEST_GET } from "./controllers/quest.controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;
const upload = multer({ dest: path.resolve(__dirname, "./uploads") });

app.use(cors({ origin: "*" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Express + TypeScript Server</h1>");
  res.end();
});

app.get("/pg/get", async (req: Request, res: Response) => {
  try {
    const getData = await PG_GET();
    return res.status(200).json({
      success: true,
      message: "Data retrived sucessfully",
      data: {
        ...getData,
      },
    });
  } catch (err: any) {
    return res.status(200).json({
      success: false,
      message: err.message || "[APP]: Error retriving data",
    });
  }
});

app.get("/pg/post", async (req: Request, res: Response) => {
  try {
    const postedData = await PG_POST();
    return res.status(200).json({
      success: true,
      message: "Data inserted sucessfully",
      data: {
        ...postedData,
      },
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "[APP]: Error inserting data",
    });
  }
});

app.get("/quest/get", async (req: Request, res: Response) => {
  try {
    const questData = await QUEST_GET();

    return res.status(200).json({
      success: true,
      message: "Data retrived successfully",
      data: questData,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "[APP]: Error getting data",
    });
  }
});

app.post(
  "/quest/upload/csv",
  upload.single("csvFile"),
  async (req: Request, res: Response) => {
    try {
      const { file } = req;

      if (file?.mimetype !== "text/csv") {
        return res.status(400).json({
          success: true,
          message: "Missing file or invalid file format",
        });
      }

      return res.status(200).json({
        success: true,
        message: "CSV uploaded successfully",
        file,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "[APP]: Error uploading file ",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  // PG_CONNECT();
  QUEST_CONNECT();
});
