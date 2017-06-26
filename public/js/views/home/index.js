const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./home.pug');
const wow = require('wowjs');

function home (context, next) {
  callPrismic({ documentType: 'homepage' }, (results, err) => {
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

    // Scrolling parallax effect and navbar opacity

    $(window).scroll(function(){
      var wScroll = $(this).scrollTop();

      $('.home-overlay-content').css({
        'transform' : 'translate(0px, ' + wScroll / 8 + '%)'
      })

      if (wScroll > 500) {
        $('#main-nav').addClass('navbar-dark')
      } else {
        $('#main-nav').removeClass('navbar-dark')
      }
    });

    initHomeVideo(results, $section);

  });
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
