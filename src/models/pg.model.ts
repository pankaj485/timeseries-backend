import { Client } from "pg";
import { User } from "../interfaces/pg.interface";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432,
});

export const HTTP_Connect = () => {
  client.connect((err: Error) => {
    if (err) throw err;
    console.log(`[DB]: Connected to Postgres DB on PORT: ${client.port}`);
  });
};

export const getData = async () => {
  try {
    const { rows } = await client.query("SELECT * FROM usersdata");
    return rows;
  } catch (err: any) {
    console.log(err.message);
    return {
      success: false,
      message: err.message || "[MODULE]: Couldn't retrive data!",
    };
  }
};

export const postData = async (userData: User) => {
  try {
    const { email, time, user } = userData;

    // insert data into user table
    let { rowCount } = await client.query(
      `INSERT INTO usersdata (name, email, year) VALUES ('${user}', '${email}', ${time});`
    );

    return rowCount === 1
      ? {
          email,
          user,
          time,
        }
      : {
          success: false,
          message: "Couldn't insert data!",
        };
  } catch (err: any) {
    console.log(err.message);

    return {
      success: false,
      message: err.message || "Couldn't insert data!",
    };
  }
};
