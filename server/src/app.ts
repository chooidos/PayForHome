import express, { Application } from "express";
import sequelize from "./models/init";

const app: Application = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

const PORT = 5000;

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
