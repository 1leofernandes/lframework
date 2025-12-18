const BaseController = require('./baseController');
const BaseService = require('./baseService');
const BaseRepository = require('./baseRepository');
const BaseValidation = require('./baseValidation');
const BaseRoutes = require('./baseRoutes');

class CrudFactory {
  static create(modelName, validationSchema) {
    const repository = new BaseRepository(modelName);
    const validation = new BaseValidation(validationSchema);
    const service = new BaseService(repository, validation);
    const controller = new BaseController(service);
    const routes = new BaseRoutes(controller);

    return {
      repository,
      validation,
      service,
      controller,
      routes: routes.getRouter()
    };
  }
}

module.exports = CrudFactory;
