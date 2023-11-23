import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import { ModelStatic } from "sequelize";
import { DataTypes, Sequelize } from "sequelize";
const basename = _basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("./../config/db")["default"][env];

interface CustomModel extends ModelStatic<any> {
  associate: (db: dbI) => void;
}

export interface dbI {
  [key: string]: CustomModel;
}

const db: dbI = {};

export let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".ts" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file));
    db[model.default.name] = model.default(sequelize, DataTypes);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
