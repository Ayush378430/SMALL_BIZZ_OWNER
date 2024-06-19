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
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon component
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon component

const Tablestyle = styled(Table)`
   width:85%;
  margin-left:250px;
  margin-top: 20px;
  position:fixed;
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
 const fetchProducts = async () => {
      try {
        // Fetch products for the current shop id
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data); // Set products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  useEffect(() => {
   

    fetchProducts();
  }, []); // Run the effect only once after the component mounts


  const deletetheprod=async (id)=>{
    try{
      await axios.delete(`http://localhost:8000/api/products/${id}`);
    }
    catch(error){
       console.log("Error while deleting the API", error);
    }
  }

   const deleteProduct = async (Id) => {
      await deletetheprod(Id);
      fetchProducts();
  };


  return (
    <div>
      <div className="header">Small Bizz</div>
      <Side />
      <button onClick={() => (window.location.href = "/add-product")} className="add-product-button">
        Add Product
      </button>

      <Tablestyle>
        <Thead>
          <TableRow>
            <Tableheadcell>Product Id</Tableheadcell>
            <Tableheadcell>Product Name</Tableheadcell>
            <Tableheadcell>Price</Tableheadcell>
            <Tableheadcell>Quantity</Tableheadcell>
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
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    console.log("Edit clicked with id:", product._id);
                    navigate(`/editproduct/${product._id}`);
                  }}
                >
                 <EditIcon />
                </Button>

                <Button onClick={() => deleteProduct(product._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Tablestyle>
    </div>
  );
};

export default Home;
