import React from 'react';

const FoodCard = ({ food, addToCart }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; // Fallback image
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(food);
    } else {
      console.error('addToCart function not provided');
    }
  };

  return (
    <div className="food-card" style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
      <img 
        src={food.image} 
        alt={food.name} 
        onError={handleImageError} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <p>${food.price.toFixed(2)}</p>
      <button 
        onClick={handleAddToCart} 
        style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FoodCard;