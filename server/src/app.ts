import express, { Application } from "express";
import cors from "cors";

import { sequelize } from "./models";
import realtyRouter from "./routes/realtyRoute";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use("/api/realty", realtyRouter);

const PORT = process.env.SERVER_PORT || 5000;

async function start() {
  try {
    await sequelize
      .sync()
      .then(() => {
        app.listen(PORT, () =>
          console.log(`App has been started on port ${PORT}...`),
        );
      })
      .catch((err: Error) => console.error(err.message));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
