const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    connectionString: 'postgresql://postgres:123456@localhost:5432/suzhou',
    host:  'localhost',
    port:  '5432',
    user:  'postgres',
    password:  '123456',
    database:  'suzhou',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;