import React, { useState, useEffect } from "react";
import Side from "./Side";
import axios from "axios";
import "./order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/orders`);
      const ordersWithStatus = response.data.map((order) => ({
        ...order,
        status: order.orderStatus || "Pending", // Initialize with existing status or default to "Pending"
      }));
      setOrders(ordersWithStatus);
      console.log(ordersWithStatus);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const order = orders.find((order) => order.orderId === orderId);
    if (!order) return;

    if (newStatus === "Cancelled") {
      try {
        await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    } else if (newStatus === "Done") {
      try {
        await axios.post(`http://localhost:8000/api/orders`, {
          orderId: order.orderId,
          orderDate: order.orderDate,
          productName: order.productName,
          productId: order.productId,
          quantity: order.quantity,
          customerId: order.customerId,
          status: newStatus,
        });
        }
        catch (error) {
          console.error("Error adding order:", error);
        }
        try{
        await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
        setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
        }
        catch (error) {
          console.error("Error deleting order:", error);
        }
        
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  return (
    <div>
      <Side />
      <div className="header">Small Bizz</div>
      <div className="orders">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Customer ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.productName}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.customerId}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;