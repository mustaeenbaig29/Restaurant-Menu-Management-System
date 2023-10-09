"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menuController_1 = __importDefault(require("../controllers/menuController"));
const router = express_1.default.Router();
router.get('/menu', menuController_1.default.getAllDishes);
router.post('/menu', menuController_1.default.createDish);
router.put('/menu/:id', menuController_1.default.updateDish);
router.delete('/menu/:id', menuController_1.default.deleteDish);
exports.default = router;
