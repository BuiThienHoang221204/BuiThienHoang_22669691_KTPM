const express = require('express');
const menuController = require('../controllers/menuController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, admin, menuController.createMenu);
router.get('/', menuController.getAllMenus);
router.get('/:id', menuController.getMenuById);
router.put('/:id', protect, admin, menuController.updateMenu);
router.delete('/:id', protect, admin, menuController.deleteMenu);

module.exports = router;
