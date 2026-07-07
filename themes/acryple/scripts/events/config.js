/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

const { version } = require('../../package.json')
// console.log('打印在下面这个终端里,当前version:' + version)
const path = require('path')

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config
  const { CDN, comments } = themeConfig

  /**
   * Merge CDN
   */

  const internalSrcCDN = {
    main_css: '/css/index.css',
    main: `https://cloud.luckynwa.top/profile/blog/jscss/hexo-theme-butterfly@${version}/main.min.js`,
    utils: `https://cloud.luckynwa.top/profile/blog/jscss/hexo-theme-butterfly@${version}/utils.min.js`,
    translate: `https://cloud.luckynwa.top/profile/blog/jscss/hexo-theme-butterfly@${version}/tw_cn.min.js`,
    local_search: `https://cloud.luckynwa.top/profile/blog/jscss/hexo-theme-butterfly@${version}/local-search.min.js`,
    algolia_js: `https://cloud.luckynwa.top/profile/blog/jscss/hexo-theme-butterfly@${version}/algolia.min.js`,
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
    algolia_search_v4: 'https://cloud.luckynwa.top/profile/blog/jscss/algoliasearch-lite.umd.js',
    instantsearch_v4: 'https://cloud.luckynwa.top/profile/blog/jscss/instantsearch.production.min.js',
    pjax: 'https://cloud.luckynwa.top/profile/blog/jscss/pjax.min.js',
    // gitalk: 'https://cloud.luckynwa.top/profile/blog/jscss/gitalk.min.js',
    // gitalk_css: 'https://cloud.luckynwa.top/profile/blog/jscss/gitalk.css',
    blueimp_md5: 'https://cloud.luckynwa.top/profile/blog/jscss/md5.min.js',
    // valine: 'https://cloud.luckynwa.top/profile/blog/jscss/Valine.min.js',
    // disqusjs: 'https://cloud.luckynwa.top/profile/blog/jscss/disqus.js',
    // disqusjs_css: 'https://cloud.luckynwa.top/profile/blog/jscss/disqusjs.css',
    twikoo: 'https://cloud.luckynwa.top/profile/blog/jscss/twikoo.all.min.js',
    waline_js: 'https://cloud.luckynwa.top/profile/blog/jscss/waline.js',
    waline_css: 'https://cloud.luckynwa.top/profile/blog/jscss/waline.css',
    sharejs: 'https://cloud.luckynwa.top/profile/blog/jscss/social-share.min.js',
    sharejs_css: 'https://cloud.luckynwa.top/profile/blog/jscss/fontcss/share.min.css',
    mathjax: 'https://cloud.luckynwa.top/profile/blog/jscss/tex-mml-chtml.js',
    katex: 'https://cloud.luckynwa.top/profile/blog/jscss/katex.min.css',
    katex_copytex: 'https://cloud.luckynwa.top/profile/blog/jscss/copy-tex.min.js',
    katex_copytex_css: 'https://cloud.luckynwa.top/profile/blog/jscss/copy-tex.css',
    mermaid: 'https://cloud.luckynwa.top/profile/blog/jscss/mermaid.min.js',
    canvas_ribbon: 'https://cloud.luckynwa.top/profile/blog/jscss/canvas-ribbon.min.js',
    canvas_fluttering_ribbon: 'https://cloud.luckynwa.top/profile/blog/jscss/canvas-fluttering-ribbon.min.js',
    canvas_nest: 'https://cloud.luckynwa.top/profile/blog/jscss/canvas-nest.min.js',
    activate_power_mode: 'https://cloud.luckynwa.top/profile/blog/jscss/activate-power-mode.min.js',
    fireworks: 'https://cloud.luckynwa.top/profile/blog/jscss/fireworks.min.js',
    click_heart: 'https://cloud.luckynwa.top/profile/blog/jscss/click-heart.min.js',
    ClickShowText: 'https://cloud.luckynwa.top/profile/blog/jscss/click-show-text.min.js',
    lazyload: 'https://cloud.luckynwa.top/profile/blog/jscss/lazyload.iife.min.js',
    instantpage: 'https://cloud.luckynwa.top/profile/blog/jscss/instantpage.min.js',
    typed: 'https://cloud.luckynwa.top/profile/blog/jscss/typed.min.js',
    pangu: 'https://cloud.luckynwa.top/profile/blog/jscss/pangu.min.js',
    fancybox_css_v4: 'https://cloud.luckynwa.top/profile/blog/jscss/fancybox.css',
    fancybox_v4: 'https://cloud.luckynwa.top/profile/blog/jscss/fancybox.umd.js',
    medium_zoom: 'https://cloud.luckynwa.top/profile/blog/jscss/medium-zoom.min.js',
    snackbar_css: 'https://cloud.luckynwa.top/profile/blog/jscss/snackbar.min.css',
    snackbar: 'https://cloud.luckynwa.top/profile/blog/jscss/snackbar.min.js',
    //下面是图标，需要去阿里那重新找下载到服务器才能用自己的
    fontawesomeV6: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css',
    //自己的，先用第三方的吧快一点 fontawesomeV6: 'https://cloud.luckynwa.top/profile/blog/jscss/tubiaoaili_all/css/tubiaoaili_all.min.css',
    flickr_justified_gallery_js: 'https://cloud.luckynwa.top/profile/blog/jscss/fjGallery.min.js',
    flickr_justified_gallery_css: 'https://cloud.luckynwa.top/profile/blog/jscss/fjGallery.min.css',
    aplayer_css: 'https://cloud.luckynwa.top/profile/blog/jscss/APlayer.min.css',
    aplayer_js: 'https://cloud.luckynwa.top/profile/blog/jscss/APlayer.min.js',
    meting_js: 'https://cloud.luckynwa.top/profile/blog/jscss/Meting.min.js',
    prismjs_js: 'https://cloud.luckynwa.top/profile/blog/jscss/prism.min.js',
    prismjs_lineNumber_js: 'https://cloud.luckynwa.top/profile/blog/jscss/prism-line-numbers.min.js',
    prismjs_autoloader: 'https://cloud.luckynwa.top/profile/blog/jscss/prism-autoloader.min.js',
  }

  // delete null value
  const deleteNullValue = (obj) => {
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
          Object.keys(result).map((key) => {
            result[key] = '/pluginsSrc/' + result[key]
          })
        } catch (e) {}
        return result
      } else return thirdPartySrcCDN
    }
  }

  themeConfig.asset = Object.assign(
    defaultVal('internal', CDN.internal_provider),
    defaultVal('external', CDN.third_party_provider),
    deleteNullValue(CDN.option),
  )

  /**
   * Capitalize the first letter of comment name
   */

  let { use } = comments

  if (!use) return

  if (typeof use === 'string') {
    use = use.split(',')
  }

  const newArray = use.map((item) => item.toLowerCase().replace(/\b[a-z]/g, (s) => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
