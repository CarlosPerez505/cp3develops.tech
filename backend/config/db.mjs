import mysql from 'mysql2/promise';

// MySQL connection configuration using environment variables
const dbConfig = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'test',
};

// Create a connection pool
const db = await mysql.createPool(dbConfig);

export default db;
