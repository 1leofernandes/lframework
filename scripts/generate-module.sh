#!/bin/bash

# Script to generate a new module (CRUD) for the framework

echo "Generating new module..."

# Get module name
read -p "Enter module name (singular): " MODULE_NAME
read -p "Enter module plural: " MODULE_PLURAL

# Create module directory
MODULE_DIR="backend/src/modules/$MODULE_PLURAL"
mkdir -p "$MODULE_DIR"

# Create model file
cat > "$MODULE_DIR/${MODULE_NAME}Model.js" << EOF
// Prisma model is defined in schema.prisma
// This file can contain additional model logic if needed
EOF

# Create validation file
cat > "$MODULE_DIR/${MODULE_NAME}Validation.js" << EOF
const Joi = require('joi');

const ${MODULE_NAME}Validation = {
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional()
};

module.exports = ${MODULE_NAME}Validation;
EOF

# Create service file
cat > "$MODULE_DIR/${MODULE_NAME}Service.js" << EOF
const BaseService = require('../_base/baseService');
const BaseRepository = require('../_base/baseRepository');
const BaseValidation = require('../_base/baseValidation');
const ${MODULE_NAME}Validation = require('./${MODULE_NAME}Validation');

class ${MODULE_NAME}Service extends BaseService {
  constructor() {
    const repository = new BaseRepository('${MODULE_NAME}');
    const validation = new BaseValidation(${MODULE_NAME}Validation);
    super(repository, validation);
  }

  // Add custom methods here
}

module.exports = ${MODULE_NAME}Service;
EOF

# Create controller file
cat > "$MODULE_DIR/${MODULE_NAME}Controller.js" << EOF
const BaseController = require('../_base/baseController');
const ${MODULE_NAME}Service = require('./${MODULE_NAME}Service');

class ${MODULE_NAME}Controller extends BaseController {
  constructor() {
    const service = new ${MODULE_NAME}Service();
    super(service);
  }

  // Add custom methods here
}

module.exports = ${MODULE_NAME}Controller;
EOF

# Create routes file
cat > "$MODULE_DIR/${MODULE_NAME}Routes.js" << EOF
const express = require('express');
const ${MODULE_NAME}Controller = require('./${MODULE_NAME}Controller');

const router = express.Router();
const controller = new ${MODULE_NAME}Controller();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
EOF

echo "Module $MODULE_NAME generated successfully!"
echo "Don't forget to:"
echo "1. Add the model to schema.prisma"
echo "2. Add routes to server.js"
echo "3. Run 'npm run generate' to update Prisma client"
