import { pool } from "./database.js";

const createCustomCarsTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS custom_cars;

        CREATE TABLE IF NOT EXISTS custom_cars (
            id SERIAL PRIMARY KEY,
            color VARCHAR(50) NOT NULL,
            wheels VARCHAR(50) NOT NULL,
            interior VARCHAR(50) NOT NULL,
            total_price INTEGER NOT NULL
        );
    `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 "custom_cars" table created successfully');
  } catch (err) {
    console.error('⚠️ error creating "custom_cars" table', err);
  }
};

createCustomCarsTable();
