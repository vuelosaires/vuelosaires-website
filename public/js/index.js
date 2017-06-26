// Include page manager
const page = require('page');

// Global script
const initScript = require('./utils/init-script');

// Not Found template
const notFound = require('./views/base/notfound.pug');

// Views
const home = require('./views/home/index');
const about = require('./views/about/index');
const advertising = require('./views/advertising/index');
const real_state = require('./views/real_state/index');
const turism = require('./views/turism/index');
const contact = require('./views/contact/index');
const policy = require('./views/policy/index');

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

  page('/advertising', advertising);

  page('/contact', contact);

  page('/policy', policy);

  page('/turism', turism);

  page('/real_state', real_state);

  // 404 handler
  // Executes when no other route was found
  page('*', () => {
    render('404', notFound);
  })

  page();

  $('.mobile-menu').click(function(){
    $('li').css({
      display: 'block',
      width: '100%'
    })
  })

});
