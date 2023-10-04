# Establece la imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto que tu aplicación utilizará
EXPOSE 3000

# Copia el script al contenedor
COPY script.sh /script.sh

# Asegúrate de que el script tenga permisos de ejecución
RUN chmod +x /script.sh

# Establecer el script como punto de entrada
ENTRYPOINT ["/bin/sh", "/script.sh"]
