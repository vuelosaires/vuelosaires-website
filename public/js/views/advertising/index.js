const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./advertising.pug');
const slick = require('slick-carousel');

function advertising (context, next) {
  callPrismic({
    documentType: 'service-page',
    tags: 'publicidad'
  }, (results, err) => {
    if (err) return new Error('Bad Request');
    console.log(results[0].data['service-page.video-link'].value[0].text)
    const templateOptions = {
      carouselImages: results[0].data['service-page.carousel-images'].value,
      description: results[0].data['service-page.service-description'].value[0].text,
      title: results[0].data['service-page.service-title'].value[0].text
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

    // Overlay arrow scroll animation

    $(window).scroll(function(){
      var wScroll = $(this).scrollTop();
      // console.log(wScroll)

      $('.down-arrow').css({
        'transform' : 'translate(0px, ' + wScroll / 2 + '%)',
        'filter' : 'blur(' + wScroll / 50 + 'px)'
      })

      $('.advertising-overlay-content').css({
        'transform' : 'translate(0px, ' + wScroll / 8 + '%)'
      })
    })

    // Scrolling to service section

    $('.down-arrow').click(function(){
      scrollDown('.section-inner', 800);
    });

    const $section = $('#publicidad-service');

    initAdvertisingVideo(results, $section);

  });
}

function scrollDown(target, timing) {
    let scrollTarget = $(target).offset().top;
    $('html, body').animate({scrollTop: scrollTarget}, timing, function(){
      $('html, body').clearQueue();
    })
  }

  function initAdvertisingVideo (results, $section, videoId) {
    var videoURL = results[0].data['service-page.video-link'].value[0].text;

    if (!videoURL || !(typeof videoURL == 'string') ) {
      return;
    }

    // BEWARE: Obscure string manipulation ahead
    var videoId = videoURL.slice(videoURL.indexOf('v=')+2);

    createHomeVideo($section, videoId);
  }

function createHomeVideo ($section, videoId) {
  const $videoCont = $section.find('.video-background');

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('advertising-video', {
      videoId: videoId,
      height:'100%',
      width: '100%',
      fitToBackground: true,
      playerVars: {
        'autoplay': 1,
        'rel' : 0,
        'showinfo' : 0,
        'showsearch' : 0,
        'controls': 0,
        'loop': 1,
        'enablejsapi' : 1,
        'playlist': videoId,
        'modestbranding': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    event.target.setPlaybackQuality('default');
    event.target.mute();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      showVideo();
    }
    if (event.data == YT.PlayerState.ENDED) {
      hideVideo();
    }
  }

  function showVideo() {
    $videoCont.removeClass('hide-opacity');
  }

  function hideVideo() {
    $videoCont.addClass('hide-opacity');
  }
}


module.exports = advertising;
