function init () {
  // Global jQuery ftw
  window.$ = window.jQuery = require('jquery');

  // General use helpers
  function checkClassNames ($target, classList) {
    return classList.some((className) => {
      return $target.hasClass(className);
    });
  }

  // Global click handler
  $('html').on('click', (e) => {
    const $target = $(e.target);
    // console.log($target);
  });
}

module.exports = init;