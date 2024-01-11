import { User } from "../interfaces/pg.interface";
import { HTTP_Connect, getData, postData } from "../models/pg.model";

export const PG_GET = async () => {
  try {
    const userData = await getData();
    return userData;
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: err.message || "[Controller]: Couldn't retrive data!",
    };
  }
};

export const PG_CONNECT = () => {
  try {
    HTTP_Connect();
  } catch (err) {
    console.log("[Controller]: Error connecting to DB");
  }
};

export const PG_POST = async () => {
  const userData: User = {
    user: "test2",
    email: "test@email.com",
    time: Date.now(),
  };

  try {
    const getData = await postData(userData);
    return getData;
  } catch (err) {
    console.log("[Controller]: Error inserting to DB");

    return {
      ...userData,
    };
  }
};
