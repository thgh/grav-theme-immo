/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/
Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function($) {
  var $window = $(window);
  var windowHeight = $window.height();
  var aspectRatio = $window.width() / $window.height();

  $window.resize(function() {
    windowHeight = $window.height();
    aspectRatio = $window.width() / $window.height();
  });

  $.fn.parallax = function(xpos, speedFactor) {
    var $this = $(this);
    var paddingTop = 0;

    // get the starting position of each element to have parallax applied to it
    var topOffsets = $this.map(function(i, elem) {
      return $(elem).offset().top;
    });

    // setup defaults if arguments aren't specified
    if (arguments.length < 1 || xpos === null) xpos = '50%';
    if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;

    // function to be called whenever the window is scrolled or resized
    function update() {

      if (aspectRatio >= 1.777) {
        var pos = $window.scrollTop();
        $this.each(function(i) {
          var $element = $(this);
          var top = $element.offset().top;
          var height = $element.height();

          // Check if totally above or totally below viewport
          if (top + height < pos || top > pos + windowHeight) {
            return;
          }

          $this.css('backgroundPosition', xpos + ' ' + Math.round((topOffsets[i] - pos) * speedFactor) + 'px');
        });
      } else {
        // Restore position to default
        $this.css('backgroundPosition', xpos + ' ' + '50%');
      }
    }
    $window.bind('scroll', update).resize(update);
    update();

  };
})(jQuery);

$(document).ready(function() {
  $('.parallax').parallax('50%', 0.2);
})
