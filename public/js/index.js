// Include page manager
const page = require('page');

// Global script
const initScript = require('./utils/init-script');

// Not Found template
const notFound = require('./views/base/notfound.pug');

// Views
const home = require('./views/home/index');
const about = require('./views/about/index');
const publicidad = require('./views/publicidad/index');

// Vendor global scripts
const pace = require('pace-progress');
const wow = require('wowjs').WOW;

// Internal global scripts
const setCurrentSafeTitle = require('./utils/set-title');

// Helpers
const render = require('./utils/render');
const parseContext = require('./utils/parse-context');

function initPace () {
  $('.pace-done, .pace-inactive').removeClass('pace-done pace-inactive');
  pace.once('done', function() {
    $('.inner-body').removeClass('hide');
    new wow().init();
  });
  pace.start();
}

function selectSidebarItem (context) {
  const sideBar = $('#main-nav');
  sideBar.find('.selected').removeClass('selected');
  const parsedContext = parseContext(context);
  if (!parsedContext || !parsedContext.classText) { return; }
  sideBar.find('[data-btn-handle="' + parsedContext.classText.toLowerCase() + '"]').addClass('selected');
}

function closeSidebar () {
  const mobileNav = $('#mobile-nav');
  mobileNav.removeClass('mobile-open');
}

$(document).ready(() => {

  initScript();

  page.base('/#');

  page((context, next) => {
    setCurrentSafeTitle(context);
    initPace();
    selectSidebarItem(context);
    closeSidebar();
    next();
  });

  page.exit((context, next) => {
    $('.inner-body').addClass('hide');
    next();
  });

  page('/', home);

  page('/about', about);

  page('/publicidad', publicidad);

  // 404 handler
  // Executes when no other route was found
  page('*', () => {
    render('404', notFound);
  })

  page();

});
