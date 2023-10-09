import React, { useState } from 'react';
import '../header/Header.css';
import AddDishForm from '../DishForm/AddDishForm';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddDishClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">Fleksa</span>
      </div>

      <div className="add-dish-button button">
        <button onClick={handleAddDishClick}>
          <h3>Add New Dish</h3>
        </button>
      </div>

      {showModal && <AddDishForm onClose={handleCloseModal} />}
    </header>
  );
};

export default Header;
