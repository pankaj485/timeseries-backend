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

export const QUEST_GET = async () => {
  try {
    const { rows, rowCount } = await client.query(
      "SELECT  time_v as time, obdRpm as rpm FROM ECE2023120115971.csv LIMIT 10;"
    );
    return rows;
  } catch (err: any) {
    console.log("[QUEST -> Controller]: Error getting data");
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
