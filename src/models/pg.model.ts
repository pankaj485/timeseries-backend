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

const createTable = async () => {
  try {
    await client.query(
      `CREATE TABLE "usersdata" ("user" VARCHAR(255), "email" VARCHAR(255), "year" BIGINT);`
    );
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getData = async () => {
  // createTable();

  try {
    const { rows } = await client.query("SELECT * FROM usersdata;");
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
    const { email, user, year } = userData;

    // insert data into user table
    let { rowCount } = await client.query(
      `INSERT INTO "usersdata" ("user", "email", "year") VALUES ('${user}', '${email}', ${year});`
    );

    return rowCount === 1
      ? {
          email,
          user,
          year,
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
