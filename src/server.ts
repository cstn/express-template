import { app } from './app.js';
import { config } from './config/app.js';
import AppDataSource from './database/postgres/database-config.js';
import { connectRedis } from './shared/redis.js';
import { logger } from './utils/logger.js';

const main = async () => {
  await AppDataSource.initialize();
  logger.info('Database connected');

  connectRedis();

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
    });

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

main().catch((ex) => {
  logger.error(ex);
  process.exit(1);
});
