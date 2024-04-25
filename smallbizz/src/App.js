// import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";

function App(){
  const shop=localStorage.getItem("token");
  return(
    <Routes>
      {shop && <Route path="/login" exact element={<Login/>}/>}
      <Route path="/signup" exact element={<Signup/>}/>
      <Route path="/home" exact element={<Home/>}/>
      <Route path="/" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/add-product" exact element={<AddProduct/>} />
    </Routes>
  );
}

export default App;
