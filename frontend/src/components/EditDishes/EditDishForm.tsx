import React, { useState } from 'react';
import "../DishForm/AddDishModal.css";

interface Dish {
  _id: string;
  name: string;
  description: string;
  cuisine: string;
  price: number;
  image: string;
}

interface EditDishFormProps {
  onClose: () => void;
  dish: Dish;
}



const EditDishForm: React.FC<EditDishFormProps> = ({ onClose, dish }) => {
  const [dishName, setDishName] = useState<string>(dish.name);
  const [dishDescription, setDishDescription] = useState<string>(dish.description);
  const [cuisine, setCuisine] = useState<string>(dish.cuisine);
  const [dishPrice, setDishPrice] = useState<string>(dish.price.toString());
  const [dishImageUrl, setDishImageUrl] = useState<string>(dish.image);

  const apiUrl: string = `http://localhost:7000/menu/${dish._id}`;

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    const updatedDish: Dish = {
      name: dishName,
      description: dishDescription,
      cuisine: cuisine,
      price: parseFloat(dishPrice),
      image: dishImageUrl,
      _id: dish._id,
    };

    
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDish),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Dish updated:', data);
        onClose(); 
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating dish:', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Dish</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dishName">Dish Name:</label>
            <input
              type="text"
              id="dishName"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dishDescription">Dish Description:</label>
            <input
              type="text"
              id="dishDescription"
              value={dishDescription}
              onChange={(e) => setDishDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine:</label>
            <input
              type="text"
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dishPrice">Dish Price:</label>
            <input
              type="number"
              id="dishPrice"
              value={dishPrice}
              onChange={(e) => setDishPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dishImageUrl">Dish Image URL:</label>
            <input
              type="url"
              id="dishImageUrl"
              value={dishImageUrl}
              onChange={(e) => setDishImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" className='form__submit'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditDishForm;
