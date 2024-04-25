import React from "react";
import Side from "./Side";
import "./home.css"; // Import your CSS file for styling

const Home = () => {
  return (
    <div>
      <div className="header">Small Bizz</div>
      <Side />
      <button onClick={() => window.location.href = '/add-product'}>Add Product</button>
    </div>
  );
};

export default Home;
