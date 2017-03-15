const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./home.pug');

function home (context, next) {
  var carouselResults = callPrismic('homepage', (results, err) => {
    var videoURL = results[0].data['homepage.video-link'].value[0].text;

    if (!videoURL || !(typeof videoURL == 'string') ) {
      return;
    }

    // BEWARE: Obscure string manipulation ahead
    var videoId = videoURL.slice(videoURL.indexOf('v=')+2);

    render(context, template);

    const $section = $('#home');

    createHomeVideo($section, videoId);
  });
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