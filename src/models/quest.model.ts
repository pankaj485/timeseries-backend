const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432,
});

export const connectDB = () => {
  client.connect((err: Error) => {
    if (err) throw err;
    console.log(`[DB]: Connected to Postgres DB on PORT: ${client.port}`);
  });
};

export const getData = async () => {
  console.log("Data received");
};
