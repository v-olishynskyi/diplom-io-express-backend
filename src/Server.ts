import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
var bodyParser = require('body-parser')

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import logger from './shared/Logger';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import markerRouter from './routes/marker.router';

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/markers', markerRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

// Export express instance
export default app;
