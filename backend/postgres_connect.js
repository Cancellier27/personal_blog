import { Client } from "pg"
import dotenv from "dotenv"

// connect to the .env file
dotenv.config()

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,       
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT, 
});

db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export default db;

