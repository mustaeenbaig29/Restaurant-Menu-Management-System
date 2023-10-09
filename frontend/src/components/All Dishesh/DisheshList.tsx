import React, { useState, useEffect } from "react";
import "../All Dishesh/All_Dishesh.css";
import EditDishForm from "../EditDishes/EditDishForm";
import DeleteDish from "../DeleteDish/DeleteDish";

interface Dish {
  _id: string;
  name: string;
  description: string;
  price: number;
  cuisine: string;
  image: string;
}

const DisheshList: React.FC = () => {
  const [activeBox, setActiveBox] = useState<number>(0);
  const [menu, setMenu] = useState<Dish[]>([]);
  const apiUrl: string = "http://localhost:7000/menu";
  const [selectedCuisine, setSelectedCuisine] = useState<string>("indian");
  const [editDish, setEditDish] = useState<Dish | null>(null);
  const [deleteDish, setDeleteDish] = useState<Dish | null>(null);

  const handleEditClick = (dish: Dish) => {
    setEditDish(dish);
  };

  const handleDeleteClick = (dish: Dish) => {
    setDeleteDish(dish);
  };

  const closeEditForm = () => {
    setEditDish(null);
  };

  const handleBoxClick = (boxIndex: number, cuisine: string) => {
    setActiveBox(boxIndex);
    setSelectedCuisine(cuisine.toLowerCase());
  };

  const boxes: string[] = [
    "Indian",
    "Italian",
    "Mexican",
    "Japanese",
    "Turkish",
    "Russian",
  ];

  const fetchMenuData = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: Dish[]) => {
        setMenu(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const filteredDishes: Dish[] =
    selectedCuisine === "all"
      ? menu
      : menu.filter((dish) => dish.cuisine.toLowerCase() === selectedCuisine);

  const closeDeleteModal = () => {
    setDeleteDish(null);
  };

  const handleDelete = (dishId: string) => {
    setMenu((prevMenu) => prevMenu.filter((dish) => dish._id !== dishId));
  };

  return (
    <div className="dish_view">
      <div className="dish_category">
        <div className="box-container">
          {boxes.map((boxName, index) => (
            <div
              key={index}
              className={`box ${activeBox === index ? "active" : ""}`}
              onClick={() => handleBoxClick(index, boxName)}
            >
              <h3>{boxName}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="dish_list">
        {filteredDishes.map((dish) => (
          <div className="dish_display" key={dish._id}>
            <div className="menu_display">
              <div className="image__box">
                {dish.image ? (
                  <img src={dish.image} alt={dish.name} />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    alt="Placeholder"
                  />
                )}
              </div>
              <div className="DishInfoBox">
                <h2>{dish.name}</h2>
                <p>{dish.description}</p>
                <p>₹{dish.price}</p>
                <div className="dish_info">
                  <button
                    onClick={() => handleEditClick(dish)}
                    className="edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(dish)}
                    className="delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editDish && <EditDishForm dish={editDish} onClose={closeEditForm} />}

      {deleteDish && (
        <DeleteDish
          dish={deleteDish}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default DisheshList;
