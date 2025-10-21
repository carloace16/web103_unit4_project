import { pool } from "../config/database.js";

// GET all cars
export const getAllCars = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM custom_cars ORDER BY id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// GET a single car by ID
export const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const results = await pool.query(
      "SELECT * FROM custom_cars WHERE id = $1",
      [carId]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// CREATE a new car
export const createCar = async (req, res) => {
  const { color, wheels, interior, total_price } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO custom_cars (color, wheels, interior, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [color, wheels, interior, total_price]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// UPDATE a car by ID
export const updateCar = async (req, res) => {
  const carId = req.params.id;
  const { color, wheels, interior, total_price } = req.body;
  try {
    const results = await pool.query(
      "UPDATE custom_cars SET color = $1, wheels = $2, interior = $3, total_price = $4 WHERE id = $5 RETURNING *",
      [color, wheels, interior, total_price, carId]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// DELETE a car by ID
export const deleteCar = async (req, res) => {
  const carId = req.params.id;
  try {
    await pool.query("DELETE FROM custom_cars WHERE id = $1", [carId]);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
