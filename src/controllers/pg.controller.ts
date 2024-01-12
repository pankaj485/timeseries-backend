import { User } from "../interfaces/pg.interface";
import { HTTP_Connect, getData, postData } from "../models/pg.model";
import { Request, Response } from "express";

export const PG_GET = async (req: Request, res: Response) => {
  try {
    const userData = await getData();

    return res.status(200).json({
      success: true,
      message: "Data retrived sucessfully",
      data: {
        ...userData,
      },
    });
  } catch (err: any) {
    console.log("[PG_GET -> Controller]: Error retriving data");
    console.log(err.message);

    return res.status(200).json({
      success: false,
      message: err.message || "[PG_GET -> Controller]: Error retriving data",
    });
  }
};

export const PG_CONNECT = () => {
  try {
    HTTP_Connect();
  } catch (err) {
    console.log("[PG_CONNECT -> Controller]: Error connecting to DB");
    console.log(err);
  }
};

export const PG_POST = async (req: Request, res: Response) => {
  const userData: User = {
    user: "test2",
    email: "test@email.com",
    time: Date.now(),
  };

  try {
    const getData = await postData(userData);

    return res.status(200).json({
      success: true,
      message: "Data inserted sucessfully",
      data: {
        ...getData,
      },
    });
  } catch (err: any) {
    console.log("[PG_POST -> Controller]: Error inserting to DB");

    return res.status(400).json({
      success: false,
      message: err.message || "[PG_POST -> Controller]: Error inserting data",
    });
  }
};
