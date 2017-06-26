const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./about.pug');
const slick = require('slick-carousel');

function about (context, next) {
  callPrismic({ documentType: 'about' }, (results, err) => {
    console.log(results);
    if (err || !results.length || !results) return new Error('Bad request.');

    var templateOpts = {
      title: results[0].data['about.about-title'].value[0].text,
      description: results[0].data['about.about-description'].value[0].text
    };

    render(context, template, templateOpts);
  });
}

module.exports = about;
