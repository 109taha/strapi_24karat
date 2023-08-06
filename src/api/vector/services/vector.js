'use strict';

/**
 * vector service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vector.vector');
