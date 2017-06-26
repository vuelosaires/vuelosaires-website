const callPrismic = require('../../utils/prismic-model');
const render = require('../../utils/render');
const template = require('./policy.pug');

function policy (context, next) {
  callPrismic({ documentType: 'policy' }, (results, err) => {
    console.log(results);
    if (err || !results.length || !results) return new Error('Bad request.');

    var templateOpts = {
      title: results[0].data['policy.policy-title'].value[0].text,
      description: results[0].data['policy.policy-description'].value[0].text
    };

    render(context, template, templateOpts);
  });
}

module.exports = policy;
