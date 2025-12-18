// Esse módulo:

// Cria CRUDs automaticamente

// Padroniza paginação, filtros, soft delete

// Reduz 80% do código repetido

const { StatusCodes } = require('http-status-codes');
const { sendResponse } = require('../../utils/response');
const { getPagination } = require('../../utils/pagination');

class BaseController {
  constructor(service) {
    this.service = service;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res, next) {
    try {
      const data = await this.service.create(req.body, req.user, req.tenant);
      sendResponse(res, StatusCodes.CREATED, 'Created successfully', data);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { page, limit, ...filters } = req.query;
      const pagination = getPagination(page, limit);
      const result = await this.service.getAll(filters, pagination, req.tenant);
      sendResponse(res, StatusCodes.OK, 'Retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const data = await this.service.getById(req.params.id, req.tenant);
      sendResponse(res, StatusCodes.OK, 'Retrieved successfully', data);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await this.service.update(req.params.id, req.body, req.user, req.tenant);
      sendResponse(res, StatusCodes.OK, 'Updated successfully', data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.service.delete(req.params.id, req.user, req.tenant);
      sendResponse(res, StatusCodes.OK, 'Deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BaseController;