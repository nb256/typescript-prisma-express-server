import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const { SERVER_PORT = 8080 } = process.env;

const app = express();

app.get("/health", (_, res) => {
  res.send("Hello World!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
