const { NotFoundError } = require('../../errors/notfoundError');
const { ValidationError } = require('../../errors/validationError');

class BaseService {
  constructor(repository, validation) {
    this.repository = repository;
    this.validation = validation;
  }

  async create(data, user, tenant) {
    // Validate input
    const { error } = this.validation.create.validate(data);
    if (error) throw new ValidationError(error.details[0].message);

    // Add tenant if multi-tenant
    if (tenant && this.repository.modelName !== 'Tenant') {
      data.tenantId = tenant.id;
    }

    return await this.repository.create(data);
  }

  async getAll(filters, pagination, tenant) {
    if (tenant && this.repository.modelName !== 'Tenant') {
      filters.tenantId = tenant.id;
    }

    const { data, total } = await this.repository.getAll(filters, pagination);
    return {
      data,
      pagination: {
        ...pagination,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    };
  }

  async getById(id, tenant) {
    const filters = { id };
    if (tenant && this.repository.modelName !== 'Tenant') {
      filters.tenantId = tenant.id;
    }

    const item = await this.repository.getById(filters);
    if (!item) throw new NotFoundError(`${this.repository.modelName} not found`);
    return item;
  }

  async update(id, data, user, tenant) {
    // Validate input
    const { error } = this.validation.update.validate(data);
    if (error) throw new ValidationError(error.details[0].message);

    const filters = { id };
    if (tenant && this.repository.modelName !== 'Tenant') {
      filters.tenantId = tenant.id;
    }

    const item = await this.repository.update(filters, data);
    if (!item) throw new NotFoundError(`${this.repository.modelName} not found`);
    return item;
  }

  async delete(id, user, tenant) {
    const filters = { id };
    if (tenant && this.repository.modelName !== 'Tenant') {
      filters.tenantId = tenant.id;
    }

    const deleted = await this.repository.delete(filters);
    if (!deleted) throw new NotFoundError(`${this.repository.modelName} not found`);
  }
}

module.exports = BaseService;
