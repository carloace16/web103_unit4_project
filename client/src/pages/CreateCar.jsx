import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../services/CarsAPI";
import carRed from "../assets/car_red.png";
import carBlue from "../assets/car_blue.png";
import carBlack from "../assets/car_black.png";

// Store our options and their prices
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

const CreateCar = () => {
  const [color, setColor] = useState(OPTIONS.colors[0]);
  const [wheels, setWheels] = useState(OPTIONS.wheels[0]);
  const [interior, setInterior] = useState(OPTIONS.interiors[0]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  // Update total price whenever a selection changes
  useEffect(() => {
    const newTotal = color.price + wheels.price + interior.price;
    setTotalPrice(newTotal);
  }, [color, wheels, interior]);

  // Handle saving the car
  const handleSubmit = async (event) => {
    event.preventDefault();

    const carData = {
      color: color.name,
      wheels: wheels.name,
      interior: interior.name,
      total_price: totalPrice,
    };

    const newCar = await createCar(carData);
    if (newCar) {
      alert("Car saved successfully!");
      navigate("/cars"); // Go to the list of saved cars
    } else {
      alert("Failed to save car. Please try again.");
    }
  };

  return (
    <div className="create-car-container">
      <div className="car-visualizer">
        <h2>Your Custom Car</h2>
        <img
          src={color.image}
          alt={`A ${color.name} car`}
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
                checked={color.name === opt.name}
                onChange={() => setColor(opt)}
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
                checked={wheels.name === opt.name}
                onChange={() => setWheels(opt)}
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
                checked={interior.name === opt.name}
                onChange={() => setInterior(opt)}
              />
              {opt.name} (+${opt.price})
            </label>
          ))}
        </fieldset>

        <button type="submit" className="save-button">
          Save Build
        </button>
      </form>
    </div>
  );
};

export default CreateCar;
