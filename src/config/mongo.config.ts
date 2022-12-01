import { default as config } from './index';

export const Url = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.db_port}/${config.db.database}`;
export const Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: config.db.db_auth_source,
};
