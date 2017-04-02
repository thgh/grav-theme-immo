var classList = document.documentElement.classList

// Check if classList is supported
if (classList) {
  function updateStickyNav() {
    if ((window.pageYOffset || document.documentElement.scrollTop) > 10) {
      !classList.contains('sticky') && classList.add('sticky')
    } else {
      classList.contains('sticky') && classList.remove('sticky')
    }
  }

  // Initial render might
  updateStickyNav()

  // Update on scroll
  window.addEventListener('scroll', updateStickyNav)

  // Defer enabling the transition to avoid moving things on page load
  setTimeout(function() {
    classList.add('sticky-transition')
  }, 100)
}
