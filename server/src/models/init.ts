import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(__dirname + "/../config/db.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

export default sequelize;
