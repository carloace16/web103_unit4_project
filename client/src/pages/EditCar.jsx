import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, updateCar } from "../services/CarsAPI";
import carRed from "../assets/car_red.png";
import carBlue from "../assets/car_blue.png";
import carBlack from "../assets/car_black.png";

// Store our options and their prices (same as CreateCar)
const OPTIONS = {
  colors: [
    { name: "Red", price: 0, image: carRed },
    { name: "Blue", price: 500, image: carBlue },
    { name: "Black", price: 1000, image: carBlack },
  ],
  wheels: [
    { name: "Standard", price: 0 },
    { name: "Sport", price: 1000 },
  ],
  interiors: [
    { name: "Fabric", price: 0 },
    { name: "Leather", price: 1500 },
  ],
};

const EditCar = () => {
  const [car, setCar] = useState({ color: {}, wheels: {}, interior: {} });
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams(); // Get the car's ID from the URL
  const navigate = useNavigate();

  // 1. Fetch the car's data when the page loads
  useEffect(() => {
    const fetchCarData = async () => {
      const carData = await getCarById(id);
      if (carData) {
        // Find the full option objects that match the car's saved names
        const currentColor =
          OPTIONS.colors.find((opt) => opt.name === carData.color) ||
          OPTIONS.colors[0];
        const currentWheels =
          OPTIONS.wheels.find((opt) => opt.name === carData.wheels) ||
          OPTIONS.wheels[0];
        const currentInterior =
          OPTIONS.interiors.find((opt) => opt.name === carData.interior) ||
          OPTIONS.interiors[0];

        setCar({
          color: currentColor,
          wheels: currentWheels,
          interior: currentInterior,
        });
      }
    };
    fetchCarData();
  }, [id]);

  // 2. Recalculate price whenever the selections change
  useEffect(() => {
    const newTotal = car.color.price + car.wheels.price + car.interior.price;
    setTotalPrice(newTotal);
  }, [car]);

  // 3. Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCarData = {
      color: car.color.name,
      wheels: car.wheels.name,
      interior: car.interior.name,
      total_price: totalPrice,
    };

    const updatedCar = await updateCar(id, updatedCarData);
    if (updatedCar) {
      alert("Car updated successfully!");
      navigate("/cars"); // Go back to the list of saved cars
    } else {
      alert("Failed to update car. Please try again.");
    }
  };

  // Helper functions to update state
  const handleColorChange = (opt) => setCar({ ...car, color: opt });
  const handleWheelsChange = (opt) => setCar({ ...car, wheels: opt });
  const handleInteriorChange = (opt) => setCar({ ...car, interior: opt });

  if (!car.color.name) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  return (
    <div className="create-car-container">
      <div className="car-visualizer">
        <h2>Edit Your Custom Car (Build #{id})</h2>
        <img
          src={car.color.image}
          alt={`A ${car.color.name} car`}
          className="car-image"
        />
        <h3>Total Price: ${totalPrice.toLocaleString()}</h3>
      </div>

      <form className="car-options" onSubmit={handleSubmit}>
        {/* Color Options */}
        <fieldset>
          <legend>Color</legend>
          {OPTIONS.colors.map((opt) => (
            <label key={opt.name}>
              <input
                type="radio"
                name="color"
                value={opt.name}
                checked={car.color.name === opt.name}
                onChange={() => handleColorChange(opt)}
              />
              {opt.name} (+${opt.price})
            </label>
          ))}
        </fieldset>

        {/* Wheel Options */}
        <fieldset>
          <legend>Wheels</legend>
          {OPTIONS.wheels.map((opt) => (
            <label key={opt.name}>
              <input
                type="radio"
                name="wheels"
                value={opt.name}
                checked={car.wheels.name === opt.name}
                onChange={() => handleWheelsChange(opt)}
              />
              {opt.name} (+${opt.price})
            </label>
          ))}
        </fieldset>

        {/* Interior Options */}
        <fieldset>
          <legend>Interior</legend>
          {OPTIONS.interiors.map((opt) => (
            <label key={opt.name}>
              <input
                type="radio"
                name="interior"
                value={opt.name}
                checked={car.interior.name === opt.name}
                onChange={() => handleInteriorChange(opt)}
              />
              {opt.name} (+${opt.price})
            </label>
          ))}
        </fieldset>

        <button type="submit" className="save-button">
          Update Build
        </button>
      </form>
    </div>
  );
};

export default EditCar;
