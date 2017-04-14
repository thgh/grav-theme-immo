var classList = document.documentElement.classList

// Check if classList is supported
if (classList) {
  var lastPageY

  // Initial update is without transition
  updateStickyNav()

  // Update on scroll
  window.addEventListener('scroll', throttle(updateStickyNav, 200, { trailing: true }))

  // Defer enabling the transition to avoid moving things on page load
  setTimeout(function() {
    classList.add('sticky-transition')
  }, 100)


  function updateStickyNav() {
    var pageY = window.pageYOffset || document.documentElement.scrollTop
    classIf(classList, 'sticky-top', pageY < 10)
    classIf(classList, 'sticky-up', pageY <= lastPageY || !lastPageY)
    lastPageY = pageY
  }
}
