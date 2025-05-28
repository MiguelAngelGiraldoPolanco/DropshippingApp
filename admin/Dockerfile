FROM node:20.19.2

WORKDIR /usr/src/app

# Instalar dependencias necesarias para compilación (typescript y otros)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

# Compilar TypeScript
RUN echo "No build needed"

EXPOSE 3000

CMD ["npm", "start"]
