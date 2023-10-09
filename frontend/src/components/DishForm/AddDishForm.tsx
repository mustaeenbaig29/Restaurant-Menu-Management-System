import React, { useState } from 'react';
import './AddDishModal.css';

interface AddDishFormProps {
  onClose: () => void;
}

const AddDishForm: React.FC<AddDishFormProps> = ({ onClose }) => {
  const [dishName, setDishName] = useState<string>('');
  const [dishDescription, setDishDescription] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('');
  const [dishPrice, setDishPrice] = useState<string>('');
  const [dishImageUrl, setDishImageUrl] = useState<string>('');
  const cuisineOptions: string[] = [
    '', 
    'Indian',
    'Italian',
    'Mexican',
    'Japanese',
    'Turkish',
    'Russian',
  ];

  const apiUrl: string = 'http://localhost:7000/menu';

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (cuisine === '') {
      alert('Please select your cuisine.');
      return;
    }

    
    const newDish = {
      name: dishName,
      description: dishDescription,
      cuisine: cuisine, 
      price: parseFloat(dishPrice),
      image: dishImageUrl,
    };

    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDish),
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log('New dish added:', data);

        
        fetchMenuData();

        onClose(); 

        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding new dish:', error);
      });
  };

  
  const fetchMenuData = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Dish</h2>
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
            <select
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              required
            >
              {cuisineOptions.map((option) => (
                <option key={option} value={option}>
                  {option === '' ? 'Select your cuisine' : option}
                </option>
              ))}
            </select>
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
          <button type="submit" className='form__submit'>Add Dish</button>
        </form>
      </div>
    </div>
  );
};

export default AddDishForm;
