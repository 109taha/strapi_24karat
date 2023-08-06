'use strict';

/**
 * digitizing service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::digitizing.digitizing');
