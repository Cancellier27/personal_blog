const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',        // or your remote host
  database: 'personal_blog',
  password: 'postpassword',
  port: 5433,                // default PostgreSQL port
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;

