import React from "react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import CreateCar from "./pages/CreateCar";
import EditCar from "./pages/EditCar";
import ViewCars from "./pages/ViewCars";
import CarDetails from "./pages/CarDetails"; // <-- 1. IMPORT IT
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <CreateCar />,
    },
    {
      path: "/cars",
      element: <ViewCars />,
    },
    {
      path: "/edit/:id",
      element: <EditCar />,
    },
    {
      path: "/cars/:id", // <-- 2. ADD THIS ROUTE
      element: <CarDetails />,
    },
  ]);

  return (
    <div className="App">
      <Navigation />
      <main className="container">{element}</main>
    </div>
  );
};

export default App;
