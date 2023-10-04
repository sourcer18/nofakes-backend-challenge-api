import { DataSourceOptions } from "typeorm";
import { Business } from "./entity/Business";
import { Review } from "./entity/Review";
require("dotenv").config();

export const optionsDataSource: DataSourceOptions = {
  type: "mongodb",
  host: process.env.TYPEORM_HOST,
  port: 27017,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  useUnifiedTopology: true,
  logging: ["warn", "log", "error"],
  entities: [
    Business,
    Review,
  ],
  subscribers: [],
  migrations: [],
};
