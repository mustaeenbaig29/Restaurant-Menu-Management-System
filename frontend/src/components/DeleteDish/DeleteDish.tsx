import React from 'react';
import "../DishForm/AddDishModal.css"

interface Dish {
  _id: string;
}

interface DeleteDishProps {
  onDelete: (dishId: string) => void;
  onClose: () => void;
  dish: Dish;
}

const DeleteDish: React.FC<DeleteDishProps> = ({ onDelete, onClose, dish }) => {
  const apiUrl: string = `http://localhost:7000/menu/${dish._id}`;

 
  const handleDelete = () => {

    fetch(apiUrl, {
      method: 'DELETE',
    })
      .then(() => {
       
        onDelete(dish._id);
        onClose(); 
      })
      .catch((error) => {
        console.error('Error deleting dish:', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Delete Dish</h2>
        <p>Are you sure you want to delete this dish?</p>
        <button onClick={handleDelete} className='form__submit btn'>Delete</button>
      </div>
    </div>
  );
};

export default DeleteDish;
