const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./home.pug');

function home (context, next) {
  callPrismic({ documentType: 'homepage' }, (results, err) => {
    console.log(results);
    if (err || !results.length || !results) return new Error('Bad request.');

    var templateOpts = {
      service_modules: {
        advertising: {
          title: results[0].data['homepage.homepage-advertising-title'].value[0].text,
          description: results[0].data['homepage.homepage-advertising-description'].value[0].text,
        },
        turism: {
          title: results[0].data['homepage.homepage-turism-title'].value[0].text,
          description: results[0].data['homepage.homepage-turism-description'].value[0].text
        },
        real_state: {
          title: results[0].data['homepage.homepage-realstate-title'].value[0].text,
          description: results[0].data['homepage.homepage-realstate-description'].value[0].text
        }
      }
    };

    render(context, template, templateOpts);

    const $section = $('#home');

    // Overlay arrow scroll animation

    $(window).scroll(function(){
      var wScroll = $(this).scrollTop();
      // console.log(wScroll)

      $('.down-arrow').css({
        'transform' : 'translate(0px, ' + wScroll / 2 + '%)',
        'filter' : 'blur(' + wScroll / 50 + 'px)',
        'transform' : 'scale(' + 1 / wScroll +')'
      })

      $('.home-overlay-content').css({
        'transform' : 'translate(0px, ' + wScroll / 8 + '%)'
      })
    })

    // Scrolling to service section

    $('.down-arrow').click(function(){
      scrollDown('#home-body', 800);
    });

    initHomeVideo(results, $section);

  });
}

function scrollDown(target, timing) {
    let scrollTarget = $(target).offset().top;
    $('html, body').animate({scrollTop: scrollTarget}, timing, function(){
      $('html, body').clearQueue();
    })
  }

function initHomeVideo (results, $section, videoId) {
  var videoURL = results[0].data['homepage.video-link'].value[0].text;

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
    player = new YT.Player('home-video', {
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

module.exports = home;
