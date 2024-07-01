/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

const { version } = require('../../package.json')
console.log('当前version为:' + version);
const path = require('path')

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  const { CDN, comments } = themeConfig

  /**
   * Merge CDN
   */

  const internalSrcCDN = {
    main_css: '/css/index.css',
    main: `https://cdn1.tianli0.top/npm/hexo-theme-butterfly@${version}/source/js/main.min.js`,
    utils: `https://cdn1.tianli0.top/npm/hexo-theme-butterfly@${version}/source/js/utils.min.js`,
    translate: `https://cdn1.tianli0.top/npm/hexo-theme-butterfly@${version}/source/js/tw_cn.min.js`,
    local_search: `https://cdn1.tianli0.top/npm/hexo-theme-butterfly@${version}/source/js/search/local-search.min.js`,
    algolia_js: `https://cdn1.tianli0.top/npm/hexo-theme-butterfly@${version}/source/js/search/algolia.min.js`,
  }

  const internalSrcLocal = {
    main_css: '/css/index.css',
    main: '/js/main.js',
    utils: '/js/utils.js',
    translate: '/js/tw_cn.js',
    local_search: '/js/search/local-search.js',
    algolia_js: '/js/search/algolia.js',
  }

  const thirdPartySrcCDN = {
    algolia_search_v4: 'https://luckynwa.top/mypic/jscss/algoliasearch-lite.umd.js',
    instantsearch_v4: 'https://luckynwa.top/mypic/jscss/instantsearch.production.min.js',
    pjax: 'https://luckynwa.top/mypic/jscss/pjax.min.js',
    gitalk: 'https://luckynwa.top/mypic/jscss/gitalk.min.js',
    gitalk_css: 'https://luckynwa.top/mypic/jscss/gitalk.css',
    blueimp_md5: 'https://luckynwa.top/mypic/jscss/md5.min.js',
    valine: 'https://luckynwa.top/mypic/jscss/Valine.min.js',
    disqusjs: 'https://luckynwa.top/mypic/jscss/disqus.js',
    disqusjs_css: 'https://luckynwa.top/mypic/jscss/disqusjs.css',
    twikoo: 'https://luckynwa.top/mypic/jscss/twikoo.all.min.js',
    waline_js: 'https://luckynwa.top/mypic/jscss/waline.js',
    waline_css: 'https://luckynwa.top/mypic/jscss/waline.css',
    sharejs: 'https://luckynwa.top/mypic/jscss/social-share.min.js',
    sharejs_css: 'https://luckynwa.top/mypic/jscss/share.min.css',
    mathjax: 'https://luckynwa.top/mypic/jscss/tex-mml-chtml.js',
    katex: 'https://luckynwa.top/mypic/jscss/katex.min.css',
    katex_copytex: 'https://luckynwa.top/mypic/jscss/copy-tex.min.js',
    katex_copytex_css: 'https://luckynwa.top/mypic/jscss/copy-tex.css',
    mermaid: 'https://luckynwa.top/mypic/jscss/mermaid.min.js',
    canvas_ribbon: 'https://luckynwa.top/mypic/jscss/canvas-ribbon.min.js',
    canvas_fluttering_ribbon: 'https://luckynwa.top/mypic/jscss/canvas-fluttering-ribbon.min.js',
    canvas_nest: 'https://luckynwa.top/mypic/jscss/canvas-nest.min.js',
    activate_power_mode: 'https://luckynwa.top/mypic/jscss/activate-power-mode.min.js',
    fireworks: 'https://luckynwa.top/mypic/jscss/fireworks.min.js',
    click_heart: 'https://luckynwa.top/mypic/jscss/click-heart.min.js',
    ClickShowText: 'https://luckynwa.top/mypic/jscss/click-show-text.min.js',
    lazyload: 'https://luckynwa.top/mypic/jscss/lazyload.iife.min.js',
    instantpage: 'https://luckynwa.top/mypic/jscss/instantpage.min.js',
    typed: 'https://luckynwa.top/mypic/jscss/typed.min.js',
    pangu: 'https://luckynwa.top/mypic/jscss/pangu.min.js',
    fancybox_css_v4: 'https://luckynwa.top/mypic/jscss/fancybox.css',
    fancybox_v4: 'https://luckynwa.top/mypic/jscss/fancybox.umd.js',
    medium_zoom: 'https://luckynwa.top/mypic/jscss/medium-zoom.min.js',
    snackbar_css: 'https://luckynwa.top/mypic/jscss/snackbar.min.css',
    snackbar: 'https://luckynwa.top/mypic/jscss/snackbar.min.js',
    fontawesomeV6: 'https://luckynwa.top/mypic/jscss/all.min.css',
    flickr_justified_gallery_js: 'https://luckynwa.top/mypic/jscss/fjGallery.min.js',
    flickr_justified_gallery_css: 'https://luckynwa.top/mypic/jscss/fjGallery.min.css',
    aplayer_css: 'https://luckynwa.top/mypic/jscss/APlayer.min.css',
    aplayer_js: 'https://luckynwa.top/mypic/jscss/APlayer.min.js',
    meting_js: 'https://luckynwa.top/mypic/jscss/Meting.min.js',
    prismjs_js: 'https://luckynwa.top/mypic/jscss/prism.min.js',
    prismjs_lineNumber_js: 'https://luckynwa.top/mypic/jscss/prism-line-numbers.min.js',
    prismjs_autoloader: 'https://luckynwa.top/mypic/jscss/prism-autoloader.min.js',
  }

  // delete null value
  const deleteNullValue = obj => {
    if (!obj) return
    for (const i in obj) {
      obj[i] === null && delete obj[i]
    }
    return obj
  }

  const defaultVal = (obj, choose) => {
    if (obj === 'internal') {
      if (choose === 'local') return internalSrcLocal
      else return internalSrcCDN
    }

    if (obj === 'external') {
      if (choose === 'local') {
        let result = {}
        try {
          const data = path.join(hexo.plugin_dir, 'hexo-butterfly-extjs/plugins.yml')
          result = hexo.render.renderSync({ path: data, engine: 'yaml' })
          Object.keys(result).map(key => {
            result[key] = '/pluginsSrc/' + result[key]
          })
        } catch (e) { }
        return result
      } else return thirdPartySrcCDN
    }
  }

  themeConfig.asset = Object.assign(defaultVal('internal', CDN.internal_provider),
    defaultVal('external', CDN.third_party_provider), deleteNullValue(CDN.option))

  /**
   * Capitalize the first letter of comment name
   */

  let { use } = comments

  if (!use) return

  if (typeof use === 'string') {
    use = use.split(',')
  }

  const newArray = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
