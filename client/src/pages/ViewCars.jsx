import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCars, deleteCar } from "../services/CarsAPI";
import carRed from "../assets/car_red.png";
import carBlue from "../assets/car_blue.png";
import carBlack from "../assets/car_black.png";

// A helper object to map color names back to images
const CAR_IMAGES = {
  Red: carRed,
  Blue: carBlue,
  Black: carBlack,
};

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  // Fetch all cars from the database when the page loads
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const data = await getAllCars();
    setCars(data);
  };

  // Handle the delete button click
  const handleDelete = async (carId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmed) {
      const success = await deleteCar(carId);
      if (success) {
        alert("Car deleted successfully!");
        // Refresh the list of cars after one is deleted
        fetchCars();
      } else {
        alert("Failed to delete car. Please try again.");
      }
    }
  };

  return (
    <div className="view-cars-container">
      <h2>Your Saved Car Builds</h2>
      <div className="car-list">
        {cars.length > 0 ? (
          cars.map((car) => (
            <article key={car.id} className="car-card">
              <img
                src={CAR_IMAGES[car.color]}
                alt={`${car.color} car`}
                className="car-thumbnail"
              />
              <div className="car-card-details">
                <Link to={`/cars/${car.id}`}>
                  <h4>Build #{car.id}</h4>
                </Link>
                <ul>
                  <li>
                    <strong>Color:</strong> {car.color}
                  </li>
                  <li>
                    <strong>Wheels:</strong> {car.wheels}
                  </li>
                  <li>
                    <strong>Interior:</strong> {car.interior}
                  </li>
                  <li>
                    <strong>Total Price:</strong> $
                    {car.total_price.toLocaleString()}
                  </li>
                </ul>
                <div className="car-card-actions">
                  <Link
                    to={`/edit/${car.id}`}
                    role="button"
                    className="secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="contrast"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>You haven't saved any car builds yet. Go create one!</p>
        )}
      </div>
    </div>
  );
};

export default ViewCars;
