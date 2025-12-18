// Regra:
// Nenhuma lógica de autenticação dentro de controllers.

const { verifyToken } = require('../utils/token');
const { AuthError } = require('../errors/authError');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new AuthError('No token provided');

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) throw new AuthError('User not found');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };