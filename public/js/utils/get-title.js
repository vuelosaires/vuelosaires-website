var mappings = require('./title-mappings');
var parseContext = require('./parse-context');
function getCurrentTitle (context) {
  var parsedContext = parseContext(context);

  var mappingIndex = Object.keys(mappings).find((val) => {
    return val == parsedContext.classText;
  });

  return 'Vuelos Aires - ' + mappings[mappingIndex];
}

module.exports = getCurrentTitle;