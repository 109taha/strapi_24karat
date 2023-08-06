'use strict';

/**
 * payment router
 */

const { createCoreRouter, updateCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::payment.payment');
