import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCarById, deleteCar } from "../services/CarsAPI";
import carRed from "../assets/car_red.png";
import carBlue from "../assets/car_blue.png";
import carBlack from "../assets/car_black.png";

// A helper object to map color names back to images
const CAR_IMAGES = {
  Red: carRed,
  Blue: carBlue,
  Black: carBlack,
};

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the specific car's data
  useEffect(() => {
    const fetchCar = async () => {
      const data = await getCarById(id);
      setCar(data);
    };
    fetchCar();
  }, [id]);

  // Handle the delete button click
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmed) {
      const success = await deleteCar(id);
      if (success) {
        alert("Car deleted successfully!");
        navigate("/cars"); // Go back to the main list
      } else {
        alert("Failed to delete car. Please try again.");
      }
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-details-container">
      <h2>Your Saved Build (Build #{car.id})</h2>
      <article className="car-detail-card">
        <img
          src={CAR_IMAGES[car.color]}
          alt={`${car.color} car`}
          className="car-image-large"
        />
        <div className="car-details-content">
          <h3>Build Summary</h3>
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
          </ul>
          <h3 className="price">
            Total Price: ${car.total_price.toLocaleString()}
          </h3>
          <div className="car-card-actions">
            <Link to={`/edit/${car.id}`} role="button" className="secondary">
              Edit
            </Link>
            <button onClick={handleDelete} className="contrast">
              Delete
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CarDetails;
