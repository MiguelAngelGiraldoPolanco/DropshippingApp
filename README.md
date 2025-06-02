# 🛒 DropshippingApp

Aplicación completa de dropshipping desarrollada con Vue.js (frontend), Node.js + Express + Sequelize (backend), PostgreSQL, AdminJS y Stripe. Contenerizada con Docker para fácil despliegue y desarrollo local.

---

## 📁 Estructura del proyecto

```
FASTAPI-NODE/
├── admin/               # AdminJS panel (opcional según config)
├── Backend/             # Backend Node.js + Express + Sequelize
├── frontend/            # Frontend Vue.js
├── postgres_data_2/     # Datos persistentes de PostgreSQL (volumen)
├── docker-compose.yml   # Orquestación de contenedores
```

---

## 🚀 Requisitos previos

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (para ejecutar Stripe CLI localmente)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (para pruebas de webhook)

---

## ⚙️ Variables de entorno

Asegúrate de crear los archivos `.env` en los siguientes directorios:

### `/Backend/.env`

```env
DB_HOST=postgres
DB_USER=your_db_user
DB_PASSWORD=your_db_pass
DB_NAME=dropshipping
DB_PORT=5432
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### `/frontend/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_secret_key
VITE_CALENDLY_URL=your_calendly_secret_url
```

### `/admin/.env`
```env
DATABASE_URL=postgres://your_db_user:your_db_pass@postgres:5432/my_store
DATABASE_DIALECT=postgres
DATABASE_NAME=dropshipping
DATABASE_HOST=postgres
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_pass
COOKIE_SECRET=your_cookie_secret
PORT=3000
---

## 🐳 Instalación y ejecución con Docker Compose

1. Clona el repositorio:

```bash
git clone https://github.com/MiguelAngelGiraldoPolanco/DropshippingApp.git
cd DropshippingApp
```

2. Crea los archivos `.env` como se indicó arriba.

3. Levanta los servicios con Docker:

```bash
docker-compose up --build
```

Esto ejecutará:

- Frontend en: `http://localhost:80`
- Backend en: `http://localhost:3000/api/v1`
- PostgreSQL en: `localhost:5432`
- Admin en: `localhost3000/admin` 
- PgAdmin en: `localhost:5050`
---

### Correr las migraciones una vez construido:

```bash
docker exec -it <nombre_contenedor_backend> npx sequelize-cli db:migrate
```

### Si ya esta construido solo correrlo con: 

```bash
docker-compose up -d
```

## 💳 Stripe Webhook (Modo desarrollo)

Para pruebas de pagos, necesitas el CLI de Stripe para escuchar eventos de webhook.

1. Inicia sesión con el Stripe CLI:

```bash
stripe login
```

2. Ejecuta el listener del webhook:

```bash
npm run stripe
```

> Internamente corre algo como:  
> `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

Asegúrate de que esa ruta esté implementada en tu backend.

---

## 🧪 Comandos útiles

### Backend (local sin Docker)

```bash
cd Backend
npm install
npm run dev
```

### Frontend (local sin Docker)

```bash
cd frontend/frontend
npm install
npm run dev
```


### Admin (local sin Docker)

```bash
cd admin
npm install
npm start
```

---

## 🧰 Herramientas utilizadas

- Vue 3 + Vite
- Node.js + Express
- Sequelize + PostgreSQL
- JWT Auth
- AdminJS
- Stripe API & Webhooks
- Docker + Compose

---

## 📄 Licencia

MIT © [Miguel Ángel Giraldo Polanco](https://github.com/MiguelAngelGiraldoPolanco)
