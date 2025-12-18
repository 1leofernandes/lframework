// Padrão fixo:

// Controller → HTTP

// Service → regra de negócio

// Repository → banco

// Validation → schema

// Routes → Express/Fastify

const BaseController = require('../_base/baseController');
const UserService = require('./userService');

class UserController extends BaseController {
  constructor() {
    const service = new UserService();
    super(service);
    this.login = this.login.bind(this);
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(email, password, req.tenant);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;