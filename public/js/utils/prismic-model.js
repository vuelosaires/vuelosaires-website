const Prismic = require('prismic.io');

function callPrismic(predicates, callback) {
  // predicates is needed and should be an object
  if (!predicates || typeof predicates !== 'object') return;
  // predicates can have documentType or tag name as strings
  const docPredicates = predicates.documentType ? predicates.documentType : '';
  const tagPredicates = predicates.tags ? predicates.tags : '';

  const newPredicates = [Prismic.Predicates.at('document.type', docPredicates)];
  if (tagPredicates) {
    newPredicates.push(Prismic.Predicates.at('document.tags', [tagPredicates]));
  }
  return Prismic.api("http://vuelosaires.prismic.io/api", function(error, api) {
    if (error) return new Error('Can\'t connect to the prismic API.');
    api.query(newPredicates, {}, function(err, response) {
      callback(response.results, err, response);
    });
  });
}

module.exports = callPrismic;