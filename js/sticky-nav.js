var classList = document.documentElement.classList

// Check if classList is supported
if (classList) {
  var lastPageY

  // Initial update is without transition
  updateStickyNav()

  // Update on scroll
  window.addEventListener('scroll', throttle(updateStickyNav, 100, { trailing: true }))

  // Defer enabling the transition to avoid moving things on page load
  setTimeout(function() {
    classList.add('sticky-transition')
  }, 100)


  function updateStickyNav() {
    var pageY = window.pageYOffset || document.documentElement.scrollTop
    classIf('sticky-top', pageY < 10)
    lastPageY && classIf('sticky-up', pageY <= lastPageY)
    lastPageY = pageY
  }

  // Apply class to html tag based on boolean
  function classIf(cls, apply) {
    if (apply) {
      !classList.contains(cls) && classList.add(cls)
    } else {
      classList.contains(cls) && classList.remove(cls)
    }
  }

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }
}
