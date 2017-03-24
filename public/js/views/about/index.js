const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./about.pug');
const slick = require('slick-carousel');

function about (context, next) {
  render(context, template);
  console.log($('.about-carousel'));
  $('.about-carousel').slick({
    dots: true,
    speed: 500
  });
}

module.exports = about;
