const CACHE_NAME = 'ICDNCache'
let cachelist = []
self.addEventListener('install', async function (installEvent) {
  self.skipWaiting()
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // console.log('开启缓存')
      return cache.addAll(cachelist)
    }),
  )
})
self.addEventListener('fetch', async (event) => {
  try {
    event.respondWith(handle(event.request))
  } catch (msg) {
    event.respondWith(handleerr(event.request, msg))
  }
})
const handleerr = async (req, msg) => {
  return new Response(
    `<h1>CDN分流器遇到了致命错误</h1>
    <b>${msg}</b>`,
    { headers: { 'content-type': 'text/html; charset=utf-8' } },
  )
}
const lfetch = async (urls, url) => {
  let controller = new AbortController()
  const PauseProgress = async (res) => {
    return new Response(await res.arrayBuffer(), { status: res.status, headers: res.headers })
  }
  if (!Promise.any) {
    Promise.any = function (promises) {
      return new Promise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises : []
        let len = promises.length
        let errs = []
        if (len === 0) return reject(new AggregateError('All promises were rejected'))
        promises.forEach((promise) => {
          promise.then(
            (value) => {
              resolve(value)
            },
            (err) => {
              len--
              errs.push(err)
              if (len === 0) {
                reject(new AggregateError(errs))
              }
            },
          )
        })
      })
    }
  }
  return Promise.any(
    urls.map((urls) => {
      return new Promise((resolve, reject) => {
        fetch(urls, {
          signal: controller.signal,
        })
          .then(PauseProgress)
          .then((res) => {
            if (res.status == 200) {
              controller.abort()
              resolve(res)
            } else {
              reject(res)
            }
          })
      })
    }),
  )
}
self.addEventListener('fetch', async (event) => {
  try {
    event.respondWith(handle(event.request))
  } catch (err) {
    if (fullpath(urlPath).indexOf('.html') != -1) {
      event.respondWith(fetch('/404.html'))
    }
  }
})
const fullpath = (path) => {
  path = path.split('?')[0].split('#')[0]
  if (path.match(/\/$/)) {
    path += 'index'
  }
  if (!path.match(/\.[a-zA-Z]+$/)) {
    path += '.html'
  }
  return path
}
const generate_blog_urls = (packagename, blogversion, path) => {
  const npmmirror = [
    // `https://unpkg.zhimg.com/${packagename}@${blogversion}`,
    // `https://npm.elemecdn.com/${packagename}@${blogversion}`,
    // `https://cdn1.tianli0.top/npm/${packagename}@${blogversion}`,
    // `https://cdn.afdelivr.top/npm/${packagename}@${blogversion}`,
    `https://ariasakablog.s3.ladydaily.com`,
  ]
  for (var i in npmmirror) {
    npmmirror[i] += path
  }
  return npmmirror
}
const mirror = [
  // `https://registry.npmmirror.com/ariasakablog/latest`,
  // `https://registry.npmjs.org/ariasakablog/latest`,
  // `https://mirrors.cloud.tencent.com/npm/ariasakablog/latest`
]
const get_newest_version = async (mirror) => {
  return lfetch(mirror, mirror[0])
    .then((res) => res.json())
    .then(res.version)
}
self.db = {
  //全局定义db,只要read和write,看不懂可以略过
  read: (key, config) => {
    if (!config) {
      config = { type: 'text' }
    }
    return new Promise((resolve, reject) => {
      caches.open(CACHE_NAME).then((cache) => {
        cache
          .match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`))
          .then(function (res) {
            if (!res) resolve(null)
            res.text().then((text) => resolve(text))
          })
          .catch(() => {
            resolve(null)
          })
      })
    })
  },
  write: (key, value) => {
    return new Promise((resolve, reject) => {
      caches
        .open(CACHE_NAME)
        .then(function (cache) {
          cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value))
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  },
}

const set_newest_version = async (mirror) => {
  //改为最新版本写入数据库
  return lfetch(mirror, mirror[0])
    .then((res) => res.json()) //JSON Parse
    .then(async (res) => {
      await db.write('blog_version', res.version) //写入
      return
    })
}
//s3亚马逊桶，应该是做多态配置的
// setInterval(async () => {
//   await set_newest_version(mirror) //定时更新,一分钟一次
// }, 60 * 1000)

// setTimeout(async () => {
//   await set_newest_version(mirror) //打开五秒后更新,避免堵塞
// }, 5000)
function getFileType(fileName) {
  suffix = fileName.split('.')[fileName.split('.').length - 1]
  if (suffix == 'html' || suffix == 'htm') {
    return 'text/html'
  }
  if (suffix == 'js') {
    return 'text/javascript'
  }
  if (suffix == 'css') {
    return 'text/css'
  }
  if (suffix == 'jpg' || suffix == 'jpeg') {
    return 'image/jpeg'
  }
  if (suffix == 'ico') {
    return 'image/x-icon'
  }
  if (suffix == 'png') {
    return 'image/png'
  }
  return 'text/plain'
}
const handle = async (req) => {
  // console.log('🚀 ~ handle ~ req:', req)
  const urlStr = req.url
  const urlObj = new URL(urlStr)
  const urlPath = urlObj.pathname
  const domain = urlObj.hostname
  //从这里开始，这个走s3里的东西，别走
  lxs = []
  if (domain === 'xxxxxxxxxxxx.top') {
    //这里写你需要拦截的域名
    var l = lfetch(generate_blog_urls('luckyblog', (await db.read('blog_version')) || '1.0.18', fullpath(urlPath)))
    return l
      .then((res) => res.arrayBuffer())
      .then(
        (buffer) =>
          new Response(buffer, {
            headers: {
              'Content-Type': `${getFileType(
                fullpath(urlPath).split('/')[fullpath(urlPath).split('/').length - 1].split('\\')[
                  fullpath(urlPath).split('/')[fullpath(urlPath).split('/').length - 1].split('\\').length - 1
                ],
              )};charset=utf-8`,
            },
          }),
      ) //重新定义header
  } else {
    return fetch(req)
  }
}
