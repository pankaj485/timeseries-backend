import path from "path";

const csv = require("csv-parser");
const fs = require("fs");
const results: any[] = [];

export const readCsvFile = (): any => {
  const filePath = path.resolve(
    __dirname,
    "../../public/uploads/",
    "csvfile.csv"
  );

  const parseCsvData = new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: any) => {
        const {
          time_v,
          obdTestState,
          obdEngineState,
          obdRpm,
          obdEngineLoad,
          obdAirFlowRate,
          obdManifoldPressure,
          obdCommandedEGR,
          obdThrottle,
          obdAccPosD,
          obdSpeed,
          obdControlModuleVoltage,
          obdFuelCommonRailPressure,
          obdIntakeTemperature,
          obdCoolantTemperature,
          obdBarometricPressure,
          obdDistanceWithMil,
          obdDistanceSinceErrorCleared,
          obdEGRError,
          obdActualEquivalenceRatio,
          obdCommandEquivalenceRatio,
          obdFuelSystemStatus,
          obdShortTermFuelTrim1,
          obdCatalystTemperature,
        } = data;

        const currentRowData = {
          time: Number(time_v),
          obdRpm: Number(obdRpm),
          obdManifoldPressure: Number(obdManifoldPressure),
          obdThrottle: Number(obdThrottle),
        };

        results.push(currentRowData);
      })
      .on("end", () => {
        // console.log(results);
        console.log("[readCsvFile -> Utils]: finished reading csv file");
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
        resolve(results);
      })
      .on("error", (err: Error) => {
        console.log("[parseCsvData -> Utils]: Error parsing csv file");
        console.log(err);
        reject([]);
      });
  });

  return parseCsvData;
};
