import React, { useState, useEffect } from "react";
import Side from "./Side";
import axios from "axios";
import "./order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [shopId, setShopId] = useState("");

  useEffect(() => {
    const fetchShopId = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/shopId");
        setShopId(response.data.shopId);
      } catch (error) {
        console.error("Error fetching shopId:", error);
      }
    };

    fetchShopId();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/?shopId=${shopId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (shopId) {
      fetchOrders();
    }
  }, [shopId]);

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
              <th>Items</th>
              <th>Shop ID</th>
              <th>Customer ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.productName} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.shopId}</td>
                <td>{order.customerId}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
