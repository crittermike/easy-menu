/**
 * self: The menu
 * breakPoint: The width the mobile menu triggers
 * maxWidth: The width the mobile menu will extend out to
 * speed: The animation speed of the mobile menu
 * mobileIcon: The class for the mobile hamburger to trigger the menu
 * subClass: The class to be placed on the sub menu
 * itemClass: the class to be placed on menu items
 * containerOffset: The class of a container to offset the height of the mobile menu
 * pushBody: true/false to push the body of the site over
 * closeButtonsClass: the class placed on the close button
 * closeButtonCustom: (True/False) Use a custom close button not placed by the plugin
 * hoverIntent: (True/False) Have a hover intent
 * hoverIntentWait: the time to wait for the hover intent
 */

(function ($) {
  $.fn.mobileEasy = function(options) {
    //Default Options
    var settings = $.extend({
      self: $(this),
      breakPoint: '768',
      maxWidth: '70%',
      speed: '1000',
      mobileIcon: '.mobileIcon',
      subClass: '.me-smu',
      superSubClass: '.me-ssmu',
      itemClass: '.me-smi',
      containerOffset: '',
      pushBody: true,
      closeButtonClass: '.easy-menu-close',
      closeButtonCustom: false,
      hoverIntent: true,
      hoverIntentWait: 500,
      touchFriendly: true
    }, options);

    //Initialize
    var windowWidth = 0;
    var containerOffset = 0;
    var hoverIntent;

    $('li', settings.self).each(function(idx, li){
      //Add Classes to menu items
      $(this).addClass(settings.itemClass.replace('.',''));
      $('ul', this).addClass(settings.superSubClass.replace('.',''));

    });

    $(settings.self.children()).each(function(idx, li){
      $('> ul', this).removeClass(settings.superSubClass.replace('.',''));
      $('> ul', this).addClass(settings.subClass.replace('.',''));
    });



    $(settings.mobileIcon).hide();
    $(settings.superSubClass).hide();
    $(settings.subClass).hide();

    $(settings.itemClass).hover(
      function() {
        //Mouse In
        if(settings.hoverIntent && windowWidth > settings.breakPoint){
          window.clearTimeout(hoverIntent);
        }

        if($(this).hasClass('em-show') === false && $(this).closest(settings.subClass).hasClass('em-show') === false ) {
          $('.em-show').hide().removeClass('em-show');
        }

        if($(this).hasClass(settings.subClass)) {
          $(this).addClass('em-show');
        }else {
          $(this).closest(settings.subClass).addClass('em-show');
        }
        $('> ul', $(this)).show();

      }, function() {
        //Mouse Out

        if(settings.hoverIntent && windowWidth > settings.breakPoint){
          var hoveredItem = $(this);
          if ($(this).children(settings.superSubClass).length) {
            $(this).children('li ul').hide();
          }

          hoverIntent = window.setTimeout(function(){

            if($(this).hasClass(settings.subClass)) {
              $(this).removeClass('em-show');
            }else {
              $(this).closest(settings.subClass).removeClass('em-show');
            }
            $('> ul', hoveredItem).hide();
          }, settings.hoverIntentWait);
        }else {
          $('> ul', $(this)).hide();
        }

      }
    );
    if(settings.closeButtonCustom === false) {
      $(settings.self).append('<a class="easy-menu-close" href="javascrip:;">Close</a>');
      $('.easy-menu-close')
        .css('position', 'absolute')
        .css('top', 0)
        .css('right', 0)
        .css('visibility', 'hidden');
    }

    //Menu button clicks
    $(settings.mobileIcon + ', ' + settings.closeButtonClass).click(function() {
      if(settings.self.css('display') == 'none') {
        settings.self.show();
        $(settings.self).animate({
          width: settings.maxWidth
        }, settings.speed);
        if(settings.pushBody) {
          $('body').animate({
            right: settings.maxWidth
          });
        }
      }else {

        $(settings.self).animate({
          width: 0
        }, settings.speed, function(){
          settings.self.hide();
        });
        if(settings.pushBody) {
          $('body').animate({
            right: 0
          });
        }
      }
    });

    $(window).resize(function() {
      windowWidth = $(document).outerWidth(true);
      // containerOffset 
      if(settings.containerOffset !== '') {
        containerOffset = $(settings.containerOffset).outerHeight(true);
      }
      //Check if we are past our breakpoint or not and if position is already triggered.
      if(windowWidth < settings.breakPoint && settings.self.css('position') !== 'fixed') {
        mobileMenu();
      }
      if(windowWidth >= settings.breakPoint && settings.self.css('position') !== 'relative') {
        desktopMenu();
      }
    }).resize();

    function mobileMenu() {
      //When are menu is in a mobile state
      $(settings.itemClass)
        .css('display', 'block')
        .css('width', '100%');
      $(settings.subClass).css('position', 'relative');
      $(settings.mobileIcon).show();
      if(settings.pushBody) {
        $('body').css('position', 'relative');
      }
      settings.self.css('position', 'fixed')
        .css('right', 0)
        .css('top', containerOffset)
        .css('width', 0)
        .css('height', ($(document).outerHeight(true) - containerOffset))
        .hide();
      $(settings.closeButtonClass).css('visibility', 'visible');
    }

    function desktopMenu() {
      //When our menu is in a desktop state
      $(settings.itemClass)
        .css('display', 'inline-block')
        .css('width', 'auto');
      $(settings.superSubClass).css('position', 'relative');
      $(settings.subClass).css('position', 'absolute');
      $(settings.mobileIcon).hide();
      settings.self
        .show()
        .css('position', 'relative')
        .css('right', 'auto')
        .css('top', 'auto')
        .css('width', 'auto')
        .css('height', 'auto');
      $(settings.closeButtonClass).css('visibility', 'hidden');

      if(settings.pushBody) {
        $('body').css('right', 0);
      }
    }
  }

}(jQuery));
