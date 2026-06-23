function initBlogSlider() {
  var sliderEl = document.querySelector('.blog-slider');
  if (!sliderEl || sliderEl.swiper) return;
  
  var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 0,
    effect: 'fade',
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 3000
    },
    mousewheel: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      init: function() {
        this.update();
      }
    }
  });

  swiper.el.onmouseenter = function() {
    swiper.autoplay.stop();
  };
  swiper.el.onmouseleave = function() {
    swiper.autoplay.start();
  };

  sliderEl.swiper = swiper;
}

function reinitBlogSlider() {
  var sliderEl = document.querySelector('.blog-slider');
  if (sliderEl && sliderEl.swiper) {
    sliderEl.swiper.destroy();
    sliderEl.swiper = null;
  }
  initBlogSlider();
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initBlogSlider, 500);
});

window.addEventListener('resize', function() {
  var sliderEl = document.querySelector('.blog-slider');
  if (sliderEl && sliderEl.swiper) {
    sliderEl.swiper.update();
  }
});

document.addEventListener('pjax:complete', function() {
  setTimeout(reinitBlogSlider, 300);
});