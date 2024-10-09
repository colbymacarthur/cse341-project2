const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:id', validation.validateHexkey, usersController.getUserById);

router.post('/', validation.validateUser, usersController.createUser);

router.put('/', validation.validateUser, usersController.updateUser);

router.delete('/:id', validation.validateHexkey, usersController.deleteUser);

module.exports = router;