import { Request, Response } from "express";

import { Client } from "pg";
import { readCsvFile } from "../utils/csvParser.util";
import { CsvuploadDataItem } from "../interfaces/quest.interface";

const client = new Client({
  database: "qdb",
  host: "127.0.0.1",
  password: "quest",
  port: 8812,
  user: "admin",
});

const createTable = async () => {
  try {
    await client.query(
      `CREATE TABLE "csvuploadData" ("time" BIGINT, "obdRpm" BIGINT, "obdManifoldPressure" BIGINT, "obdThrottle" BIGINT);`
    );
  } catch (err) {
    console.log("[createTable -> controller]: Error creating table");
    console.log(err);
  }
};

const insertData = async (rowData: CsvuploadDataItem) => {
  try {
    const { time, obdRpm, obdManifoldPressure, obdThrottle } = rowData;

    // insert current row data into user table
    let { rowCount } = await client.query(
      `INSERT INTO "csvuploadData" ("time", "obdRpm", "obdManifoldPressure", "obdThrottle") VALUES ('${time}', '${obdRpm}', ${obdManifoldPressure}, ${obdThrottle});`
    );
  } catch (err) {
    console.log(
      "[insertData -> Controller ]: Error Inserting row data tp to csvuploadData table"
    );
    console.log(err);
  }
};

export const QUEST_CONNECT = async () => {
  try {
    await client.connect();
    // createTable();
    console.log(`[QUEST DB]: Connected on PORT ${client.port}`);
  } catch (err: any) {
    console.log(err);
  }
};

export const QUEST_GET = async (req: Request, res: Response) => {
  try {
    const { rows, rowCount } = await client.query(
      "SELECT  obdEngineLoad as engineLoad, obdRpm as rpm FROM ECE2023120115971.csv ORDER BY time_v asc;"
    );

    return res.status(200).json({
      success: true,
      message: "Data retrived successfully",
      rowCount,
      data: rows,
    });
  } catch (err: any) {
    console.log("[QUEST_GET -> Controller]: Error getting data");
    return res.status(400).json({
      success: false,
      message: err.message || "[QUEST_GET -> Controller]: Error getting data",
    });
  }
};

export const QUEST_UPLOAD_CSV = async (req: Request, res: Response) => {
  try {
    const { file } = req;

    if (file?.mimetype !== "text/csv") {
      return res.status(400).json({
        success: true,
        message: "Missing file or invalid file format",
      });
    }

    const csvData: any[] = await readCsvFile();

    csvData.forEach((currentRow, rowIndex) => {
      const { time, obdRpm, obdManifoldPressure, obdThrottle } = currentRow;

      // insertData({ time, obdRpm, obdManifoldPressure, obdThrottle });
    });

    return res.status(200).json({
      success: true,
      message: "CSV uploaded successfully",
      file,
    });
  } catch (err) {
    console.log("[QUEST_UPLOAD_CSV -> Controller]: Error uploading file");

    return res.status(400).json({
      success: false,
      message: "[QUEST_UPLOAD_CSV -> Controller]: Error uploading file ",
    });
  }
};

export const QUEST_GET_CSV = async (req: Request, res: Response) => {
  try {
    const { rowCount, rows } = await client.query(
      `SELECT * FROM csvuploadData ORDER BY time ASC;`
    );

    return res.status(200).json({
      success: true,
      message: "Data retrived successfully",
      rowCount,
      data: rows,
    });
  } catch (err) {
    console.log(
      "[insertData -> Controller ]: Error retriving data from csvuploadData table"
    );
    console.log(err);
    return res.status(400).json({
      success: false,
      message:
        "[insertData -> Controller ]: Error retriving data from csvuploadData table",
    });
  }
};

export const QUEST_EMPTY_TABLE = async (req: Request, res: Response) => {
  try {
    const { command: truncateResCommand } = await client.query(
      `TRUNCATE TABLE csvuploadData;`
    );
    console.log(
      "[QUEST_EMPTY_TABLE -> truncateResCommand]: ",
      truncateResCommand
    );

    const { rowCount, rows } = await client.query(
      `SELECT * FROM csvuploadData ORDER BY time ASC;`
    );

    return res.status(200).json({
      success: true,
      message: "Data cleared successfully",
      rowCount,
      data: rows,
    });
  } catch (err) {
    console.log(
      "[QUEST_EMPTY_TABLE -> Controller ]: Error clearing data from csvuploadData table"
    );
    console.log(err);
    return res.status(400).json({
      success: false,
      message:
        "[QUEST_EMPTY_TABLE -> Controller ]: Error clearing data from csvuploadData table",
    });
  }
};

/* 
FIELDS: 
  time_v: 1701430000000,
  obdTestState: 1,
  obdEngineState: 0,
  obdRpm: '1627',
  obdEngineLoad: null,
  obdAirFlowRate: null,
  obdManifoldPressure: 70,
  obdCommandedEGR: null,
  obdThrottle: 10,
  obdAccPosD: null,
  obdSpeed: null,
  obdControlModuleVoltage: null,
  obdFuelCommonRailPressure: null,
  obdIntakeTemperature: null,
  obdCoolantTemperature: null,
  obdBarometricPressure: null,
  obdDistanceWithMil: null,
  obdDistanceSinceErrorCleared: null,
  obdEGRError: null,
  obdActualEquivalenceRatio: null,
  obdCommandEquivalenceRatio: null,
  obdFuelSystemStatus: null,
  obdShortTermFuelTrim1: null,
  obdCatalystTemperature: null
*/
