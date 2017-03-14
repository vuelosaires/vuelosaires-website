const Prismic = require('prismic.io');

function callPrismic(documentType, callback) {
  const predicates = documentType ? Prismic.Predicates.at("document.type", documentType) : '';
  return Prismic.api("http://vuelosaires.prismic.io/api", function(error, api) {
    api.query(predicates, {}, function(err, response) { // An empty query will return all the documents
      callback(response.results, err, response);
    });
  });
}

module.exports = callPrismic;