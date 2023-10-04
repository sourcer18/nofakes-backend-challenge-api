import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import { DataSource } from 'typeorm';
import businnesRoutes from './routes/business.routes';
import reviewRoutes from './routes/review.routes';
import Logger from "./logger";
import { optionsDataSource } from './data-source';
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://localhost:5200",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(businnesRoutes);
app.use(reviewRoutes);

app.listen(PORT, () => {
  Logger.debug(`http://localhost:${PORT}`);
  Logger.debug(`Server ok :)`);
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

export const MongoClientDataSource  = new DataSource(optionsDataSource);
MongoClientDataSource.initialize()
.then(() => {
  console.log("Connection with database initialized");
})
.catch((err) => {
  console.error("Error during initialization", err);
});


