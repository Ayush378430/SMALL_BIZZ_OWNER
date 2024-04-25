require('dotenv').config();
const express = require('express');
const app = express();
const cors= require("cors");
const session = require('express-session'); // Import express-session
const connection=require("./db")
const shopRoutes=require("./routes/shop.js");
const authRoutes=require("./routes/auth.js");
const addprodRoutes=require("./routes/product.js");

connection();
app.use(cors());
app.options('*', cors());
app.use(express.json());

// Add middleware for session management
app.use(session({
  secret: 'c6438a7fe3de5a86596e892c13994a33f7590c5228305aafae981344f059d5b5 ', // Change this to a secure random key
  resave: false,
  saveUninitialized: false
}));

app.use("/api/shops",shopRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",addprodRoutes);

const port=8000;
app.listen(port,()=>console.log("server is running on port 8000"))
