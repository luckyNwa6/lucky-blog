// 给swiper容器添加loading类，防止加载时内容闪现
(function() {
  var el = document.querySelector('.swiper-div .blog-slider');
  if (el) el.classList.add('swiper-loading');
})();

function showSwiperReady() {
  var sliders = document.querySelectorAll('.swiper-div .blog-slider');
  for (var i = 0; i < sliders.length; i++) {
    sliders[i].classList.remove('swiper-loading');
  }
}

function initBlogSlider() {
  var sliderEl = document.querySelector('.blog-slider');
  if (!sliderEl || sliderEl.swiper) {
    showSwiperReady();
    return;
  }

  var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 3000
    },
    mousewheel: true,
    observer: true,
    observeParents: true,
    preloadImages: false,
    updateOnImagesReady: true,
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
        showSwiperReady();
      },
      imagesReady: function() {
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
  // 兜底：5秒后无论如何移除loading状态
  setTimeout(showSwiperReady, 5000);
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
