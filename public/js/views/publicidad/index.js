const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./publicidad.pug');
const slick = require('slick-carousel');

function publicidad (context, next) {
  callPrismic({
    documentType: 'service-page',
    tags: 'publicidad'
  }, (results, err) => {
    if (err) return new Error('Bad Request');

    results = results[0];
    const templateOptions = {
      carouselImages: results.data['service-page.carousel-images'].value,
      description: results.data['service-page.service-description'].value[0].text,
      title: results.data['service-page.service-title'].value[0].text
    }

    render(context, template, templateOptions, () => {
      const $section = $('#publicidad-service');

      $section.find('.section-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1
      });
    });
  });
}

module.exports = publicidad;
