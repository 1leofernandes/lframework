const { PrismaClient } = require('@prisma/client');
const { NotFoundError } = require('../errors/notfoundError');
const prisma = new PrismaClient();

const tenantMiddleware = async (req, res, next) => {
  try {
    const tenantId = req.headers['x-tenant-id'] || req.user?.tenantId;
    if (!tenantId) {
      return next(new NotFoundError('Tenant not specified'));
    }

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) {
      return next(new NotFoundError('Tenant not found'));
    }

    req.tenant = tenant;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = tenantMiddleware;
