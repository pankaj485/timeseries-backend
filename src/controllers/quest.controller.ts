import { Request, Response } from "express";

import { Client } from "pg";

const client = new Client({
  database: "qdb",
  host: "127.0.0.1",
  password: "quest",
  port: 8812,
  user: "admin",
});

export const QUEST_CONNECT = async () => {
  try {
    await client.connect();
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
