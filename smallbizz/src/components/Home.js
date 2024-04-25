import React from "react";
import Side from "./Side";

const Home = () => {
  return (
    <div>
      <Side />
      <button onClick={() => window.location.href = '/add-product'}>Add Product</button>
    </div>
  );
};

export default Home;
