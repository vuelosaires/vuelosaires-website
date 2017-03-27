const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./services.pug');

function services (context, next) {
  render(context, template);
}

module.exports = services;
