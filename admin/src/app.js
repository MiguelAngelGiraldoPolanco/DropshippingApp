import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';  // solo importamos esto
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import db from './db/sequelize.js';

const { sequelize } = db;

// Aquí debes registrar el adaptador sequelize para AdminJS, que antes hacías con:
// AdminJS.registerAdapter({ Database, Resource });
// Ahora lo importamos directamente desde '@adminjs/sequelize':
import { Database, Resource } from '@adminjs/sequelize';
AdminJS.registerAdapter({ Database, Resource });

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  await sequelize.authenticate();
  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
