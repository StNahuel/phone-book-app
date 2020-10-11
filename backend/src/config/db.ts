import * as path from "path";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import config from "./config";

const sequelizeOptions: SequelizeOptions = {
  host: config.DB_HOST,
  database: config.DB_NAME,
  dialect: 'mysql',
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  storage: ":memory:",
  modelPaths: [path.resolve(__dirname, "..", "models")]
}

export const sequelizeInit = async () => {
  const sequelize = new Sequelize(sequelizeOptions);
  await sequelize
    .sync({ force: false })
    .then(() => {
      console.log("[SEQUELIZE] CONNECTION ESTABLISHED SUCCESSFULLY");
    })
    .catch((err) => {
      console.log("[SEQUELIZE] CONNECTION REFUSED, ERROR:", err);
    });
}