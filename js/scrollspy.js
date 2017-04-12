Scrollspy = (function () {
  function hashchange () {
    [].forEach.call(document.querySelectorAll('nav a'), function(elem) {
      classIf(elem.classList, 'nav__a--active', window.location.href === elem.href)
    })
  }

  // Update on page load
  hashchange()
  document.addEventListener('DOMContentLoaded', hashchange, false)

  // Update on single page navigation
  window.addEventListener('hashchange', hashchange)

  return {
    update: hashchange
  }
})()
