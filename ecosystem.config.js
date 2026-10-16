module.exports = {
  apps: [
    {
      name: 'express-api',
      script: 'node',
      args: 'dist/server.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
