"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dish_1 = __importDefault(require("../models/Dish"));
const menuController = {
    getAllDishes: async (req, res) => {
        try {
            const dishes = await Dish_1.default.find();
            res.json(dishes);
        }
        catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    createDish: async (req, res) => {
        try {
            const { name, description, price, image } = req.body;
            const dish = new Dish_1.default({ name, description, price, image });
            await dish.save();
            res.status(201).json(dish);
        }
        catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateDish: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, image } = req.body;
            const dish = await Dish_1.default.findByIdAndUpdate(id, { name, description, price, image }, { new: true });
            if (!dish) {
                return res.status(404).json({ error: 'Dish not found' });
            }
            res.json(dish);
        }
        catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteDish: async (req, res) => {
        try {
            const { id } = req.params;
            const dish = await Dish_1.default.findByIdAndRemove(id);
            if (!dish) {
                return res.status(404).json({ error: 'Dish not found' });
            }
            res.json({ message: 'Dish deleted' });
        }
        catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};
exports.default = menuController;
