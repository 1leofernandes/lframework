const express = require('express');
const BaseController = require('./baseController');

class BaseRoutes {
  constructor(controller) {
    this.router = express.Router();
    this.controller = controller;
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.controller.create);
    this.router.get('/', this.controller.getAll);
    this.router.get('/:id', this.controller.getById);
    this.router.put('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRoutes;
