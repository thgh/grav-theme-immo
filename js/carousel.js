Carousel = (function () {
  qsa('.carousel').map(function (carousel) {
    // Enable controls
    carousel.nextElementSibling.addEventListener('click', function (evt) {
      showSlide(carousel, evt && evt.target && evt.target.getAttribute('data-index'))
    })

    // Prepare next slide but don't show it
    showSlide(carousel, 1)

    // Show next slide every 5 seconds
    setInterval(function () {
      showSlide(carousel)
    }, 5000)
  })

  function showSlide (carousel, index) {
    var prev = carousel.querySelector('.carousel--active') || carousel.firstElementChild
    var active = index && carousel.children[index - 1] || carousel.querySelector('.carousel--next') || prev.nextElementSibling || carousel.firstElementChild
    var next = active.nextElementSibling || carousel.firstElementChild

    if (!active.style.backgroundImage) {
      active.style.backgroundImage = active.getAttribute('data-img')
    }

    if (!next.style.backgroundImage) {
      next.style.backgroundImage = next.getAttribute('data-img')
    }

    prev.className = 'carousel--prev'
    next.className = 'carousel--next'
    active.className = 'carousel--active'

    // Controls
    try {
      carousel.nextElementSibling.querySelector('.carousel__control--active').className = 'carousel__control'
    } catch (e) {}
    try {
      carousel.nextElementSibling.children[Array.prototype.indexOf.call(carousel.children, active)].className = 'carousel__control carousel__control--active'
    } catch (e) {}
  }

  return {}
})();
