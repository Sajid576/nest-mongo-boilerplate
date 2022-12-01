import { env } from 'src/utils/env';
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_AUTH_SOURCE,
  DB_PORT,
  SECRET_KEY,
} = env;

export default {
  db: {
    user: DB_USER,
    pass: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    db_auth_source: DB_AUTH_SOURCE,
    db_port: DB_PORT,
  },
  jwt: {
    secretKey: SECRET_KEY,
    expiresIn: 36000000,
  },
  mail: {
    user: 'no-reply@infanity.io',
  },
};
