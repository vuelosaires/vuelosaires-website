const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./contact.pug');

function contact (context, next) {
    callPrismic({ documentType: 'contact' }, (results, err) => {
    if (err || !results.length || !results) return new Error('Bad request.');
    var templateOptions = {
      contactDescription: results[0].data['contact.description'].value[0].text
    };

      render(context, template, templateOptions);
      
    })
  }

module.exports = contact;
