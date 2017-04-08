// Smooth scroll anchors if raf support

// Based on raf-scroll-to
// https://github.com/webyak/raf-scroll-to
// MIT - Copyright (c) 2015 Yannik Schweinzer
if (window.requestAnimationFrame) {
  var raf = window.requestAnimationFrame

  var easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  /**
   * Scroll to a DOM element
   * @param {Element} element  - The element to scroll to.
   * @param {number}  to       - The position to scroll to, relative to the top
   *                             of the element.
   * @param {number}  duration - How long the scrolling should take.
   */
  var scrollTo = function(element, to, duration) {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 16;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        raf(animateScroll);
      }
    };
    animateScroll();
  };

  // For every anchor
  [].forEach.call(document.querySelectorAll('a[href]'), function(elem) {
    // Listen for clicks
    elem.addEventListener('click', function(evt) {
      // Check out the hash which it points to
      var href = this.href || ''
      var hash = href.slice(href.indexOf('#'))

      // Lookup the element it points to
      var elem = document.getElementById(hash.slice(1))

      // Stop if not found, except it links to the current page
      if (!elem && window.location.pathname.slice(0, hash.length) !== hash) {
        return
      }

      // Webkit fix
      var container = document.scrollingElement || document.documentElement

      var offset = elem ? elem.getBoundingClientRect().top + container.scrollTop - 70 : 0

      // Start scrolling, if elem not found, scroll to top
      scrollTo(container, offset, 300)

      // Cancel the page jump, but still apply the history state
      evt.preventDefault()
      history.replaceState(undefined, undefined, hash)
    })
  })
}
