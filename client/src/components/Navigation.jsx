import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.css"; // We'll update this file next

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1>DIY Delight 🏎️</h1>
        </li>
      </ul>

      <ul>
        {/* Use the <Link> component with the 'to' prop for React routing */}
        <li>
          <Link to="/" role="button">
            Customize
          </Link>
        </li>
        <li>
          <Link to="/cars" role="button">
            View Builds
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
