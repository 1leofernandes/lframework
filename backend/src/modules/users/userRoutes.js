const express = require('express');
const UserController = require('./userController');

const router = express.Router();
const controller = new UserController();

router.post('/login', controller.login);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
