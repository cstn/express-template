import { app } from './app.ts';
import { config } from './config/app.ts';
import { connectDb, mongoose } from './database/mongo/mongo-connection.ts';
import AppDataSource from './database/postgres/database-config.ts';
import { redis } from './shared/redis.ts';
import { logger } from './utils/logger.ts';

const main = async () => {
  await AppDataSource.initialize();
  logger.info('Database connected');

  await connectDb();
  logger.info('MongoDB connected');

  const server = app.listen(config.PORT, () => {
    logger.info('Server started');
    logger.info(`Server listening on port ${config.PORT}`);
  });

  const shutdown = () =>
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server.close(async () => {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        logger.info('Database disconnected');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        logger.info('MongoDB disconnected');
      }

      redis.disconnect();
      logger.info('Redis disconnected');
    });

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

main().catch((ex) => {
  logger.error(ex);
  process.exit(1);
});
