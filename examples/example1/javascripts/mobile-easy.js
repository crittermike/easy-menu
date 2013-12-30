(function ($) {
  $.fn.mobileEasy = function(options) {
    //Default Options
    var settings = $.extend({
      self: $(this),
      breakPoint: '780',
      maxWidth: '70%',
      speed: 'slow',
      mobileIcon: '.mobileIcon',
      subClass: '.me-smu',
      itemClass: '.me-smi',
    }, options);
    
    
    $('li', settings.self).each(function(idx, li){
      //Add Classes to menu items
      $(this).addClass(settings.itemClass.replace('.',''));
      $('ul', this).addClass(settings.subClass.replace('.',''));
    });
    $(settings.mobileIcon).click(function(){
      if(settings.self.css('display') == 'none') {
        settings.self.show();
      }else {
        settings.self.hide();
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
      
      var windowWidth = $(document).outerWidth(true);
      if(windowWidth < settings.breakPoint && settings.self.css('position') !== 'fixed') {
        mobileMenu();
      }
      if(windowWidth >= settings.breakPoint && settings.self.css('position') !== 'relative') {
        desktopMenu();
      }

    }).resize();

    function mobileMenu() {
      console.log('mobile Menu');
      $(settings.mobileIcon).show();
      settings.self.css('position', 'fixed');
      settings.self.css('right', 0);
      settings.self.css('top', 0);
      settings.self.hide();
    };
    function desktopMenu() {
      console.log('desktop Menu');
      $(settings.mobileIcon).hide();
      settings.self.show();
      settings.self.css('position', 'relative');
      settings.self.css('right', 'auto');
      settings.self.css('top', 'auto');
    }
  }
    
}(jQuery));