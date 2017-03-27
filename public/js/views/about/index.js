const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./about.pug');
const slick = require('slick-carousel');

function about (context, next) {
  render(context, template);
  $('.single-item').slick({
    dots: true,
    speed: 500,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3 * 1000,
    infinite: true
  });
}

module.exports = about;
