const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('../base/service-section.pug');
const slick = require('slick-carousel');
const scrollDown = require('../../utils/scroll-down');
const _ = require('lodash');

function advertising (context, next) {
  callPrismic({
    documentType: 'service-page',
    tags: 'publicidad'
  }, (results, err) => {
    if (err) return new Error('Bad Request');

    const templateOptions = {
      carouselImages: results[0].data['service-page.carousel-images'].value,
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

      // Overlay arrow scroll animation

      let onScroll = function(){
        var wScroll = $(this).scrollTop();

        $('.down-arrow').css({
          'transform' : 'translate(0px, ' + wScroll / 2 + '%)'
        })

        $('.service-overlay-content').css({
          'transform' : 'translate(0px, ' + wScroll / 8 + '%)'
        })

        if (wScroll > 500) {
          $('#main-nav').css({'background-color' : 'rgba(34, 34, 40, 1)'})
        } else {
          $('#main-nav').css({'background-color' : 'rgba(34, 34, 40, .9)'})
        }

      }

      $(window).scroll(onScroll);

      // Scrolling to service section

      $('.down-arrow').click(function(){
        scrollDown('.section-inner', 800);
      });

      initAdvertisingVideo(results, $section);
    });

  });
}

function initAdvertisingVideo (results, $section, videoId) {
  var videoURL = results[0].data['service-page.video-link'].value[0].text;

  if (!videoURL || !(typeof videoURL == 'string') ) {
    return;
  }

  // BEWARE: Obscure string manipulation ahead
  var videoId = videoURL.slice(videoURL.indexOf('v=')+2);

  initYoutubeVideo($section, videoId);
}

function initYoutubeVideo ($section, videoId) {
  const $videoCont = $section.find('.video-background');

  var player;

  function createVideo () {
    return new YT.Player('service-video', {
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
    // TO-DO: Show button
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      showVideo();
    }
    if (event.data === YT.PlayerState.ENDED) {
      hideVideo();
    }
  }

  function showVideo() {
    $videoCont.removeClass('hide-opacity');
  }

  function hideVideo() {
    $videoCont.addClass('hide-opacity');
  }

  if (window.youtubeAPIReady) {
    player = createVideo();
    return;
  }

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function() {
    player = createVideo();
    window.youtubeAPIReady = true;
  }
}


module.exports = advertising;
