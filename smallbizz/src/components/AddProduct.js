import { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    // Add more fields as needed
  });

  useEffect(() => {
    // Get the shopId from localStorage or elsewhere and store it in state
    const shopId = localStorage.getItem('shopId');
    setProductData(prevData => ({ ...prevData, shopId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/products', productData);
      window.location.href = '/home';
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} />
        <input type="text" name="price" placeholder="Price" value={productData.price} onChange={handleChange} />
        {/* Add more input fields for other product details */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
