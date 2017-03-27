const callPrismic = require('../../../utils/prismic-model');
const render = require('../../../utils/render');
const template = require('./turism.pug');

function turism (context, next) {
  render(context, template);
}

module.exports = turism;
