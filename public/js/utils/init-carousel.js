function initCarousel() {
  const $section = $('.service-section');

  $section.find('.section-carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    fade: true,
    cssEase: 'ease-in-out'
  });

  $section.find('.top-carousel').slick({
    dots: true,
    autoplay: true,
    speed: 650,
    slidesToShow: 1,
    infinite: true,
    arrows: false,
    fade: true,
    cssEase: 'ease-in-out'
  })      
}

module.exports = initCarousel;