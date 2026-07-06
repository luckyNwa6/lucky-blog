// 固定3张轮播图，不依赖插件注入
var swiperSlides = [
  { img: '/img/lunbo/310.webp', title: '欢迎来到我的博客', text: '每一天都是新的开始' },
  { img: '/img/lunbo/311.webp', title: '探索无限可能', text: '知识改变命运' },
  { img: '/img/lunbo/306.webp', title: '记录生活点滴', text: '分享技术与思考' },
]

function buildSwiperHTML() {
  var slidesHTML = ''
  swiperSlides.forEach(function (s) {
    slidesHTML +=
      '<div class="blog-slider__item swiper-slide" style="background:url(' +
      s.img +
      ');border-radius:12px;">' +
      '<div class="blog-slider__content">' +
      '<span class="blog-slider__code">' +
      new Date().toLocaleDateString() +
      '</span>' +
      '<a class="blog-slider__title" href="javascript:void(0);">' +
      s.title +
      '</a>' +
      '<div class="blog-slider__text">' +
      s.text +
      '</div>' +
      '</div></div>'
  })

  return (
    '<div class="blog-slider" id="swiper_container">' +
    '<div class="blog-slider__wrp swiper-wrapper">' +
    slidesHTML +
    '</div>' +
    '<div class="blog-slider__pagination"></div>' +
    '<div class="swiper-button-prev"></div>' +
    '<div class="swiper-button-next"></div>' +
    '</div>'
  )
}

function ensureSwiperDOM() {
  var swiperDiv = document.querySelector('.swiper-div')
  if (!swiperDiv) return false

  var hasSwiper = swiperDiv.querySelector('.blog-slider__wrp')
  if (!hasSwiper) {
    swiperDiv.insertAdjacentHTML('afterbegin', buildSwiperHTML())
  }
  return true
}

function initBlogSlider() {
  var sliderEl = document.querySelector('.blog-slider')
  if (!sliderEl || sliderEl.swiper) return

  // 添加 swiper-loading 类，防止阴影出现在左上角
  var swiperDiv = document.querySelector('.swiper-div')
  if (swiperDiv) {
    swiperDiv.classList.add('swiper-loading')
  }

  var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 0,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    autoplay: { disableOnInteraction: false, delay: 3000 },
    mousewheel: true,
    observer: true,
    observeParents: true,
    preloadImages: false,
    updateOnImagesReady: true,
    pagination: { el: '.blog-slider__pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    on: {
      init: function () {
        this.update()
      },
      imagesReady: function () {
        this.update()
        // 图片加载完成后移除 swiper-loading 类，显示内容和阴影
        if (swiperDiv) {
          swiperDiv.classList.remove('swiper-loading')
        }
      },
    },
  })

  swiper.el.onmouseenter = function () {
    swiper.autoplay.stop()
  }
  swiper.el.onmouseleave = function () {
    swiper.autoplay.start()
  }
  sliderEl.swiper = swiper
}

function reinitBlogSlider() {
  var sliderEl = document.querySelector('.blog-slider')
  if (sliderEl && sliderEl.swiper) {
    sliderEl.swiper.destroy()
    sliderEl.swiper = null
  }
  // 移除 swiper-loading 类，准备重新初始化
  var swiperDiv = document.querySelector('.swiper-div')
  if (swiperDiv) {
    swiperDiv.classList.remove('swiper-loading')
  }
  ensureSwiperDOM()
  initBlogSlider()
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    ensureSwiperDOM()
    initBlogSlider()
  }, 300)
})

window.addEventListener('resize', function () {
  var sliderEl = document.querySelector('.blog-slider')
  if (sliderEl && sliderEl.swiper) {
    sliderEl.swiper.update()
  }
})

document.addEventListener('pjax:complete', function () {
  setTimeout(reinitBlogSlider, 300)
})
