import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './utils/error';
import passport from 'passport';
import jwtStrategy from './api/middlewares/passport';

export function makeApp(): Express {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));

  app.use(passport.initialize());
  passport.use('jwt', jwtStrategy);


  app.get('/', (_req, res) => {
    res.status(200).send('Hello World!');
  });

  app.use('/api', require('./api/routes/users.route').default);
  app.use('/api', require('./api/routes/auth.route').default);

  app.use(errorHandler);

  return app;
}