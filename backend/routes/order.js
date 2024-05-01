import axios from 'axios';

// Assuming you have a baseURL set for your API
const api = axios.create({
  baseURL: 'http://localhost:8000/api/orders'
});

// Get all orders for a specific shop
// Get all orders for a specific shop
export async function getOrders(shopId) {
    try {
      const response = await api.get(`/?shopId=${shopId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
  

// Create a new order
// export async function createOrder(orderData) {
//   try {
//     const response = await api.post('/', orderData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating order:', error);
//     throw error;
//   }
// }

// Get a single order by ID
export async function getOrderById(shopId) {
  try {
    const response = await api.get(`/${shopId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Update an existing order

