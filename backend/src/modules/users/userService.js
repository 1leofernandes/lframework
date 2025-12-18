const BaseService = require('../_base/baseService');
const BaseRepository = require('../_base/baseRepository');
const BaseValidation = require('../_base/baseValidation');
const userValidation = require('./userValidation');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/token');

class UserService extends BaseService {
  constructor() {
    const repository = new BaseRepository('User');
    const validation = new BaseValidation(userValidation);
    super(repository, validation);
  }

  async create(data, user, tenant) {
    // Hash password before creating
    data.password = await hashPassword(data.password);
    return super.create(data, user, tenant);
  }

  async login(email, password, tenant) {
    const user = await this.repository.getById({ email, tenantId: tenant.id });
    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken({ id: user.id, email: user.email, tenantId: tenant.id });
    return { user, token };
  }

  async update(id, data, user, tenant) {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    return super.update(id, data, user, tenant);
  }
}

module.exports = UserService;
