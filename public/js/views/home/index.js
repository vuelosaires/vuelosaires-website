const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./home.pug');

function home (context, next) {
  var carouselResults = callPrismic('homepage', (results, err) => {
    console.log(results)
    var options = {
      videoEmbedURL: results[0].data['homepage.video-embed-url'].value[0].text
    }

    render(context, template, options);
  });
}

module.exports = home;