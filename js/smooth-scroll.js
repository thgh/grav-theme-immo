// Smooth scroll anchors if raf support
if (window.requestAnimationFrame) {
  var SCROLL_DURATION = 400

  // Based on raf-scroll-to
  // https://github.com/webyak/raf-scroll-to
  // MIT - Copyright (c) 2015 Yannik Schweinzer
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

    duration *= Math.abs(change) < 1024 ? 1 : Math.log2(Math.abs(change)) - 9

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      if (currentTime < duration) {
        element.scrollTop = val
        raf(animateScroll)
      } else {
        element.scrollTop = to
      }
    };
    animateScroll();
  };

  // For every anchor
  [].forEach.call(document.querySelectorAll('nav a'), function(elem) {
    // Listen for clicks
    elem.addEventListener('click', function(evt) {
      // Check out the hash which it points to
      var href = this.href || ''

      // Lookup the element it points to
      var elem = document.getElementById(href.slice(href.indexOf('#') + 1))

      // Stop if not found, except it links to the current page
      if (!elem && window.location.pathname !== this.pathname) {
        return
      }

      // Webkit fix
      var container = document.scrollingElement || document.documentElement

      var offset = elem ? elem.getBoundingClientRect().top + container.scrollTop - 70 : 0

      // Start scrolling, if elem not found, scroll to top
      scrollTo(container, offset, SCROLL_DURATION)

      // Cancel the page jump, but still apply the history state
      evt.preventDefault()
      history.replaceState(undefined, undefined, hash)

      // Scrollspy nav
      Scrollspy.update()
    })
  })
}
