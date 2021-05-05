const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logging: false,
  },
production: {
  use_env_variable: 'postgres://zvuqdoboucydfn:ea3277f9da339a0caeda7e4c2892ebde7ec36a570443bba4d4871d6c2fa25a82@ec2-54-166-167-192.compute-1.amazonaws.com:5432/dcb2vt8nra93mq',
  dialect: 'postgres',
  seederStorage: 'sequelize',
}
};
