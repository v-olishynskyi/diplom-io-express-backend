import app from './Server';
import logger from './shared/Logger';
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from './config/db';

// Start the server
const port = Number(process.env.PORT || 3000);

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    } as ConnectOptions);

    app.listen(port, () => {
      logger.info('Express server started on port: ' + port);
    });
  } catch (error) {
    console.log('start', { error });
  }
}

start();
