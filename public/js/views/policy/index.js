const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./policy.pug');

function policy (context, next) {
  render(context, template);
}

module.exports = policy;
