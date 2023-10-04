#!/bin/sh

echo "Comenzando ejecución de la aplicación..."
echo "Instalo todas las dependencias..."
npm install
npm install --save-dev dotenv-cli
npm install nodemon --save-dev
echo "Costruyendo app..."
npm run build
echo "Iniciando app..."
npm run start-docker-run