import { Request, Response } from 'express';
import Dish, { IDish } from '../models/Dish';

const menuController = {
  getAllDishes: async (req: Request, res: Response) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getDishById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log('ID parameter:', id); 
      const dish = await Dish.findById(id);
      console.log('Dish found:', dish); 
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      res.json(dish);
    } catch (err) {
      console.error('Error fetching dish by ID:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createDish: async (req: Request, res: Response) => {
    try {
      const { name, description, cuisine, price, image }: IDish = req.body; 
      const dish = new Dish({ name, description, cuisine, price, image,  }); 
      await dish.save();
      res.status(201).json(dish);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateDish: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, cuisine, price, image }: IDish = req.body; 
      const dish = await Dish.findByIdAndUpdate(
        id,
        { name, description, cuisine, price, image }, 
        { new: true }
      );
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      res.json(dish);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  deleteDish: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dish = await Dish.findByIdAndRemove(id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      res.json({ message: 'Dish deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getDishesByCuisine: async (req: Request, res: Response) => {
    try {
      const { cuisine } = req.params;
      const dishes = await Dish.find({ cuisine });
      res.json(dishes);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  
};

export default menuController;
