function scrollDown(target, timing) {
    let scrollTarget = $(target).offset().top;
    $('html, body')
      .animate({scrollTop: scrollTarget}, timing, function(){
        $('html, body').clearQueue();
      }
    );
  }

  module.exports = scrollDown;
