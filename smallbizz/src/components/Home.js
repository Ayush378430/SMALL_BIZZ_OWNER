import React, { useState, useEffect } from "react";
import Side from "./Side";
import "./home.css"; // Import your CSS file for styling
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tablestyle = styled(Table)`
  width: 90%;
  margin: auto;
  margin-top: 20px;
`;

const Thead = styled(TableHead)`
  background-color: black;
`;

const Tableheadcell = styled(TableCell)`
  color: white;
  font-size: 20px;
  margin-left: 30px;
`;

const Home = () => {
  const [products, setProducts] = useState([]);
const navigate=useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products for the current shop id
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data); // Set products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Run the effect only once after the component mounts

  return (
    <div>
      <div className="header">Small Bizz</div>
      <Side />
      <button onClick={() => (window.location.href = "/add-product")}>
        Add Product
      </button>

      <Tablestyle>
        <Thead>
          <TableRow>
            <Tableheadcell>Product Id</Tableheadcell>
            <Tableheadcell>Product Name</Tableheadcell>
            <Tableheadcell>Price</Tableheadcell>
            <Tableheadcell>Description</Tableheadcell>
               <Tableheadcell></Tableheadcell>
          </TableRow>
        </Thead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    console.log("Edit clicked with id:", product._id);
                    navigate(`/editproduct/${product._id}`);
                  }}
                >
                  Edit
                </Button>

                {/* <Button onClick={() => deleteUser(product._id)}>Delete</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Tablestyle>
    </div>
  );
};

export default Home;
