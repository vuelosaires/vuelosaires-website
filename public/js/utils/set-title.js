var mappings = require('./title-mappings');
var parseContext = require('./parse-context');

function setCurrentTitle (context) {
  var parsedContext = parseContext(context);

  var mappingIndex = Object.keys(mappings).find((val) => {
    return val == parsedContext.classText;
  });

  if (!mappings[mappingIndex]) {
    return;
  }

  document.title = 'Vuelos Aires - ' + mappings[mappingIndex];
}

module.exports = setCurrentTitle;