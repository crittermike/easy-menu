(function ($) {
  $.fn.mobileEasy = function(options) {
    //Default Options
    var settings = $.extend({
      self: $(this),
      breakPoint: '780',
      maxWidth: '70%',
      speed: '1000',
      mobileIcon: '.mobileIcon',
      subClass: '.me-smu',
      itemClass: '.me-smi',
      containerOffset: ''
    }, options);
    var windowWidth = 0;
    var containerOffset = 0;
    
    $('li', settings.self).each(function(idx, li){
      //Add Classes to menu items
      $(this).addClass(settings.itemClass.replace('.',''));
      $('ul', this).addClass(settings.subClass.replace('.',''));
    });
    $(settings.mobileIcon).click(function(){
      if(settings.self.css('display') == 'none') {
        settings.self.show();
        $(settings.self).animate({
          width: settings.maxWidth,
        }, settings.speed);
      }else {
        
        $(settings.self).animate({
          width: 0,
        }, settings.speed, function(){
          settings.self.hide();
        });
        
      }
    });

    $(settings.mobileIcon).hide();
    $(settings.subClass).hide();
    $(settings.itemClass).hover(
      function() {
        $('ul', $(this)).show();
      }, function() {
        $('ul', $(this)).hide();
      }
    );

    $(window).resize(function(){
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
      settings.self.css('position', 'fixed')
        .css('right', 0)
        .css('top', containerOffset)
        .css('width', 0)
        .css('height', ($(document).outerHeight(true) - containerOffset))
        .hide();
        
    };
    function desktopMenu() {
      //When our menu is in a desktop state
      $(settings.itemClass)
        .css('display', 'inline-block')
        .css('width', 'auto');
      $(settings.subClass).css('position', 'absolute');
      $(settings.mobileIcon).hide();
      settings.self
        .show()
        .css('position', 'relative')
        .css('right', 'auto')
        .css('top', 'auto')
        .css('width', 'auto')
        .css('height', 'auto');
    }
  }
    
}(jQuery));
