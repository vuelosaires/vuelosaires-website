const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('../base/service-section.pug');
const slick = require('slick-carousel');

function real_state (context, next) {
  callPrismic({
    documentType: 'service-page',
    tags: 'inmobiliaria'
  }, (results, err) => {
    if (err) return new Error('Bad Request');
    console.log(results)

    const templateOptions = {
      topCarouselImages: results[0].data['service-page.top-carousel-images'].value[0],
      carouselImages: results[0].data['service-page.carousel-images'].value[0],
      description: results[0].data['service-page.service-description'].value[0].text,
      topTitle: results[0].data['service-page.top-title'].value[0].text,
      bottomTitle: results[0].data['service-page.bottom-title'].value[0].text,
      title: results[0].data['service-page.service-title'].value[0].text
    }

    render(context, template, templateOptions, () => {
      const $section = $('.service-section');

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

module.exports = real_state;
