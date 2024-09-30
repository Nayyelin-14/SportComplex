import React from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  // Fetch the product details by ID here or use the ID to get the product details from props/state/context
  return (
    <div className="product-detail">
      <h1>Product Detail for ID: {id}</h1>
      {/* Render the product details here */}
    </div>
  );
}

export default NewsDetail