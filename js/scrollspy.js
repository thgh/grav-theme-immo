Scrollspy = (function () {
  function hashchange (evt) {
    [].forEach.call(document.querySelectorAll('nav a'), function(elem) {
      classIf(elem.classList, 'nav__a--active', window.location.href === elem.href)
    })
  }

  function replaceHash (hash) {
    if (hash && window.location.hash !== hash) {
      history.replaceState(undefined, undefined, hash)
      hashchange()
    }
  }

  function scroll () {
    var pageY = window.pageYOffset || document.documentElement.scrollTop
    var sections = [].map.call(document.querySelectorAll('nav a'), function(elem) {
      return elem.hash && document.getElementById(elem.hash.slice(1))
    })

    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i] && (sections[i].offsetTop < pageY + 100)) {
        return replaceHash('#' + sections[i].id)
      }
    }
    replaceHash('#')
  }

  // Update on page load
  hashchange()
  document.addEventListener('DOMContentLoaded', hashchange, false)

  // Update on single page navigation
  window.addEventListener('hashchange', hashchange)

  // Update on scroll
  window.addEventListener('scroll', throttle(scroll, 200, { trailing: true }))

  return {
    replaceHash: replaceHash,
    hashchange: hashchange,
    scroll: scroll
  }
})()
