const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('../base/service-section.pug');
const slick = require('slick-carousel');
const initCarousel = require('../../utils/init-carousel');

function advertising (context, next) {
  callPrismic({
    documentType: 'service-page',
    tags: 'publicidad'
  }, (results, err) => {
    if (err) return new Error('Bad Request');

    const templateOptions = {
      topCarouselImages: results[0].data['service-page.top-carousel-images'].value[0],
      carouselImages: results[0].data['service-page.carousel-images'].value[0],
      description: results[0].data['service-page.service-description'].value[0].text,
      topTitle: results[0].data['service-page.top-title'].value[0].text,
      bottomTitle: results[0].data['service-page.bottom-title'].value[0].text,
      title: results[0].data['service-page.service-title'].value[0].text
    }

    render(context, template, templateOptions, () => {

      // Place initCarousel here

      initCarousel();

    });

  });
}

module.exports = advertising;
