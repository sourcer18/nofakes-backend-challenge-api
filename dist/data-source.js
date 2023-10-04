"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsDataSource = void 0;
const Business_1 = require("./entity/Business");
const Review_1 = require("./entity/Review");
require("dotenv").config();
exports.optionsDataSource = {
    type: "mongodb",
    host: process.env.TYPEORM_HOST,
    port: 27017,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    useUnifiedTopology: true,
    logging: ["warn", "log", "error"],
    entities: [
        Business_1.Business,
        Review_1.Review,
    ],
    subscribers: [],
    migrations: [],
};
