const express = require('express');
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, admin, userController.getUserById);
router.put('/:id', protect, admin, userController.updateUser);
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
