import pg from "pg"
import dotevn from "dotenv"

const { Pool } = pg;
dotevn.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const query =  async function (text, params) {
    const res = await pool.query(text, params);
    console.log('executed query', { text, params });
    return res;
}
