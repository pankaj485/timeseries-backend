import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getData, connectDB } from "./models/quest.model";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Express + TypeScript Server</h1>");
  res.end();
});

app.get("/quest", (req: Request, res: Response) => {
  getData();
  res.send("<h1> Retriving Data: </h1>");
  res.end();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  connectDB();
});
