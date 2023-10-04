"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClientDataSource = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const business_routes_1 = __importDefault(require("./routes/business.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const logger_1 = __importDefault(require("./logger"));
const data_source_1 = require("./data-source");
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;
//middlewares
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:4200",
        "http://localhost:5200",
    ],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use(business_routes_1.default);
app.use(review_routes_1.default);
app.listen(PORT, () => {
    logger_1.default.debug(`http://localhost:${PORT}`);
    logger_1.default.debug(`Server ok :)`);
});
//swagger
const options = {
    info: {
        version: '1.0.0',
        title: 'Nofakes backend challenge API',
        description: 'Node.js - Express.js - TypeORM - MongoDB',
        license: {
            name: 'David Salas Castro',
        },
    },
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
};
expressJSDocSwagger(app)(options);
exports.MongoClientDataSource = new typeorm_1.DataSource(data_source_1.optionsDataSource);
exports.MongoClientDataSource.initialize()
    .then(() => {
    console.log("Connection with database initialized");
})
    .catch((err) => {
    console.error("Error during initialization", err);
});
