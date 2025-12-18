const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BaseRepository {
  constructor(modelName) {
    this.modelName = modelName;
    this.model = prisma[modelName.toLowerCase()];
  }

  async create(data) {
    return await this.model.create({ data });
  }

  async getAll(filters = {}, { page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.model.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.model.count({ where: filters })
    ]);
    return { data, total };
  }

  async getById(filters) {
    return await this.model.findFirst({ where: filters });
  }

  async update(filters, data) {
    return await this.model.updateMany({
      where: filters,
      data: { ...data, updatedAt: new Date() }
    });
  }

  async delete(filters) {
    return await this.model.deleteMany({ where: filters });
  }
}

module.exports = BaseRepository;
