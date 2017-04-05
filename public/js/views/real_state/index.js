const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./real_state.pug');

function real_state (context, next) {
  render(context, template);
}

module.exports = real_state;
