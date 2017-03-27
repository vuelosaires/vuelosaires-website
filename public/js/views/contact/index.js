const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./contact.pug');

function contact (context, next) {
  render(context, template);
}

module.exports = contact;
