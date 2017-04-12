(function () {
  var html = document.documentElement

  // Toggle on click
  document.querySelector('nav').addEventListener('click', function () {
    html.className = html.className.indexOf('nav--open') > -1
      ? ('' + html.className).replace(/\w*nav--open\w*/, ' ')
      : '' + html.className + ' nav--open'
  })

  // Close on hash change
  window.addEventListener('hashchange', function () {
    html.className = ('' + html.className)
      .replace('nav--open', '')

    // Scrollspy nav
    ;[].forEach.call(document.querySelectorAll('nav a'), function(elem) {
      classIf(elem.classList, 'nav__a--active', window.location.href === elem.href)
    })
  })
})()
