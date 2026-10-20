import { app } from './app.js';
import { config } from './config/app.js';

const server = app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
