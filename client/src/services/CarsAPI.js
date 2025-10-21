const API_URL = "http://localhost:3000/api/cars";

// READ: Get all saved cars
export const getAllCars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all cars:", error);
    return [];
  }
};

// READ: Get a single car by its ID
export const getCarById = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching car ${carId}:`, error);
    return null;
  }
};

// CREATE: Save a new car build to the database
export const createCar = async (carData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating car:", error);
    return null;
  }
};

// UPDATE: Update an existing car's data
export const updateCar = async (carId, carData) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating car ${carId}:`, error);
    return null;
  }
};

// DELETE: Remove a car from the database
export const deleteCar = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/${carId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // No content is returned on a successful delete (204)
    return response.ok;
  } catch (error) {
    console.error(`Error deleting car ${carId}:`, error);
    return false;
  }
};
