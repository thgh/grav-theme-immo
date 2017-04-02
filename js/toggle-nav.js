var nav = document.querySelector('.nav')
document.querySelector('.nav__toggle').onclick = function (evt) {
  nav.className = ('' + nav.className)
    .replace('closed', '$temp#')
    .replace('open', 'closed')
    .replace('$temp#', 'open')
}
