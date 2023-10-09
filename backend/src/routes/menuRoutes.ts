import express from 'express';
import menuController from '../controllers/menuController';

const router = express.Router();

router.get('/menu', menuController.getAllDishes);
router.post('/menu', menuController.createDish);
router.put('/menu/:id', menuController.updateDish);
router.delete('/menu/:id', menuController.deleteDish);
router.get('/menu/:cuisine', menuController.getDishesByCuisine);

export default router;