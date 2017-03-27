const callPrismic = require('../../../utils/prismic-model');
const render = require('../../../utils/render');
const template = require('./advertising.pug');

function advertising (context, next) {
  render(context, template);
}

module.exports = advertising;
