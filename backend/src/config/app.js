// all configs of app (port, host, etc)
const env = require('./env');

const appConfig = {
  port: env.PORT,
  host: '0.0.0.0',
  cors: {
    origin: ['http://localhost:3001'], // frontend URL
    credentials: true
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }
};

module.exports = appConfig; 