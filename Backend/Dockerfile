# Usa Node 20.19.2 explícitamente
FROM node:20.19.2

# Crear directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar solo package.json y package-lock.json (si tienes) para cachear instalación deps
COPY package*.json ./

# Instalar dependencias (prod y dev, porque nodemon está en devDependencies)
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Correr migraciones antes de iniciar la app
#RUN npm run migrations:run

# Exponer puerto 3005 para backend
EXPOSE 3005

# Comando por defecto para iniciar backend en modo dev con nodemon
CMD ["npm", "run", "dev"]
